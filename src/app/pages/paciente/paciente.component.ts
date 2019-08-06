import {Component, OnInit, ViewChild} from '@angular/core';
import {PacienteService} from '../../_services/paciente.service';
import {Paciente} from '../../_models/paciente';
import {MatPaginator, MatSnackBar, MatSort, MatTableDataSource} from '@angular/material';

@Component({
  selector: 'app-paciente',
  templateUrl: './paciente.component.html',
  styleUrls: ['./paciente.component.scss']
})
export class PacienteComponent implements OnInit {

  constructor(private pacienteService: PacienteService,
              private snackBar: MatSnackBar) { }

  dataSource: MatTableDataSource<Paciente>;
  displayedColumns = ['idPaciente', 'nombres', 'apellidos', 'acciones'];
  @ViewChild(MatSort, {static: true}) sort: MatSort;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

  ngOnInit() {

    this.pacienteService.pacienteCambio.subscribe( (data) => {
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
    });

    this.pacienteService.mensajeCambio
      .subscribe( msg => {
        this.snackBar.open(msg, 'Aviso', {
          duration: 2000
        });
      })

    this.pacienteService.listar()
      .subscribe(pacientes => {
        console.log('pacientes => ', pacientes);
        this.dataSource = new MatTableDataSource(pacientes);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
      });
  }

  filtrar(value: string) {
    this.dataSource.filter = value.trim().toLowerCase();
  }

  elimiar(idPaciente: number) {
    this.pacienteService.eliminar(idPaciente).subscribe( () => {
      this.pacienteService.listar().subscribe( data => {
        this.pacienteService.pacienteCambio.next(data);
        this.pacienteService.mensajeCambio.next('Se eliminó el registro del paciente');
      });
    });
  }

}
