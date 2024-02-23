import { Component } from "@angular/core";
import { BalanceSectionComponent } from "./balance-section.component";
import { TransactionsSectionComponent } from "./transactions-section.component";

@Component({
    selector: 'app-balance-page',
    imports: [BalanceSectionComponent, TransactionsSectionComponent],
    standalone: true,
    template: `
    <section>
        <app-balance-section></app-balance-section>
        <app-transactions-section></app-transactions-section>
    </section>
    `,
})
export class BalancePageComponent {}