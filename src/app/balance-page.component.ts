import { Component } from "@angular/core";
import { BalanceSectionComponent } from "./balance-section.component";

@Component({
    selector: 'app-balance-page',
    template: `
    <section>
        <app-balance-section></app-balance-section>
    </section>
    `,
    imports: [BalanceSectionComponent],
    standalone: true,
})
export class BalancePageComponent {}