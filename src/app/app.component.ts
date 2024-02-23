import { Component, inject } from '@angular/core';
import { MatAnchor } from "@angular/material/button";
import { RouterLink, RouterModule, RouterOutlet } from '@angular/router';
import { HdWalletMultiButtonComponent } from '@heavy-duty/wallet-adapter-material';
import { ShyftApiService } from './services/shyft-api.service';
import { WalletStore } from '@heavy-duty/wallet-adapter';
import { toSignal } from '@angular/core/rxjs-interop';
import { computedAsync } from 'ngxtension/computed-async';
import { DecimalPipe } from '@angular/common';

@Component({
  standalone: true,
  imports: [
    RouterModule,
    RouterOutlet,
    RouterLink,
    DecimalPipe,
    MatAnchor,
    HdWalletMultiButtonComponent,
  ],
  selector: 'app-root',
  template: `
    <header class="px-16 pt-20 pb-8 relative">
      <h1 class="text-center text-5xl mb-4"> Heavy Wallet</h1>

      <div class="flex justify-center mb-4">
        <hd-wallet-multi-button></hd-wallet-multi-button>
      </div>

      <nav>
        <ul class="flex justify-center items-center gap-4">
          <li>
            <a [routerLink]="['balance']" mat-raised-button>Balance</a>
          </li>
          <li>
            <a [routerLink]="['settings']" mat-raised-button>Settings</a>
          </li>
        </ul>
      </nav>
    </header>

    <main>
      <router-outlet></router-outlet>
    </main>
  `,
})
export class AppComponent {}
