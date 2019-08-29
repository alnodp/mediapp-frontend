import { Component, OnInit } from '@angular/core';
import {Paciente} from '../../_models/paciente';
import {PacienteService} from '../../_services/paciente.service';
import {Especialidad} from '../../_models/especialidad';
import {Medico} from '../../_models/medico';
import {Examen} from '../../_models/examen';
import {EspecialidadService} from '../../_services/especialidad.service';
import {MedicoService} from '../../_services/medico.service';
import {ExamenService} from '../../_services/examen.service';
import {DetalleConsulta} from '../../_models/detalle-consulta';
import {MatSnackBar} from '@angular/material';
import {Consulta} from '../../_models/consulta';
import {ConsultaListaExamenDto} from '../../_models/consulta-lista-examen-dto';
import {ConsultaService} from '../../_services/consulta.service';

@Component({
  selector: 'app-consulta',
  templateUrl: './consulta.component.html',
  styleUrls: ['./consulta.component.scss']
})
export class ConsultaComponent implements OnInit {

  pacientes: Paciente[] = [];
  especialidades: Especialidad[] = [];
  medicos: Medico[] = [];
  examenes: Examen[] = [];
  detalleConsulta: DetalleConsulta[] = [];

  idPacienteSeleccionado: number;
  idEspecialidadSeleccionado: number;
  idMedicoSeleccionado: number;
  idExamenSeleccionado: number;
  examenesSeleccionados: Examen[] = [];

  fechaSeleccionada: Date = new Date();
  maxFecha: Date = new Date();

  diagnostico: string;
  tratamiento: string;


  constructor(private pacienteService: PacienteService,
              private especialidadService: EspecialidadService,
              private medicoService: MedicoService,
              private examenService: ExamenService,
              private consultaService: ConsultaService,
              private snackbar: MatSnackBar) { }

  ngOnInit() {
    this.listarPacientes();
    this.listarEspecialidades();
    this.listarMedicos();
    this.listarExamenes();
  }

  listarPacientes() {
    this.pacienteService.listar()
      .subscribe( pacientes => {
        this.pacientes = pacientes;
      });
  }

  listarEspecialidades() {
    this.especialidadService.listar()
      .subscribe( especialidades => {
        this.especialidades = especialidades;
      });
  }

  listarMedicos() {
    this.medicoService.listar()
      .subscribe( medicos => {
        this.medicos = medicos;
      });
  }

  listarExamenes() {
    this.examenService.listar()
      .subscribe( examenes => {
        this.examenes = examenes;
      });
  }

  agregar() {
    if(this.diagnostico != null && this.tratamiento != null) {
      const det = new DetalleConsulta();
      det.diagnostico = this.diagnostico;
      det.tratamiento = this.tratamiento;
      this.detalleConsulta.push(det);

      this.diagnostico = null;
      this.tratamiento = null;
    }
  }

  removerDiagnostico(index: number) {
    this.detalleConsulta.splice(index, 1);
  }

  agregarExamen() {
    if (this.idExamenSeleccionado > 0) {

      const examen = new Examen();
      examen.idExamen = this.idExamenSeleccionado;

      this.examenService.listarPorId(this.idExamenSeleccionado)
        .subscribe( exam => {
          examen.nombre = exam.nombre;
          examen.descripcion = exam.descripcion;
        });

      const examenExiste = this.examenesSeleccionados.find( (exam) => {
        return exam.idExamen === examen.idExamen;
      });

      if (!examenExiste) {
        this.examenesSeleccionados.push(examen);
      } else {
        this.snackbar.open('Examen previamente seleccionado', 'Ok', {
          duration: 3000
        });
      }

    } else {
      this.snackbar.open('Debes seleccionar un examen', 'Ok', {
        duration: 3000
      });
    }
  }

  removerExamen(index: number) {
    this.examenesSeleccionados.splice(index, 1);
  }

  estadoBotonRegistrar() {
    return (this.detalleConsulta.length === 0 || this.idEspecialidadSeleccionado === 0 ||
            this.idMedicoSeleccionado === 0 || this.idPacienteSeleccionado === 0 );
  }

  aceptar() {

    const especialidad = new Especialidad();
    especialidad.idEspecialidad = this.idEspecialidadSeleccionado;

    const medico = new Medico();
    medico.idMedico = this.idMedicoSeleccionado;

    const paciente = new Paciente();
    paciente.idPaciente = this.idPacienteSeleccionado;

    const consulta = new Consulta();
    consulta.especialidad = especialidad;
    consulta.medico = medico;
    consulta.paciente = paciente;
    consulta.detalleConsulta = this.detalleConsulta;
    consulta.fecha = this.fechaSeleccionada.toISOString();
    console.log('consulta.fecha', consulta.fecha);

    const consultaListaExamenDto = new ConsultaListaExamenDto();
    consultaListaExamenDto.consulta = consulta;
    consultaListaExamenDto.listExamen = this.examenesSeleccionados;

    this.consultaService.registrar(consultaListaExamenDto)
      .subscribe( () => {
        this.snackbar.open('Consulta guardada', 'Ok', {
          duration: 3000
        });

        setTimeout( () => {
          this.limpiarControles();
        }, 1500);
      });
  }

  limpiarControles() {
    this.detalleConsulta = [];
    this.examenesSeleccionados = [];
    this.diagnostico = '';
    this.tratamiento = '';
    this.idPacienteSeleccionado = 0;
    this.idEspecialidadSeleccionado = 0;
    this.idMedicoSeleccionado = 0;
    this.idExamenSeleccionado = 0;
    this.fechaSeleccionada = new Date();
    this.fechaSeleccionada.setHours(0);
    this.fechaSeleccionada.setMinutes(0);
    this.fechaSeleccionada.setSeconds(0);
    this.fechaSeleccionada.setMilliseconds(0);
  }

}
