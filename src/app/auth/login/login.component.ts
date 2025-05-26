import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ApiService } from '../../services/api.service';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';


@Component({
  selector: 'app-login',
  imports: [
    FormsModule,
    CommonModule
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {

  constructor(private apiService: ApiService, private router: Router) { }
  email: string = '';
  password: string = '';
  errorMessage: string = '';
  success: boolean = true;

  login() {
    const inputs = {email: this.email, password: this.password};
    console.log('Login inputs:', inputs);
    this.apiService.loginService(inputs).subscribe({
      next: (response) => {
        console.log('Login successful:', response);
        if (response.success) {
          localStorage.setItem('token', response.token);
          this.router.navigate(['/']);
        }
        if (!response.success) {
          this.errorMessage = response.error || 'Login failed. Please try again.';
          this.success = false;
          return;
        }
        // Handle successful login
       
      },
      error: (error) => {
        console.log('Login successful:', error);
        console.error('Login failed:', error);
        
        // Example: Show backend error message if provided
        if (error.error && error.error.detail) {
          this.errorMessage = error.error.detail; // e.g., "Invalid credentials"
        } else {
          this.errorMessage = 'Login failed. Please try again.';
        }
      }
    });
  }
}
