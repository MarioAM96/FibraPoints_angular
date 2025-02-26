import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InputNumber, InputNumberInputEvent } from 'primeng/inputnumber'; // Importar InputNumberInputEvent
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { FloatLabel } from 'primeng/floatlabel';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-identity-verification',
  templateUrl: './identity-verification.component.html',
  styleUrls: ['./identity-verification.component.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule, InputNumber, ButtonModule, FloatLabel],
})
export class IdentityVerificationComponent {
  cedula: number | null = null;
  loading: boolean = false;
  showVerification: boolean = false;
  codeDigits: string[] = new Array(6).fill('');
  maskedEmail: string = '';

  load() {
    if (this.cedula && this.cedula.toString().length >= 10) {
      this.loading = true;
      console.log("Esta es la cedula ",this.cedula)

      setTimeout(() => {
        this.loading = false;
        this.showVerification = true;
        this.maskedEmail = 'u*******m@gmail.com'; // Esto debería venir de tu backend
      }, 2000);
    }
  }

  onInputChange(event: InputNumberInputEvent) {
    const value = event.value?.toString() || '';
    
    // Validar que no exceda 13 dígitos
    if (value.length > 13) {
      this.cedula = Number(value.slice(0, 13));
    }
  }

  onCodeInput(event: any, index: number) {
    const input = event.target;
    const value = input.value;

    // Solo permitir números
    if (value && !value.match(/^[0-9]$/)) {
      input.value = '';
      return;
    }

    // Actualizar el array de dígitos
    this.codeDigits[index] = value;

    // Mover al siguiente input
    if (value && index < 5) {
      const nextInput = input.parentElement.children[index + 1];
      nextInput.focus();
    }

    // Mover al anterior con backspace
    if (!value && index > 0) {
      const prevInput = input.parentElement.children[index - 1];
      prevInput.focus();
    }
  }

  isCodeComplete(): boolean {
    return this.codeDigits.every(digit => digit !== '');
  }

  resendCode() {
    this.loading = true;
    setTimeout(() => {
      this.loading = false;
      // Aquí iría tu lógica real de reenvío
      console.log('Código reenviado');
    }, 1000);
  }

  verifyCode() {
    const code = this.codeDigits.join('');
    this.loading = true;
    setTimeout(() => {
      this.loading = false;
      console.log('Código verificado:', code);
      // Aquí iría tu lógica real de verificación
    }, 1000);
  }

  resetVerification() {
    this.showVerification = false;
    this.codeDigits = new Array(6).fill('');
  }
}