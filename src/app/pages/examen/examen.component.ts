import {Component, OnInit, ViewChild} from '@angular/core';
import {MatDialog, MatPaginator, MatSnackBar, MatSort, MatTableDataSource} from '@angular/material';
import {Examen} from '../../_models/examen';
import {ExamenService} from '../../_services/examen.service';
import {switchMap} from 'rxjs/operators';
import {ExamenDialogComponent} from '../examen/examen-dialog/examen-dialog.component';

@Component({
  selector: 'app-examen',
  templateUrl: './examen.component.html',
  styleUrls: ['./examen.component.scss']
})
export class ExamenComponent implements OnInit {

  dataSource: MatTableDataSource<Examen>;
  displayedColumns = ['idExamen', 'nombre', 'descripcion', 'acciones'];
  @ViewChild(MatSort, {static: true}) sort: MatSort;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

  constructor(private examenService: ExamenService,
              private snackBar: MatSnackBar,
              private dialog: MatDialog) { }

  ngOnInit() {

    this.examenService.examenCambio.subscribe( (data) => {
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
    });

    this.examenService.mensajeCambio
      .subscribe( msg => {
        this.snackBar.open(msg, 'Aviso', {
          duration: 2000
        });
      });

    this.examenService.listar()
      .subscribe(examens => {
        console.log('examens => ', examens);
        this.dataSource = new MatTableDataSource(examens);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
      });
  }

  filtrar(value: string) {
    this.dataSource.filter = value.trim().toLowerCase();
  }

  elimiar(examen: Examen) {
    this.examenService.eliminar(examen.idExamen)
      .pipe(
        switchMap( () => {
          return this.examenService.listar();
        })
      )
      .subscribe( data => {
        this.examenService.examenCambio.next(data);
        this.examenService.mensajeCambio.next('Se eliminó el registro del exámen');
      });
  }

  openDialog(examen?: Examen) {
    const med = examen != null ? examen : new Examen();

    this.dialog.open(ExamenDialogComponent, {
      width: '250px',
      data: med
    });
  }

}
