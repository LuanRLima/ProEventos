import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Evento } from '../models/Evento';

@Injectable()
export class EventoService {
  constructor(private http: HttpClient) { }

  baseUrl = 'https://localhost:5001/api/eventos';

  public getEventos(): Observable<Evento[]> {
    return this.http.get<Evento[]>(this.baseUrl);
  }
  public getElementosByTema(tema: string): Observable<Evento[]> {
    return this.http.get<Evento[]>(`${this.baseUrl}/getByTema/${tema}`);
  }
  public getEventoById(id: number): Observable<Evento> {
    return this.http.get<Evento>(`${this.baseUrl}/${id}`);
  }
  public postEvento(evento: Evento): Observable<Evento> {
    return this.http.post<Evento>(this.baseUrl, evento);
  }
  public putEvento(evento: Evento): Observable<Evento> {
    return this.http.put<Evento>(`${this.baseUrl}/${evento.id}`, evento);
  }
  public deleteEvento(id: number): Observable<Evento> {
    return this.http.delete<Evento>(`${this.baseUrl}/${id}`);
  }

}
