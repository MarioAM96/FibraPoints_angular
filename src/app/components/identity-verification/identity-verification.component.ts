import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InputNumber } from 'primeng/inputnumber';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { FloatLabel } from 'primeng/floatlabel';

@Component({
  selector: 'app-identity-verification',
  templateUrl: './identity-verification.component.html',
  styleUrls: ['./identity-verification.component.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule, InputNumber, ButtonModule, FloatLabel],
})
export class IdentityVerificationComponent {
  value1: number = 42723;

  value2: number = 58151;

  value3: number = 2351.35;

  value4: number = 50;

  loading: boolean = false;

  load() {
    this.loading = true;

    setTimeout(() => {
      this.loading = false;
    }, 2000);
  }

  onInputChange(event: Event) {
    const inputElement = event.target as HTMLInputElement;
    console.log(inputElement.value);
  }
}
