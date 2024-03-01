import { Component, computed, inject, input } from '@angular/core';
import {
  TransferFormComponent,
  TransferFormPayload,
} from './transfer-form.component';
import {
  injectPublicKey,
  injectTransactionSender,
} from '@heavy-duty/wallet-adapter';
import { createTransferInstructions } from '@heavy-duty/spl-utils';
import { ShyftApiService } from './services/shyft-api.service';
import { computedAsync } from 'ngxtension/computed-async';
import { MatProgressSpinner } from '@angular/material/progress-spinner';
import { MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-transfer-modal',
  template: `
    <div class="px-8 pt-16 pb-8">
      <h2 class="text-3xl text-center mb-8">Transferir fondos</h2>

      <app-transfer-form
        [disabled]="isRunning()"
        [tokens]="allTokens() ?? []"
        (sendTransfer)="onSendTransfer($event)"
        (cancelTransfer)="onCancelTransfer()"
      ></app-transfer-form>

      @if (isRunning()) {
        <div class="absolute w-full h-full top-0 left-0 bg-black bg-opacity-50">
          <mat-progress-spinner
            class="example-margin"
            color="primary"
            mode="indeterminate"
            diameter="64"
          >
          </mat-progress-spinner>
          <p class="capitalize text-xl">{{ transactionStatus() }}...</p>
        </div>
      }
    </div>
  `,
  standalone: true,
  imports: [TransferFormComponent, MatProgressSpinner],
})
export class TransferModalComponent {
  private readonly _matDialogRef = inject(MatDialogRef);
  private readonly _matSnackBar = inject(MatSnackBar);
  private readonly _transactionSender = injectTransactionSender();
  private readonly _publicKey = injectPublicKey();
  private readonly _shyftApiService = inject(ShyftApiService);

  readonly transactionStatus = computed(() => this._transactionSender().status);
  readonly isRunning = computed(
    () =>
      this.transactionStatus() === 'sending' ||
      this.transactionStatus() === 'confirming' ||
      this.transactionStatus() === 'finalizing',
  );
  readonly allTokens = computedAsync(() =>
    this._shyftApiService.getAllTokens(this._publicKey()?.toBase58()),
  );

  onSendTransfer(payload: TransferFormPayload) {
    console.log(payload);
    
    this._matDialogRef.disableClose = true;

    this._transactionSender
      .send(({ publicKey }) =>
        createTransferInstructions({
          amount: payload.amount * 10 ** 9,
          mintAddress: '7EYnhQoR9YM3N7UoaKRoA44Uy8JeaZV3qyouov87awMs',
          //mintAddress: payload.token.address,
          receiverAddress: payload.receiverAddress,
          senderAddress: publicKey.toBase58(),
          fundReceiver: true,
          memo: payload.memo,
        }),
      )
      .subscribe({
        next: (signature) => {
          console.log(`Transacción enviada satisfactoriamente. Ver explorador: https://explorer.solana.com/tx/${signature}`);
          this._matSnackBar.open(
            'Transacción enviada satisfactoriamente.',
            'Cerrar',
            {
              duration: 4000,
              horizontalPosition: 'end',
            },
          );
          this._matDialogRef.close();
        },
        error: (error) => {
          console.error(error);
          this._matSnackBar.open(
            'Hubo un error en la transacción.',
            'Cerrar',
            {
              duration: 4000,
              horizontalPosition: 'end',
            },
          );
        },
        complete: () => console.log('Transacción lista.'),
      });
  }

  onCancelTransfer () {
    this._matDialogRef.close();
  }
}
