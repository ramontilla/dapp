import { Component } from "@angular/core";

@Component({
    selector: 'app-settings-page',
    standalone: true,
    template: `
    <section>
        <h2 class="text-center text-3xl">Página de ajustes</h2>
        <p class="text-center">Bienvenido a la página de ajustes!</p>
    </section>
    `,
})
export class SettingsPageComponent {}