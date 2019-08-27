import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {Medico} from '../../../_models/medico';
import {MedicoService} from '../../../_services/medico.service';
import {switchMap} from 'rxjs/operators';

@Component({
  selector: 'app-medico-dialog',
  templateUrl: './medico-dialog.component.html',
  styleUrls: ['./medico-dialog.component.scss']
})
export class MedicoDialogComponent implements OnInit {

  medico: Medico;
  constructor(private dialogRef: MatDialogRef<MedicoDialogComponent>,
              @Inject(MAT_DIALOG_DATA) private data: Medico,
              private medicoService: MedicoService) { }

  ngOnInit() {
    this.medico = new Medico();
    this.medico.idMedico = this.data.idMedico;
    this.medico.nombres = this.data.nombres;
    this.medico.apellidos = this.data.apellidos;
    this.medico.cmp = this.data.cmp;
  }

  cancelar() {
    this.dialogRef.close();
  }

  operar() {
    if (this.medico != null && this.medico.idMedico > 0) {
      this.medicoService.modificar(this.medico)
        .pipe(
          switchMap( () => {
            return this.medicoService.listar();
          })
        )
        .subscribe( medico => {
          this.medicoService.medicoCambio.next(medico);
          this.medicoService.mensajeCambio.next('Se modificó el médico');
        });
    } else {
      this.medicoService.registrar(this.medico)
        .subscribe( () => {
          this.medicoService.listar()
            .subscribe( medicos => {
              this.medicoService.medicoCambio.next(medicos);
              this.medicoService.mensajeCambio.next('Se registró el médico');
            });
        });
    }
    this.dialogRef.close();
  }
}
