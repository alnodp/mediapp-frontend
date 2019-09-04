import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {ConsultaListaExamenDto} from '../_dto/consulta-lista-examen-dto';

@Injectable({
  providedIn: 'root'
})
export class ConsultaService {

  url = `${environment.HOST}/consultas`;

  constructor(private http: HttpClient) { }

  registrar(consultaDto: ConsultaListaExamenDto) {
    return this.http.post(this.url, consultaDto);
  }
}
