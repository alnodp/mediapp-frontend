import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {PacienteComponent} from './pages/paciente/paciente.component';
import {PacienteEdicionComponent} from './pages/paciente/paciente-edicion/paciente-edicion.component';
import {MedicoComponent} from './pages/medico/medico.component';
import {ExamenComponent} from './pages/examen/examen.component';
import {EspecialidadComponent} from './pages/especialidad/especialidad.component';
import {ConsultaComponent} from './pages/consulta/consulta.component';


const routes: Routes = [
  {
    path: 'paciente', component: PacienteComponent,
    children: [
      { path: 'nuevo', component: PacienteEdicionComponent },
      { path: 'edicion/:id', component: PacienteEdicionComponent }
    ]
  },
  { path: 'medico', component: MedicoComponent },
  { path: 'examen', component: ExamenComponent },
  { path: 'especialidad', component: EspecialidadComponent },
  { path: 'consulta', component: ConsultaComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
