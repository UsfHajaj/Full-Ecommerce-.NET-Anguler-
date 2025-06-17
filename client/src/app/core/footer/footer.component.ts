import { Component } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss'
})
export class FooterComponent {
 email: string = '';
  isSubscribing: boolean = false;
  currentYear: number = new Date().getFullYear();

  constructor() { }

  onSubscribe(): void {
    if (this.email && this.validateEmail(this.email)) {
      this.isSubscribing = true;

      // Simulate API call
      setTimeout(() => {
        console.log('Newsletter subscription for:', this.email);
        alert('Thank you for subscribing to our newsletter!');
        this.email = '';
        this.isSubscribing = false;
      }, 2000);
    }
  }

  private validateEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }
}
