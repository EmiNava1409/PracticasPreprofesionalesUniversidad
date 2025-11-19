import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-area',
  templateUrl: './area.component.html',
  styleUrls: ['./area.component.css']
})
export class AreaComponent implements OnInit {

  // Lista de áreas
  areas: any[] = [];
  areasOriginal: any[] = [];

  // Lista de sedes (para el select)
  sedes: any[] = [];

  // Texto de búsqueda
  nombreBusqueda: string = '';

  // Modelo para el formulario (crear / editar)
  nuevaArea = {
    area_id: null as number | null,
    nombre: '',
    id_sub_area: null as number | null, // sigue existiendo pero el usuario no lo ve
    departamento: '',
    id_sede: null as number | null
  };

  // Control del modal
  showModal = false;
  editando = false;

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.obtenerAreas();
    this.obtenerSedes();
  }

  // Obtener todas las áreas
  obtenerAreas(): void {
    this.http.get<any[]>('http://localhost/API/area/listar.php')
      .subscribe({
        next: data => {
          this.areasOriginal = data;
          this.areas = data;
        },
        error: err => console.error('Error al obtener áreas:', err)
      });
  }

  // Obtener todas las sedes para el select
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

  // Buscar por nombre o departamento
  filtrarAreas(): void {
    const term = this.nombreBusqueda.toLowerCase().trim();
    if (!term) {
      this.areas = [...this.areasOriginal];
      return;
    }

    this.areas = this.areasOriginal.filter(a =>
      (a.nombre && a.nombre.toLowerCase().includes(term)) ||
      (a.departamento && a.departamento.toLowerCase().includes(term))
    );
  }

  // Abrir modal para nueva área
  abrirModalNueva(): void {
    this.editando = false;
    this.nuevaArea = {
      area_id: null,
      nombre: '',
      id_sub_area: null,   // siempre null al crear
      departamento: '',
      id_sede: null
    };
    this.showModal = true;
  }

  // Abrir modal para editar un área existente
  abrirModalEditar(area: any): void {
    this.editando = true;
    this.nuevaArea = {
      area_id: area.area_id,
      nombre: area.nombre,
      id_sub_area: area.id_sub_area ?? null, // por si la BD sí tiene algo
      departamento: area.departamento,
      id_sede: area.id_sede
    };
    this.showModal = true;
  }

  // Cerrar modal
  cerrarModal(): void {
    this.showModal = false;
  }

  // Guardar (crear o actualizar)
  guardarArea(): void {
    if (!this.nuevaArea.nombre || !this.nuevaArea.departamento || !this.nuevaArea.id_sede) {
      alert('Completa al menos Nombre, Departamento y Sede');
      return;
    }

    // Actualizar
    if (this.editando && this.nuevaArea.area_id != null) {
      this.http.post('http://localhost/API/area/actualizar.php', this.nuevaArea)
        .subscribe({
          next: _ => {
            alert('Área actualizada');
            this.cerrarModal();
            this.obtenerAreas();
          },
          error: err => {
            console.error('Error al actualizar área', err);
            alert('No se pudo actualizar');
          }
        });

    // Crear
    } else {
      const body = {
        nombre: this.nuevaArea.nombre,
        id_sub_area: null,  // 🔹 siempre NULL al crear, el usuario no lo maneja
        departamento: this.nuevaArea.departamento,
        id_sede: this.nuevaArea.id_sede
      };

      this.http.post('http://localhost/API/area/crear.php', body)
        .subscribe({
          next: _ => {
            alert('Área registrada');
            this.cerrarModal();
            this.obtenerAreas();
          },
          error: err => {
            console.error('Error al registrar área', err);
            console.log('Detalle del error:', err.error);
            alert('No se pudo registrar');
          }
        });
    }
  }

  // Eliminar área
  eliminarArea(area_id: number): void {
    if (!confirm('¿Eliminar esta área?')) return;

    this.http.post('http://localhost/API/area/eliminar.php', { area_id })
      .subscribe({
        next: _ => {
          alert('Área eliminada');
          this.obtenerAreas();
        },
        error: err => {
          console.error('Error al eliminar área', err);
          alert('No se pudo eliminar');
        }
      });
  }

  // Mostrar nombre de sede en la tabla a partir del id
  obtenerNombreSede(id_sede: number | null): string {
    if (id_sede == null) return '-';
    const sede = this.sedes.find(s => s.id_sede == id_sede);
    return sede ? sede.nombre_sede : id_sede.toString();
  }

}
