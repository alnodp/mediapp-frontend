import {Consulta} from '../_models/consulta';
import {Examen} from '../_models/examen';

export class ConsultaListaExamenDto {
  consulta: Consulta;
  listExamen: Examen[];
}
