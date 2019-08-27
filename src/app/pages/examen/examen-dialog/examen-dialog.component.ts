import {Component, Inject, OnInit} from '@angular/core';
import {Examen} from '../../../_models/examen';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {ExamenService} from '../../../_services/examen.service';
import {switchMap} from 'rxjs/operators';

@Component({
  selector: 'app-examen-dialog',
  templateUrl: './examen-dialog.component.html',
  styleUrls: ['./examen-dialog.component.scss']
})
export class ExamenDialogComponent implements OnInit {

  examen: Examen;
  constructor(private dialogRef: MatDialogRef<ExamenDialogComponent>,
              @Inject(MAT_DIALOG_DATA) private data: Examen,
              private examenService: ExamenService) { }

  ngOnInit() {
    this.examen = new Examen();
    this.examen.idExamen = this.data.idExamen;
    this.examen.nombre = this.data.nombre;
    this.examen.descripcion = this.data.descripcion;
  }

  cancelar() {
    this.dialogRef.close();
  }

  operar() {
    if (this.examen != null && this.examen.idExamen > 0) {
      this.examenService.modificar(this.examen)
        .pipe(
          switchMap( () => {
            return this.examenService.listar();
          })
        )
        .subscribe( examen => {
          this.examenService.examenCambio.next(examen);
          this.examenService.mensajeCambio.next('Se modificó el exámen');
        });
    } else {
      this.examenService.registrar(this.examen)
        .pipe(
          switchMap( () => {
            return this.examenService.listar();
          })
        )
        .subscribe( examenes => {
          this.examenService.examenCambio.next(examenes);
          this.examenService.mensajeCambio.next('Se registró el exámen');
        });
    }
    this.dialogRef.close();
  }

}
