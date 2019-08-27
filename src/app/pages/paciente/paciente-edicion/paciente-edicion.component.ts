import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {PacienteService} from '../../../_services/paciente.service';
import {Paciente} from '../../../_models/paciente';
import {switchMap} from 'rxjs/operators';

@Component({
  selector: 'app-paciente-edicion',
  templateUrl: './paciente-edicion.component.html',
  styleUrls: ['./paciente-edicion.component.scss']
})
export class PacienteEdicionComponent implements OnInit {

  form: FormGroup;
  id: number;
  edicion: boolean;

  constructor(private route: ActivatedRoute,
              private pacienteService: PacienteService,
              private router: Router) {}

  ngOnInit() {
    this.form = new FormGroup({
      id: new FormControl(0),
      nombres: new FormControl(''),
      apellidos: new FormControl(''),
      dni: new FormControl(''),
      email: new FormControl(''),
      direccion: new FormControl(''),
      telefono: new FormControl('')
    });

    this.route.params.subscribe((params: Params) => {
      this.id = params.id;
      this.edicion = params.id != null;
      this.initForm();
    });
  }

  initForm() {
    if (this.edicion) {
      this.pacienteService.listarPorId(this.id)
        .subscribe( data => {
          this.form = new FormGroup({
            id: new FormControl(data.idPaciente),
            nombres: new FormControl(data.nombres),
            apellidos: new FormControl(data.apellidos),
            dni: new FormControl(data.dni),
            email: new FormControl(data.email),
            direccion: new FormControl(data.direccion),
            telefono: new FormControl(data.telefono)
          });
        });
    }
  }

  operar(value) {
    const paciente = new Paciente();
    paciente.idPaciente = this.form.value.id;
    paciente.nombres = this.form.value.nombres;
    paciente.apellidos = this.form.value.apellidos;
    paciente.dni = this.form.value.dni;
    paciente.email = this.form.value.email;
    paciente.direccion = this.form.value.direccion;
    paciente.telefono = this.form.value.telefono;

    if (this.edicion) {
      this.pacienteService.modificar(paciente)
        .pipe(
          switchMap( () => {
            return this.pacienteService.listar();
          })
        )
        .subscribe( data => {
          this.pacienteService.pacienteCambio.next(data);
          this.pacienteService.mensajeCambio.next('Se modificó el paciente.');
        });
    } else {
      this.pacienteService.registrar(paciente)
        .pipe(
          switchMap( () => {
            return this.pacienteService.listar();
          })
        )
        .subscribe( data => {
          this.pacienteService.pacienteCambio.next(data);
          this.pacienteService.mensajeCambio.next('Se registró el paciente.');
        });
    }

    this.router.navigate(['paciente']);
  }

}
