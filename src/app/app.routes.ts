import { Routes } from '@angular/router';
import { IdentityVerificationComponent } from './components/identity-verification/identity-verification.component';
import { StepperComponent } from './components/stepper/stepper.component';

export const routes: Routes = [
  { path: '', redirectTo: 'identity-verification', pathMatch: 'full' },
  { path: 'identity-verification', component: IdentityVerificationComponent },
  { path: 'stepper', component: StepperComponent },
];
