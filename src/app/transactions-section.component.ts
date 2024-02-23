import { Component, inject } from "@angular/core";
import { toSignal } from '@angular/core/rxjs-interop';
import { MatTableModule } from "@angular/material/table";
import { WalletStore } from '@heavy-duty/wallet-adapter';
import { computedAsync } from 'ngxtension/computed-async';
import { ShyftApiService } from './services/shyft-api.service';
@Component({
    selector: 'app-transactions-section',
    imports: [MatTableModule],
    standalone: true,
    template: `
        <section class="px-4 py-24">
            <h2 class="text-center text-3xl">Transacciones</h2>

            @if (transactions()?.length === 0) {
                <p class="text-center">No hay transacciones.</p>
            } @else {
                <table mat-table [dataSource]="transactions() ?? []">
                    <ng-container matColumnDef="type">
                        <th mat-header-cell *matHeaderCellDef>Type</th>
                        <td mat-cell *matCellDef="let transaction">{{ transaction.type }}</td>
                    </ng-container>
                    <ng-container matColumnDef="status">
                        <th mat-header-cell *matHeaderCellDef>Status</th>
                        <td mat-cell *matCellDef="let transaction">{{ transaction.status }}</td>
                    </ng-container>
                    <ng-container matColumnDef="timestamp">
                        <th mat-header-cell *matHeaderCellDef>Timestamp</th>
                        <td mat-cell *matCellDef="let transaction">{{ transaction.timestamp }}</td>
                    </ng-container>

                    <ng-container matColumnDef="sender">
                        <th mat-header-cell *matHeaderCellDef>Sender</th>
                        <td mat-cell *matCellDef="let transaction">{{ transaction.actions[0].info.sender }}</td>
                    </ng-container>

                    <ng-container matColumnDef="receiver">
                        <th mat-header-cell *matHeaderCellDef>Receiver</th>
                        <td mat-cell *matCellDef="let transaction">{{ transaction.actions[0].info.receiver }}</td>
                    </ng-container>

                    <ng-container matColumnDef="amount">
                        <th mat-header-cell *matHeaderCellDef>Amount</th>
                        <td mat-cell *matCellDef="let transaction">{{ transaction.actions[0].info.amount }}</td>
                    </ng-container>

                    <tr mat-header-row *matHeaderRowDef="displayedColumns"></tr>
                    <tr mat-row *matRowDef="let row; columns: displayedColumns"></tr>
                </table>
            }
        </section>
     `,
})
export class TransactionsSectionComponent {
    private readonly _shyftApiService = inject(ShyftApiService);
    private readonly _walletStore = inject(WalletStore);
    private readonly _publicKey = toSignal(this._walletStore.publicKey$);
  
    readonly transactions = computedAsync(
      () => this._shyftApiService.getTransactions(this._publicKey()?.toBase58()),
      { requireSync: false },
    );

    displayedColumns: string[] = ['type', 'status', 'timestamp', 'sender', 'receiver', 'amount'];
}