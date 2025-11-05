import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  sidebarCollapsed = false;   // ← estado del menú

  toggleSidebar() {
    this.sidebarCollapsed = !this.sidebarCollapsed;
  }
}
