import { Component, Input, OnInit } from '@angular/core';
<<<<<<< HEAD
import { Router } from '@angular/router';
=======
>>>>>>> 96e8a567f6402a6962b9d728b6352ce1b1e6cfd8

@Component({
  selector: 'app-titulo',
  templateUrl: './titulo.component.html',
<<<<<<< HEAD
  styleUrls: ['./titulo.component.scss'],
})
export class TituloComponent implements OnInit {
  @Input() titulo: string;
  @Input() iconClass = 'fa fa-user';
  @Input() subtitulo = 'Desde 2021';
  @Input() botaoListar = false;

  constructor(private router: Router) {}

  ngOnInit(): void {}

  listar(): void {
    this.router.navigate([`/${this.titulo.toLocaleLowerCase()}/lista`]);
  }
=======
  styleUrls: ['./titulo.component.scss']
})
export class TituloComponent implements OnInit {
  @Input() titulo: string;
  constructor() { }

  ngOnInit(): void {
  }

>>>>>>> 96e8a567f6402a6962b9d728b6352ce1b1e6cfd8
}
