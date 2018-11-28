import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot, Routes } from '@angular/router';

import { RelatedproductstagComponent } from './relatedproductstag.component';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { HttpResponse } from '@angular/common/http';
import {IProductosRelacionadosTags, ProductosRelacionadosTags} from '../models/productos-relacionados-tags.model';
import {ProductosRelacionadosTagsService} from './productos-relacionados-tags.service';

@Injectable({ providedIn: 'root' })
export class RelatedproductstagResolve implements Resolve<IProductosRelacionadosTags> {
  constructor(private service: ProductosRelacionadosTagsService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<ProductosRelacionadosTags> {
    const id = route.params['id'] ? route.params['id'] : null;
    if (id) {
      return this.service.find(id).pipe(
        filter((response: HttpResponse<ProductosRelacionadosTags>) => response.ok),
        map((proveedor: HttpResponse<ProductosRelacionadosTags>) => proveedor.body)
      );
    }
    return of(new ProductosRelacionadosTags());
  }
}

export const RelatedproductstagRoutes: Routes = [
  {
    path: '',
    component: RelatedproductstagComponent
  }
];
