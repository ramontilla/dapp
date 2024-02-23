import { Component, inject } from "@angular/core";
import { toSignal } from '@angular/core/rxjs-interop';
import { WalletStore } from '@heavy-duty/wallet-adapter';
import { DecimalPipe } from '@angular/common';
import { computedAsync } from 'ngxtension/computed-async';
import { ShyftApiService } from './services/shyft-api.service';
@Component({
    selector: 'app-balance-section',
    template: `
        <section class="px-16 py-24 bg-white bg-opacity-5">
            <h2 class="text-center text-3xl">Balance</h2>

            @if (account()) {
                <div class="flex justify-center items-center gap-2">
                    <p class="text-2xl"> {{ account()?.info?.name }} </p>
                </div>
                <div class="flex justify-center items-center gap-2">
                    <img [src]="account()?.info?.image" class="w-8 h-8" />
                    <p class="text-xl"> {{ account()?.balance | number }} SILLY </p>
                </div>
            }
        </section>
    `,
    imports: [DecimalPipe],
    standalone: true,
})
export class BalanceSectionComponent {
    private readonly _shyftApiService = inject(ShyftApiService);
    private readonly _walletStore = inject(WalletStore);
    private readonly _publicKey = toSignal(this._walletStore.publicKey$);
  
    readonly account = computedAsync(
      () => this._shyftApiService.getAccount(this._publicKey()?.toBase58()),
      { requireSync: false },
    );
}