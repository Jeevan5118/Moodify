import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FirebaseService } from '../../../services/firebase.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './register.html',
  styleUrl: './register.css'
})
export class RegisterComponent {
  email: string = '';
  password: string = '';
  confirmPassword: string = '';
  isLoading: boolean = false;
  errorMessage: string = '';

  constructor(
    private firebaseService: FirebaseService,
    private router: Router
  ) {}

  async onRegister(): Promise<void> {
    if (!this.email || !this.password || !this.confirmPassword) {
      this.errorMessage = 'Please fill in all fields';
      return;
    }

    if (this.password !== this.confirmPassword) {
      this.errorMessage = 'Passwords do not match';
      return;
    }

    if (this.password.length < 6) {
      this.errorMessage = 'Password must be at least 6 characters long';
      return;
    }

    this.isLoading = true;
    this.errorMessage = '';

    try {
      await this.firebaseService.signUp(this.email, this.password);
      this.router.navigate(['/']);
    } catch (error: any) {
      this.errorMessage = error.message || 'Registration failed. Please try again.';
    } finally {
      this.isLoading = false;
    }
  }

  onLogin(): void {
    this.router.navigate(['/login']);
  }
} 