import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-formato',
  templateUrl: './formato.component.html',
  styleUrls: ['./formato.component.css']
})
export class FormatoComponent implements OnInit {

  // ➤ OPCIONES PARA LOS SELECTS
  tiposDocumento = ['PDF','DOCX','XLSX','JPG','PNG','TXT'];
  tiposGrupo = ['Legal','Técnico','Administrativo','Financiero','Académico'];
  ubicacionesDescripcion = ['Archivo físico','Archivo digital','Servidor interno','Carpeta compartida','Repositorio institucional'];
  tiposActivo: string[] = [
    'Actas','Actas de calificación','Actas de consejo','Autorizaciones','Base de datos','Bitácora','Carnets','Cédulas','Certificaciones',
    'Cheque','Circulares','Convenios','Convocatoria','Contratos','Correos','Diplomas','Estudios de Mercado','Evaluaciones','Exámenes',
    'Expedientes','Facturas','Formularios','Informes','Listado','Matriz','Memorandos','Normativas','Notas de crédito','Notas de débito',
    'Oficios','Ordenes de compra','Pagarés','Planillas','Proceso','Recibos','Reportes','Resoluciones','Roles','Solicitudes','Syllabus','Tesis'
  ];
  aniosConservacion: number[] = [1,2,3,4,5,6,7,8,9,10];

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

  // ➤ Obtener lista completa de formatos desde el backend
  obtenerFormatos(): void {
    this.http.get<any[]>('http://localhost/API/formato/listar.php').subscribe({
      next: data => {
        this.formatosOriginal = data;
        this.formatos = [...data];
      },
      error: err => console.error('Error al obtener formatos:', err)
    });
  }

  // ➤ Filtrar formatos por nombre de archivo o tipo de documento
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

  // ➤ Abrir modal para nuevo formato
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

  // ➤ Abrir modal para editar un formato existente
  abrirModalEditar(formato: any): void {
    this.editando = true;
    this.nuevoFormato = { ...formato };
    this.showModal = true;
  }

  cerrarModal(): void {
    this.showModal = false;
  }

  // ➤ Guardar o actualizar formato
  guardarFormato(): void {
    // Validaciones básicas
    if (!this.nuevoFormato.nombre_archivo?.trim()) {
      alert('El nombre del archivo es obligatorio');
      return;
    }

    if (
      (this.nuevoFormato.id_area !== null && this.nuevoFormato.id_area < 0) ||
      (this.nuevoFormato.periodo_de_conservacion_anio !== null && this.nuevoFormato.periodo_de_conservacion_anio < 0) ||
      (this.nuevoFormato.id_carpeta !== null && this.nuevoFormato.id_carpeta < 0)
    ) {
      alert('Los valores numéricos no pueden ser negativos');
      return;
    }

    const body = {
      formato_id: this.nuevoFormato.formato_id ?? null,
      nombre_archivo: this.nuevoFormato.nombre_archivo || '',
      activo_de_informacion: this.nuevoFormato.activo_de_informacion || '',
      id_area: this.nuevoFormato.id_area !== null ? Number(this.nuevoFormato.id_area) : null,
      periodo_de_conservacion_anio: this.nuevoFormato.periodo_de_conservacion_anio !== null ? Number(this.nuevoFormato.periodo_de_conservacion_anio) : null,
      ubicacion_descripcion: this.nuevoFormato.ubicacion_descripcion || '',
      tipo_documento: this.nuevoFormato.tipo_documento || '',
      tipo_grupo: this.nuevoFormato.tipo_grupo || '',
      tamano: this.nuevoFormato.tamano || '',
      fecha_subida: this.nuevoFormato.fecha_subida || '',
      tipo_etiqueta: this.nuevoFormato.tipo_etiqueta || '',
      id_carpeta: this.nuevoFormato.id_carpeta !== null ? Number(this.nuevoFormato.id_carpeta) : null,
      tipo_activo: this.nuevoFormato.tipo_activo || '',
      confidencialidad: !!this.nuevoFormato.confidencialidad,
      criticidad: this.nuevoFormato.criticidad || ''
    };

    const url = this.editando
      ? 'http://localhost/API/formato/actualizar.php'
      : 'http://localhost/API/formato/crear.php';

    this.http.post(url, body).subscribe({
      next: (res: any) => {
        if (this.editando) {
          // Actualizar solo el formato editado
          const index = this.formatosOriginal.findIndex(f => f.formato_id === this.nuevoFormato.formato_id);
          if (index !== -1) {
            this.formatosOriginal[index] = { ...this.nuevoFormato };
          }
        } else {
          // Agregar nuevo formato al array
          const nuevoId = res.inserted_id ?? Date.now(); // si tu backend devuelve id, úsalo
          this.formatosOriginal.push({ ...this.nuevoFormato, formato_id: nuevoId });
        }

        this.filtrarFormatos(); // actualizar lista filtrada
        this.cerrarModal();
        alert(this.editando ? 'Formato actualizado' : 'Formato registrado');
      },
      error: err => {
        console.error('Error al guardar formato:', err);
        alert('No se pudo registrar o actualizar');
      }
    });
  }

  // ➤ Eliminar formato
  eliminarFormato(formato_id: number): void {
    if (!confirm('¿Eliminar este formato?')) return;

    this.http.post('http://localhost/API/formato/eliminar.php', { formato_id }).subscribe({
      next: _ => {
        // Eliminar del array local para reflejar inmediatamente
        this.formatosOriginal = this.formatosOriginal.filter(f => f.formato_id !== formato_id);
        this.filtrarFormatos();
        alert('Formato eliminado');
      },
      error: err => {
        console.error('Error al eliminar formato:', err);
        alert('No se pudo eliminar');
      }
    });
  }
}
