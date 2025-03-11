import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InputNumber, InputNumberInputEvent } from 'primeng/inputnumber';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { FloatLabel } from 'primeng/floatlabel';
import { ApiService } from '../../services/api.service';
import { HttpClientModule } from '@angular/common/http';
import Swal from 'sweetalert2';
import { DropdownModule } from 'primeng/dropdown';
import { StepperModule } from 'primeng/stepper';

@Component({
  selector: 'app-identity-verification',
  templateUrl: './identity-verification.component.html',
  styleUrls: ['./identity-verification.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    InputNumber,
    ButtonModule,
    HttpClientModule,
    StepperModule,
    DropdownModule
  ],
  providers: [ApiService],
})
export class IdentityVerificationComponent implements OnInit {
  cedula: number | null = null;
  loading: boolean = false;
  showVerification: boolean = false;
  isVerified: boolean = false;
  codeDigits: string[] = new Array(6).fill('');
  maskedEmail: string = '';
  clientData: any[] = [];
  currentStep: number = 1;
  selectedAddress: string = '';
  selectedClient: any = null;

  // Propiedades para productos
  products: any[] = [];
  loadingProducts: boolean = false;
  selectedProduct: any = null;

  constructor(private apiService: ApiService) {}

  ngOnInit() {}

  load() {
    if (this.cedula && this.cedula.toString().length >= 10) {
      this.loading = true;

      const payload = {
        identificacion: this.cedula,
        ip: '200.63.105.162',
      };

      this.apiService.getCode(payload).subscribe(
        (response: any) => {
          console.log('Respuesta de la API:', response);

          if (response.statusCode === 200) {
            this.showVerification = true;
            this.maskedEmail = response.data[0];
            Swal.fire({
              icon: 'success',
              title: 'Código enviado',
              text: response.message,
            });
          } else {
            Swal.fire({
              icon: response.statusCode === 500 ? 'error' : 'warning',
              title: response.statusCode === 500 ? 'Error' : 'Atención',
              text:
                response.message || 'No se ha podido procesar la solicitud.',
            });
          }

          this.loading = false;
        },
        (error) => {
          console.error('Error en la solicitud:', error);
          this.loading = false;

          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'Hubo un problema al comunicarse con el servidor. Intente nuevamente.',
          });
        }
      );
    }
  }

  onInputChange(event: InputNumberInputEvent) {
    const value = event.value?.toString() || '';

    if (value.length > 13) {
      this.cedula = Number(value.slice(0, 13));
    }
  }

  onCodeInput(event: any, index: number) {
    const input = event.target;
    const value = input.value;

    if (value && !value.match(/^[0-9]$/)) {
      input.value = '';
      return;
    }

    this.codeDigits[index] = value;

    if (value && index < 5) {
      const nextInput = input.parentElement.children[index + 1];
      nextInput.focus();
    }

    if (!value && index > 0) {
      const prevInput = input.parentElement.children[index - 1];
      prevInput.focus();
    }
  }

  isCodeComplete(): boolean {
    return this.codeDigits.every((digit) => digit !== '');
  }

  resendCode() {
    this.loading = true;
    setTimeout(() => {
      this.loading = false;
      console.log('Código reenviado');
    }, 1000);
  }

  verifyCode() {
    const code = this.codeDigits.join('');
    const payload = {
      identificacion: this.cedula?.toString(),
      codigo: code,
    };

    this.apiService.verifyCode(payload).subscribe(
      (response: any) => {
        console.log('Respuesta de la API:', response);

        if (response.status === 200) {
          this.clientData = response.message;
          this.isVerified = true;
          this.selectedClient = this.clientData[0];
          this.selectedAddress = this.clientData[0]?.direccion;
        } else {
          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: response.message || 'No se pudo verificar el código.',
          });
        }
      },
      (error) => {
        console.error('Error en la solicitud:', error);
        const errorMessage =
          error.error?.message || 'Ocurrió un error inesperado.';
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: errorMessage,
        });
      }
    );
  }

  onAddressChange() {
    this.selectedClient = this.clientData.find(
      (item) => item.direccion === this.selectedAddress
    );
  }



  onStepActivate(step: number) {
    this.currentStep = step;
    console.log("paso activado", step);
    if (step === 2) {
      console.log('Preparando para cargar productos');
      this.fetchProducts();
    }
  }
  
  fetchProducts() {
    console.log('Iniciando fetchProducts()');

    // Asegúrate de que loadingProducts se establezca a true
    this.loadingProducts = true;

    // Llama al método getProducts del servicio
    this.apiService.getProducts().subscribe(
      (response: any) => {
        console.log('Respuesta completa de productos:', response);

        // Ajusta según la estructura exacta de tu respuesta
        if (Array.isArray(response)) {
          this.products = response;
        } else if (response && response.data) {
          this.products = response.data;
        } else {
          this.products = [];
        }

        console.log('Productos cargados:', this.products);

        // Asegúrate de establecer loadingProducts a false
        this.loadingProducts = false;
      },
      (error) => {
        console.error('Error al obtener productos:', error);

        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'No se pudieron cargar los productos. Intente nuevamente.',
        });

        // Asegúrate de establecer loadingProducts a false en caso de error
        this.loadingProducts = false;
      }
    );
  }

  selectProduct(product: any) {
    console.log('Producto seleccionado:', product);
    this.selectedProduct = product;
  }
}
