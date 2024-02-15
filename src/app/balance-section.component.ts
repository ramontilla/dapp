import { Component, inject } from "@angular/core";
import { ShyftApiService } from './services/shyft-api.service';
import { WalletStore } from '@heavy-duty/wallet-adapter';
import { toSignal } from '@angular/core/rxjs-interop';
import { computedAsync } from 'ngxtension/computed-async';
import { DecimalPipe } from '@angular/common';

@Component({
    selector: 'app-balance-section',
    template: `
        <section class="px-16 py-24 bg-white bg-opacity-5">
            <h2 class="text-center text-3xl">Balance</h2>

            @if (account()) {
                <div class="flex justify-center items-center gap-2">
                    <img [src]="account()?.info?.image" class="w-8 h-8" />
                    <p class="text-2xl font-bold">
                        {{ account()?.balance | number }}
                    </p>
                    SILLY
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