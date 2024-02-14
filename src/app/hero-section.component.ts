import { Component } from "@angular/core";

@Component({
    selector: 'app-hero-section',
    template: `
        <section class="px-16 py-24 bg-white bg-opacity-5">
            <h2 class="text-center text-3xl">Home Page</h2>
            <p class="text-center">Welcome to the home page!</p>
        </section>
    `,
    standalone: true,
})
export class HeroSectionComponent {}