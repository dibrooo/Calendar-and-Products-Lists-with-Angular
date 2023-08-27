import { Component, OnInit } from '@angular/core';
import { NavigationStart, Router } from '@angular/router';
import { AuthService } from './auth/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {  
  showHome: boolean;

  constructor(
    private authService: AuthService,
    private router: Router
  ) {
    router.events.forEach((event) => {
      if(event instanceof NavigationStart) {
          this.showHome = event.url === "/";
      }
    });
  }

  ngOnInit(): void {
    this.authService.autoLogin();
  }
}