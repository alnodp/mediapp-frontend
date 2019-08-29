import {Paciente} from './paciente';
import {Medico} from './medico';
import {Especialidad} from './especialidad';
import {DetalleConsulta} from './detalle-consulta';

export class Consulta {
  idConsulta: number;
  paciente: Paciente;
  medico: Medico;
  especialidad: Especialidad;
  fecha: string;
  detalleConsulta: DetalleConsulta[];
}
