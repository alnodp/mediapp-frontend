import {Component, OnInit, ViewChild} from '@angular/core';
import {MatDialog, MatPaginator, MatSnackBar, MatSort, MatTableDataSource} from '@angular/material';
import {Especialidad} from '../../_models/especialidad';
import {EspecialidadService} from '../../_services/especialidad.service';
import {switchMap} from 'rxjs/operators';
import {EspecialidadDialogComponent} from '../especialidad/especialidad-dialog/especialidad-dialog.component';

@Component({
  selector: 'app-especialidad',
  templateUrl: './especialidad.component.html',
  styleUrls: ['./especialidad.component.scss']
})
export class EspecialidadComponent implements OnInit {

  dataSource: MatTableDataSource<Especialidad>;
  displayedColumns = ['idEspecialidad', 'nombre', 'acciones'];
  @ViewChild(MatSort, {static: true}) sort: MatSort;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

  constructor(private especialidadService: EspecialidadService,
              private snackBar: MatSnackBar,
              private dialog: MatDialog) { }

  ngOnInit() {

    this.especialidadService.especialidadCambio.subscribe( (data) => {
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
    });

    this.especialidadService.mensajeCambio
      .subscribe( msg => {
        this.snackBar.open(msg, 'Aviso', {
          duration: 2000
        });
      });

    this.especialidadService.listar()
      .subscribe(especialidads => {
        console.log('especialidads => ', especialidads);
        this.dataSource = new MatTableDataSource(especialidads);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
      });
  }

  filtrar(value: string) {
    this.dataSource.filter = value.trim().toLowerCase();
  }

  elimiar(especialidad: Especialidad) {
    this.especialidadService.eliminar(especialidad.idEspecialidad)
      .pipe(
        switchMap( () => {
          return this.especialidadService.listar();
        })
      )
      .subscribe( data => {
        this.especialidadService.especialidadCambio.next(data);
        this.especialidadService.mensajeCambio.next('Se eliminó el registro de la especialidad');
      });
  }

  openDialog(especialidad?: Especialidad) {
    const med = especialidad != null ? especialidad : new Especialidad();

    this.dialog.open(EspecialidadDialogComponent, {
      width: '250px',
      data: med
    });
  }

}
