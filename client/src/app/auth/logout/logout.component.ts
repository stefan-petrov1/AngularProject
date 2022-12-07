import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Pages } from 'src/app/shared/enums';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.css'],
})
export class LogoutComponent implements OnInit {
  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    this.authService.logout().subscribe({
      next: () => this.router.navigate([Pages.Home]),
      error: () => this.router.navigate([Pages.Home]),
    });
  }
}
