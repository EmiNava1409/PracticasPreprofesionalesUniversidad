import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterSede'
})
export class FilterSedePipe implements PipeTransform {
  transform(sedes: any[], busqueda: string): any[] {
    if (!busqueda) return sedes;
    return sedes.filter(sede =>
      sede.nombre_sede.toLowerCase().includes(busqueda.toLowerCase())
    );
  }
}
