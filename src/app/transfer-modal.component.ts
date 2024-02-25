import { Component, inject } from '@angular/core';
import { TransferFormComponent, TransferFormPayload } from './transfer-form.component';
import { injectPublicKey, injectTransactionSender } from '@heavy-duty/wallet-adapter';
import { createTransferInstructions } from "@heavy-duty/spl-utils";
import { ShyftApiService } from './services/shyft-api.service';
import { computedAsync } from 'ngxtension/computed-async';

@Component({
    selector: 'app-transfer-modal',
    template: `
        <div class="px-8 pt-16 pb-8">
            <h2 class="text-3xl text-center mb-8">Transferir fondos</h2>

            <app-transfer-form [tokens]="allTokens() ?? []" (submitForm)="onTransfer($event)"></app-transfer-form>
        </div>
    `,
    standalone: true,
    imports: [TransferFormComponent]
})

export class TransferModalComponent {
    private readonly _transactionSender = injectTransactionSender();
    private readonly _publicKey = injectPublicKey();
    private readonly _shyftApiService = inject(ShyftApiService);

    readonly allTokens = computedAsync(() => this._shyftApiService.getAllTokens(this._publicKey()?.toBase58()));

    onTransfer(payload: TransferFormPayload) {
        console.log(payload);
        
        this._transactionSender
            .send(({ publicKey }) =>
                createTransferInstructions({
                    amount: payload.amount * 10 ** 9,
                    mintAddress: '7EYnhQoR9YM3N7UoaKRoA44Uy8JeaZV3qyouov87awMs',
                    receiverAddress: payload.receiverAddress,
                    senderAddress: publicKey.toBase58(),
                    fundReceiver: true,
                    memo: payload.memo
                })
            )
            .subscribe({
                next: (signature) => console.log(`Firma: ${signature}`),
                error: (error) => console.error(error),
                complete: () => console.log('Transacción lista.')
            });
    }
}