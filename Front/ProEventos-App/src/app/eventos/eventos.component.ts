
import { Component, OnInit, TemplateRef } from '@angular/core';

import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';

import { Evento } from '../models/Evento';
import { EventoService } from '../services/evento.service';

@Component({
  selector: 'app-eventos',
  templateUrl: './eventos.component.html',
  styleUrls: ['./eventos.component.scss']
})
export class EventosComponent implements OnInit {

  modalRef: BsModalRef;
  public eventos: Evento[] = [];
  public eventosFiltrados: Evento[] = [];
  public larguraImagem = 60;
  public margemImagem = 2;
  public exibirImagem = true;
  private filtroListado = '';

  public get filtroLista(): string {
    return this.filtroListado;
  }
  public set filtroLista(valor: string) {
    this.filtroListado = valor;
    this.eventosFiltrados = this.filtroLista ? this.filtrarEventos(this.filtroLista) : this.eventos;
  }

  public filtrarEventos(filtrarPor: string): Evento[] {
    filtrarPor = filtrarPor.toLocaleLowerCase();
    return this.eventos.filter(
      evento => evento.tema.toLocaleLowerCase().indexOf(filtrarPor) !== -1 ||
      evento.local.toLocaleLowerCase().indexOf(filtrarPor) !== -1
    );
  }


  constructor(
  private eventoService: EventoService,
  private modalService: BsModalService,
  private toastr: ToastrService,
  private spinner: NgxSpinnerService
  ) { }

  public ngOnInit(): void {
    this.getEventos();

    this.spinner.show();

    setTimeout(() => {
      this.spinner.hide();
    }, 5000);
  }
  alterarImagem(): void {
    this.exibirImagem = !this.exibirImagem;
  }

  public getEventos(): void {
    // const observable = {
    //   next: (eventos: Evento[]) => {
    //     this.eventos = eventos;
    //     this.eventosFiltrados = this.eventos;
    //   },
    //   error: (error: any) => console.log(error)
    // };
     this.eventoService.getEventos().subscribe(
       (eventosResp: Evento[]) => {
         this.eventos = eventosResp;
         this.eventosFiltrados = this.eventos;
       },
       error => {
         console.log(error);
       }
     );
  }

  openModal(template: TemplateRef<any>): void {
    this.modalRef = this.modalService.show(template, {class: 'modal-sm'});
  }
  confirm(): void {
    this.modalRef.hide();
    this.toastr.success('O Evento foi deletado com sucesso!', 'Deletado');
  }
  decline(): void {
    this.modalRef.hide();
  }
}
