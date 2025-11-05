import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-area',
  templateUrl: './area.component.html',
  styleUrls: ['./area.component.css']
})
export class AreaComponent implements OnInit {

  areas: any[] = [];
  areasOriginal: any[] = [];

  nombreBusqueda: string = '';

  nuevaArea = {
    area_id: null as number | null,
    nombre: '',
    id_sub_area: null as number | null,
    departamento: '',
    id_sede: null as number | null
  };

  showModal = false;
  editando = false;

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.obtenerAreas();
  }

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

  abrirModalNueva(): void {
    this.editando = false;
    this.nuevaArea = {
      area_id: null,
      nombre: '',
      id_sub_area: null,
      departamento: '',
      id_sede: null
    };
    this.showModal = true;
  }

  abrirModalEditar(area: any): void {
    this.editando = true;
    this.nuevaArea = {
      area_id: area.area_id,
      nombre: area.nombre,
      id_sub_area: area.id_sub_area,
      departamento: area.departamento,
      id_sede: area.id_sede
    };
    this.showModal = true;
  }

  cerrarModal(): void {
    this.showModal = false;
  }

  guardarArea(): void {
    if (!this.nuevaArea.nombre || !this.nuevaArea.departamento || !this.nuevaArea.id_sede) {
      alert('Completa al menos nombre, departamento e id_sede');
      return;
    }

    // actualizar
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

    // crear
    } else {
      const body = {
        nombre: this.nuevaArea.nombre,
        id_sub_area: this.nuevaArea.id_sub_area,
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
            alert('No se pudo registrar');
          }
        });
    }
  }

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
}
