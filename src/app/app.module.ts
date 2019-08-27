import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { PacienteComponent } from './pages/paciente/paciente.component';
import {HttpClientModule} from '@angular/common/http';
import {MaterialModule} from './material/material.module';
import {MatButtonModule, MatToolbarModule} from '@angular/material';
import { PacienteEdicionComponent } from './pages/paciente/paciente-edicion/paciente-edicion.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { MedicoComponent } from './pages/medico/medico.component';
import { MedicoDialogComponent } from './pages/medico/medico-dialog/medico-dialog.component';
import { ExamenComponent } from './pages/examen/examen.component';
import { EspecialidadComponent } from './pages/especialidad/especialidad.component';
import { ExamenDialogComponent } from './pages/examen/examen-dialog/examen-dialog.component';
import { EspecialidadDialogComponent } from './pages/especialidad/especialidad-dialog/especialidad-dialog.component';

@NgModule({
  declarations: [
    AppComponent,
    PacienteComponent,
    PacienteEdicionComponent,
    MedicoComponent,
    MedicoDialogComponent,
    ExamenComponent,
    EspecialidadComponent,
    ExamenDialogComponent,
    EspecialidadDialogComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    HttpClientModule,
    MatButtonModule,
    FormsModule,
    ReactiveFormsModule,
    MatToolbarModule
  ],
  entryComponents: [
    MedicoDialogComponent,
    ExamenDialogComponent,
    EspecialidadDialogComponent
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
