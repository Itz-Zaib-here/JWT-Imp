import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ServicesService } from '../services.service';

@Component({
  selector: 'app-login',
  imports: [FormsModule],
  standalone: true,
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  loginObj: any = {
    username: '',
    password: '',
  };

  router = inject(Router);
  constructor(private loginSrv: ServicesService) {}

  onLogin() {
    this.loginSrv.onLogin(this.loginObj).subscribe({
      next: (res: any) => {
        console.log('Api response', res);
        localStorage.setItem('JWT_Token', JSON.stringify(res));
        this.router.navigateByUrl('/dashboard');
      },
      error: (err) => {
        if (err.status === 400) {
          console.warn('something went wrong try again')
        }
      }
    });
  }
}

// error: (err) => {
//         console.error('Error loading products:', err);
//       },