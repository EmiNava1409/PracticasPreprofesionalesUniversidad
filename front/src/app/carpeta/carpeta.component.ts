import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-carpeta',
  templateUrl: './carpeta.component.html',
  styleUrls: ['./carpeta.component.css']
})
export class CarpetaComponent implements OnInit {

  carpetas: any[] = [];
  carpetasOriginal: any[] = [];

  nombreBusqueda: string = '';

  nuevaCarpeta = {
    id_carpeta: null as number | null,
    nombre: '',
    id_sede: null as number | null,
    id_sub_carpeta: null as number | null
  };

  showModal = false;
  editando = false;

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.obtenerCarpetas();
  }

  obtenerCarpetas(): void {
    this.http.get<any[]>('http://localhost/API/carpeta/listar.php')
      .subscribe({
        next: data => {
          this.carpetasOriginal = data;
          this.carpetas = data;
        },
        error: err => console.error('Error al obtener carpetas:', err)
      });
  }

  filtrarCarpetas(): void {
    const term = this.nombreBusqueda.toLowerCase().trim();
    if (!term) {
      this.carpetas = [...this.carpetasOriginal];
      return;
    }

    this.carpetas = this.carpetasOriginal.filter(c =>
      (c.nombre && c.nombre.toLowerCase().includes(term)) ||
      (c.id_sede && c.id_sede.toString().includes(term))
    );
  }

  abrirModalNueva(): void {
    this.editando = false;
    this.nuevaCarpeta = {
      id_carpeta: null,
      nombre: '',
      id_sede: null,
      id_sub_carpeta: null
    };
    this.showModal = true;
  }

  abrirModalEditar(carpeta: any): void {
    this.editando = true;
    this.nuevaCarpeta = {
      id_carpeta: carpeta.id_carpeta,
      nombre: carpeta.nombre,
      id_sede: carpeta.id_sede,
      id_sub_carpeta: carpeta.id_sub_carpeta
    };
    this.showModal = true;
  }

  cerrarModal(): void {
    this.showModal = false;
  }

  guardarCarpeta(): void {
    if (!this.nuevaCarpeta.nombre || !this.nuevaCarpeta.id_sede) {
      alert('Completa al menos Nombre e ID Sede');
      return;
    }

    // Actualizar
    if (this.editando && this.nuevaCarpeta.id_carpeta != null) {
      this.http.post('http://localhost/API/carpeta/actualizar.php', this.nuevaCarpeta)
        .subscribe({
          next: _ => {
            alert('Carpeta actualizada');
            this.cerrarModal();
            this.obtenerCarpetas();
          },
          error: err => {
            console.error('Error al actualizar carpeta', err);
            alert('No se pudo actualizar');
          }
        });

    // Crear
    } else {
      const body = {
        nombre: this.nuevaCarpeta.nombre,
        id_sede: this.nuevaCarpeta.id_sede,
        id_sub_carpeta: this.nuevaCarpeta.id_sub_carpeta
      };

      this.http.post('http://localhost/API/carpeta/crear.php', body)
        .subscribe({
          next: _ => {
            alert('Carpeta registrada');
            this.cerrarModal();
            this.obtenerCarpetas();
          },
          error: err => {
            console.error('Error al registrar carpeta', err);
            alert('No se pudo registrar');
          }
        });
    }
  }

  eliminarCarpeta(id_carpeta: number): void {
    if (!confirm('¿Eliminar esta carpeta?')) return;

    this.http.post('http://localhost/API/carpeta/eliminar.php', { id_carpeta })
      .subscribe({
        next: _ => {
          alert('Carpeta eliminada');
          this.obtenerCarpetas();
        },
        error: err => {
          console.error('Error al eliminar carpeta', err);
          alert('No se pudo eliminar');
        }
      });
  }
}
