import { Injectable } from '@angular/core';
import {Subject} from 'rxjs';
import {Medico} from '../_models/medico';
import {environment} from '../../environments/environment';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class MedicoService {

  medicoCambio = new Subject<Medico[]>();
  mensajeCambio = new Subject<string>();

  url = `${environment.HOST}/medicos`;

  constructor(private http: HttpClient) { }

  listar() {
    return this.http.get<Medico[]>(this.url);
  }

  listarPorId(idPaciente: number) {
    return this.http.get<Medico>(`${this.url}/${idPaciente}`);
  }

  registrar(medico: Medico) {
    return this.http.post(this.url, medico);
  }

  modificar(medico: Medico) {
    return this.http.put(this.url, medico);
  }

  eliminar(idMedico: number) {
    return this.http.delete(`${this.url}/${idMedico}`);
  }
}
