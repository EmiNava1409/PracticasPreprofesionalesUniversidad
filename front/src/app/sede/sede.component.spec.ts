import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-sede',
  templateUrl: './sede.component.html',
  styleUrls: ['./sede.component.css']
})
export class SedeComponent implements OnInit {

  sedes: any[] = [];
  nombreBusqueda: string = '';

  nuevaSede = {
    id_sede: null as number | null,
    nombre_sede: '',
    ciudad: ''
  };

  showModal = false;
  editando = false;

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.obtenerSedes();
  }

  obtenerSedes(): void {
    this.http.get<any[]>('.php')
      .subscribe({
        next: data => this.sedes = data,
        error: err => console.error('Error al obtener sedes:', err)
      });
  }

  abrirModalNueva(): void {
    this.editando = false;
    this.nuevaSede = { id_sede: null, nombre_sede: '', ciudad: '' };
    this.showModal = true;
  }

  abrirModalEditar(sede: any): void {
    this.editando = true;
    this.nuevaSede = {
      id_sede: sede.id_sede,
      nombre_sede: sede.nombre_sede,
      ciudad: sede.ciudad
    };
    this.showModal = true;
  }

  cerrarModal(): void {
    this.showModal = false;
  }

  guardarSede(): void {
    if (!this.nuevaSede.nombre_sede || !this.nuevaSede.ciudad) {
      alert('Completa nombre y ciudad');
      return;
    }

    // actualizar
    if (this.editando && this.nuevaSede.id_sede != null) {
      this.http.post('/API/Sede/actualizar.php', this.nuevaSede)
        .subscribe({
          next: _ => {
            alert('Sede actualizada');
            this.cerrarModal();
            this.obtenerSedes();
          },
          error: err => {
            console.error('Error al actualizar sede', err);
            alert('No se pudo actualizar');
          }
        });
    } else { // crear
      const body = {
        nombre_sede: this.nuevaSede.nombre_sede,
        ciudad: this.nuevaSede.ciudad
      };
      this.http.post('/API/Sede/crear.php', body)
        .subscribe({
          next: _ => {
            alert('Sede agregada');
            this.cerrarModal();
            this.obtenerSedes();
          },
          error: err => {
            console.error('Error al agregar sede', err);
            alert('No se pudo agregar');
          }
        });
    }
  }

  eliminarSede(id_sede: number): void {
    if (!confirm('¿Eliminar esta sede?')) return;

    this.http.post('/API/Sede/eliminar.php', { id_sede })
      .subscribe({
        next: _ => {
          alert('Sede eliminada');
          this.obtenerSedes();
        },
        error: err => {
          console.error('Error al eliminar sede', err);
          alert('No se pudo eliminar');
        }
      });
  }

  // filtro muy simple en el front
  get sedesFiltradas() {
    const texto = this.nombreBusqueda.toLowerCase().trim();
    if (!texto) return this.sedes;
    return this.sedes.filter(s =>
      s.nombre_sede.toLowerCase().includes(texto) ||
      s.ciudad.toLowerCase().includes(texto)
    );
  }
}
