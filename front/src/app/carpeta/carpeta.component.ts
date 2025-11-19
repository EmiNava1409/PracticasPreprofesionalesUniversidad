import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-carpeta',
  templateUrl: './carpeta.component.html',
  styleUrls: ['./carpeta.component.css']
})
export class CarpetaComponent implements OnInit {

  // Lista de carpetas
  carpetas: any[] = [];
  carpetasOriginal: any[] = [];

  // Lista de sedes (para el select)
  sedes: any[] = [];

  // Texto de búsqueda
  nombreBusqueda: string = '';

  // Modelo para el formulario (crear / editar)
  nuevaCarpeta = {
    id_carpeta: null as number | null,
    nombre: '',
    id_sede: null as number | null,
    id_sub_carpeta: null as number | null   // el usuario no lo ve, pero existe
  };

  showModal = false;
  editando = false;

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.obtenerCarpetas();
    this.obtenerSedes();
  }

  // Obtener todas las carpetas
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

  // Obtener sedes para el select
  obtenerSedes(): void {
    this.http.get<any[]>('http://localhost/API/sede/listar.php')
      .subscribe({
        next: data => {
          this.sedes = data;
        },
        error: err => {
          console.error('Error al obtener sedes:', err);
        }
      });
  }

  // Buscar por nombre o por id_sede (texto)
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

  // Abrir modal para nueva carpeta
  abrirModalNueva(): void {
    this.editando = false;
    this.nuevaCarpeta = {
      id_carpeta: null,
      nombre: '',
      id_sede: null,
      id_sub_carpeta: null   // siempre null al crear
    };
    this.showModal = true;
  }

  // Abrir modal para editar carpeta
  abrirModalEditar(carpeta: any): void {
    this.editando = true;
    this.nuevaCarpeta = {
      id_carpeta: carpeta.id_carpeta,
      nombre: carpeta.nombre,
      id_sede: carpeta.id_sede,
      id_sub_carpeta: carpeta.id_sub_carpeta ?? null
    };
    this.showModal = true;
  }

  cerrarModal(): void {
    this.showModal = false;
  }

  // Guardar carpeta (crear / actualizar)
  guardarCarpeta(): void {
    if (!this.nuevaCarpeta.nombre || !this.nuevaCarpeta.id_sede) {
      alert('Completa al menos Nombre y Sede');
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
        id_sub_carpeta: null  // 🔹 siempre null, el usuario no maneja subcarpeta
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
            console.log('Detalle del error:', err.error);
            alert('No se pudo registrar');
          }
        });
    }
  }

  // Eliminar carpeta
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

  // Mostrar nombre de sede a partir del id
  obtenerNombreSede(id_sede: number | null): string {
    if (id_sede == null) return '-';
    const sede = this.sedes.find(s => s.id_sede == id_sede);
    return sede ? sede.nombre_sede : id_sede.toString();
  }

}
