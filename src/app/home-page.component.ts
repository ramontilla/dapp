import { Component } from "@angular/core";

@Component({
    selector: 'app-home-page',
    template: `
    <section>
        <h2 class="text-center text-3xl">Home Page</h2>
        <p class="text-center">Welcome to the home page!</p>
    </section>
    `,
    standalone: true,
})
export class HomePageComponent {}