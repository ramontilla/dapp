import { Component } from "@angular/core";
import { HeroSectionComponent } from "./hero-section.component";
import { FeaturesSectionComponent } from "./features-section.component";

@Component({
    selector: 'app-home-page',
    template: `
    <section>
        <app-hero-section></app-hero-section>
        <app-features-section></app-features-section>
    </section>
    `,
    imports: [HeroSectionComponent, FeaturesSectionComponent],
    standalone: true,
})
export class HomePageComponent {}