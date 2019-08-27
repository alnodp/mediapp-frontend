import {Component, Inject, OnInit} from '@angular/core';
import {Especialidad} from '../../../_models/especialidad';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {EspecialidadService} from '../../../_services/especialidad.service';
import {switchMap} from 'rxjs/operators';

@Component({
  selector: 'app-especialidad-dialog',
  templateUrl: './especialidad-dialog.component.html',
  styleUrls: ['./especialidad-dialog.component.scss']
})
export class EspecialidadDialogComponent implements OnInit {

  especialidad: Especialidad;
  constructor(private dialogRef: MatDialogRef<EspecialidadDialogComponent>,
              @Inject(MAT_DIALOG_DATA) private data: Especialidad,
              private especialidadService: EspecialidadService) { }

  ngOnInit() {
    this.especialidad = new Especialidad();
    this.especialidad.idEspecialidad = this.data.idEspecialidad;
    this.especialidad.nombre = this.data.nombre;
  }

  cancelar() {
    this.dialogRef.close();
  }

  operar() {
    if (this.especialidad != null && this.especialidad.idEspecialidad > 0) {
      this.especialidadService.modificar(this.especialidad)
        .pipe(
          switchMap( () => {
            return this.especialidadService.listar();
          })
        )
        .subscribe( especialidad => {
          this.especialidadService.especialidadCambio.next(especialidad);
          this.especialidadService.mensajeCambio.next('Se modificó la especialidad');
        });
    } else {
      this.especialidadService.registrar(this.especialidad)
        .pipe(
          switchMap( () => {
            return this.especialidadService.listar();
          })
        )
        .subscribe( especialidades => {
          this.especialidadService.especialidadCambio.next(especialidades);
          this.especialidadService.mensajeCambio.next('Se registró la especialidad');
        });
    }
    this.dialogRef.close();
  }

}
