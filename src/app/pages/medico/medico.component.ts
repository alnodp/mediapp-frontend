import {Component, OnInit, ViewChild} from '@angular/core';
import {MedicoService} from '../../_services/medico.service';
import {MatDialog, MatPaginator, MatSnackBar, MatSort, MatTableDataSource} from '@angular/material';
import {Medico} from '../../_models/medico';
import {MedicoDialogComponent} from './medico-dialog/medico-dialog.component';
import {switchMap} from 'rxjs/operators';

@Component({
  selector: 'app-medico',
  templateUrl: './medico.component.html',
  styleUrls: ['./medico.component.scss']
})
export class MedicoComponent implements OnInit {

  dataSource: MatTableDataSource<Medico>;
  displayedColumns = ['idMedico', 'nombres', 'apellidos', 'cmp', 'acciones'];
  @ViewChild(MatSort, {static: true}) sort: MatSort;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

  constructor(private medicoService: MedicoService,
              private snackBar: MatSnackBar,
              private dialog: MatDialog) { }

  ngOnInit() {

    this.medicoService.medicoCambio.subscribe( (data) => {
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
    });

    this.medicoService.mensajeCambio
      .subscribe( msg => {
        this.snackBar.open(msg, 'Aviso', {
          duration: 2000
        });
      });

    this.medicoService.listar()
      .subscribe(medicos => {
        console.log('medicos => ', medicos);
        this.dataSource = new MatTableDataSource(medicos);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
      });
  }

  filtrar(value: string) {
    this.dataSource.filter = value.trim().toLowerCase();
  }

  elimiar(medico: Medico) {
    this.medicoService.eliminar(medico.idMedico)
      .pipe(
        switchMap( () => {
          return this.medicoService.listar();
        })
      )
      .subscribe( data => {
        this.medicoService.medicoCambio.next(data);
        this.medicoService.mensajeCambio.next('Se eliminó el registro del médico');
      });
  }

  openDialog(medico?: Medico) {
    const med = medico != null ? medico : new Medico();

    this.dialog.open(MedicoDialogComponent, {
      width: '250px',
      data: med
    });
  }

}
