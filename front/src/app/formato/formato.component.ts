import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-formato',
  templateUrl: './formato.component.html',
  styleUrls: ['./formato.component.css']
})
export class FormatoComponent implements OnInit {

  // ➤ OPCIONES PARA LOS SELECTS
  tiposDocumento = [
    'PDF',
    'DOCX',
    'XLSX',
    'JPG',
    'PNG',
    'TXT'
  ];

  tiposGrupo = [
    'Legal',
    'Técnico',
    'Administrativo',
    'Financiero',
    'Académico'
  ];

  ubicacionesDescripcion = [
    'Archivo físico',
    'Archivo digital',
    'Servidor interno',
    'Carpeta compartida',
    'Repositorio institucional'
  ];

  // ➤ DATOS PRINCIPALES
  formatos: any[] = [];
  formatosOriginal: any[] = [];

  nombreBusqueda: string = '';

  nuevoFormato = {
    formato_id: null as number | null,
    activo_de_informacion: '',
    id_area: null as number | null,
    periodo_de_conservacion_anio: null as number | null,
    ubicacion_descripcion: '',
    tipo_documento: '',
    tipo_grupo: '',
    tamano: '',
    nombre_archivo: '',
    fecha_subida: '',
    tipo_etiqueta: '',
    id_carpeta: null as number | null,
    tipo_activo: '',
    confidencialidad: false,
    criticidad: ''
  };

  showModal = false;
  editando = false;

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.obtenerFormatos();
  }

  obtenerFormatos(): void {
    this.http.get<any[]>('http://localhost/API/formato/listar.php')
      .subscribe({
        next: data => {
          this.formatosOriginal = data;
          this.formatos = data;
        },
        error: err => console.error('Error al obtener formatos:', err)
      });
  }

  filtrarFormatos(): void {
    const term = this.nombreBusqueda.toLowerCase().trim();
    if (!term) {
      this.formatos = [...this.formatosOriginal];
      return;
    }

    this.formatos = this.formatosOriginal.filter(f =>
      (f.nombre_archivo && f.nombre_archivo.toLowerCase().includes(term)) ||
      (f.tipo_documento && f.tipo_documento.toLowerCase().includes(term))
    );
  }

  abrirModalNuevo(): void {
    this.editando = false;
    this.nuevoFormato = {
      formato_id: null,
      activo_de_informacion: '',
      id_area: null,
      periodo_de_conservacion_anio: null,
      ubicacion_descripcion: '',
      tipo_documento: '',
      tipo_grupo: '',
      tamano: '',
      nombre_archivo: '',
      fecha_subida: '',
      tipo_etiqueta: '',
      id_carpeta: null,
      tipo_activo: '',
      confidencialidad: false,
      criticidad: ''
    };
    this.showModal = true;
  }

  abrirModalEditar(formato: any): void {
    this.editando = true;
    this.nuevoFormato = { ...formato };
    this.showModal = true;
  }

  cerrarModal(): void {
    this.showModal = false;
  }

  guardarFormato(): void {

    // Validación: nombre del archivo obligatorio
    if (!this.nuevoFormato.nombre_archivo?.trim()) {
      alert('El nombre del archivo es obligatorio');
      return;
    }

    // ✅ VALIDACIÓN: evitar valores negativos en números
    if (
      (this.nuevoFormato.id_area !== null && this.nuevoFormato.id_area < 0) ||
      (this.nuevoFormato.periodo_de_conservacion_anio !== null && this.nuevoFormato.periodo_de_conservacion_anio < 0) ||
      (this.nuevoFormato.id_carpeta !== null && this.nuevoFormato.id_carpeta < 0)
    ) {
      alert('Los valores numéricos (ID Área, Años de conservación, ID Carpeta) no pueden ser negativos');
      return;
    }

    const url = this.editando ?
      'http://localhost/API/formato/actualizar.php' :
      'http://localhost/API/formato/crear.php';

    const body = { ...this.nuevoFormato };

    console.log('Enviando al backend:', body);

    this.http.post(url, body).subscribe({
      next: (res: any) => {
        console.log('Respuesta del backend:', res);
        alert(this.editando ? 'Formato actualizado' : 'Formato registrado');
        this.cerrarModal();
        this.obtenerFormatos();
      },
      error: err => {
        console.error('Error al guardar formato:', err);
        alert('No se pudo registrar/actualizar. Revisa la consola para más detalles.');
      }
    });
  }

  eliminarFormato(formato_id: number): void {
    if (!confirm('¿Eliminar este formato?')) return;

    this.http.post('http://localhost/API/formato/eliminar.php', { formato_id })
      .subscribe({
        next: _ => {
          alert('Formato eliminado');
          this.obtenerFormatos();
        },
        error: err => {
          console.error('Error al eliminar formato:', err);
          alert('No se pudo eliminar');
        }
      });
  }
}
