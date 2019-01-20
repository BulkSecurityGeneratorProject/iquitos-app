import {Component, ElementRef, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Observable} from 'rxjs';
import {HttpErrorResponse, HttpResponse} from '@angular/common/http';
import {FormBuilder} from '@angular/forms';
import {IVenta} from "../../models/venta.model";
import {VentaService} from "./venta.service";
import {JhiDataUtils} from 'ng-jhipster';
import {MatDialog, MatTableDataSource} from "@angular/material";
import {BaseVenta} from "./BaseVenta";
import {IProducto, Producto} from "../../models/producto.model";
import {ProductoService} from "../../inventory/product/producto.service";
import {CivilStatus, Cliente, ClientType, ICliente, Sex} from "../../models/cliente.model";
import {ClienteService} from "../../contact/client/cliente.service";
import {ITipoDeDocumento} from "../../models/tipo-de-documento.model";
import {TipoDeDocumentoService} from "../../configuration/documenttype/tipo-de-documento.service";
import {SellVariantselectionComponent} from "./sell-variantselection.component";
import {SellDeleteComponent} from "./sell-delete.component";
import {Variante} from "../../models/variante.model";

export interface ProductoDetalle {
  cantidad: number;
  productoLabel: string;
  precioVenta: number;
  producto: Producto;
  variante: Variante;
}

@Component({
  selector: 'app-sell-update',
  templateUrl: './sell-update.component.html',
  styleUrls: ['./sell-update.component.scss']
})
export class SellUpdateComponent extends BaseVenta implements OnInit {

  private editFlag: boolean;
  currentSearchProduct: string;
  currentSearchClient: string;
  productos: IProducto[];
  clientes: ICliente[];
  displayedColumnsProductosDetalles = ['cantidad', 'producto', 'precioVenta', 'precioTotal', 'quitar'];
  displayedColumnsClientes = ['name', 'action'];

  productosDetalles: ProductoDetalle[]  = [];

  dataSourceProductosDetalles = new MatTableDataSource<ProductoDetalle>(this.productosDetalles);
  dataSourceClientes = new MatTableDataSource<Cliente>(this.clientes);
  stateStep: string = 'sell';

  client: Cliente = new Cliente();

  sexos: Sex[] = [
    Sex.FEMENINO,
    Sex.MASCULINO
  ];

  estatusCiviles: CivilStatus[] = [
    CivilStatus.CASADO,
    CivilStatus.SOLTERO
  ];

  tiposDeCliente: ClientType[] = [
    ClientType.JURIDICO,
    ClientType.NATURAL
  ];

  tiposDeDocumento: ITipoDeDocumento[];
  subtotalMonto = 0.00;
  totalMonto = 0.00;

  constructor(public dataUtils: JhiDataUtils,
              public service: VentaService,
              public productoService: ProductoService,
              public clienteService: ClienteService,
              private tiposDeDocumentoService: TipoDeDocumentoService,
              public activatedRoute: ActivatedRoute,
              public elementRef: ElementRef,
              public fb: FormBuilder,
              public dialogVariant: MatDialog) {
    super(service, null,null,null, dataUtils, elementRef);
  }

  ngOnInit() {
    console.log(this.productosDetalles);

    this.isSaving = false;

    this.activatedRoute.data.subscribe(({ entity }) => {
      this.entity = entity;

      this.form = this.fb.group({
      });

      if (this.entity.id) {
        console.log(this.entity);
        this.editFlag = true;

      } else {
      }
    });

    this.tiposDeDocumentoService.query().subscribe(
      (res: HttpResponse<ITipoDeDocumento[]>) => {
        this.tiposDeDocumento = res.body;
      },
      (res: HttpErrorResponse) => this.onError(res.message)
    );

    this.productoService.query().subscribe(
      (res: HttpResponse<ITipoDeDocumento[]>) => {
        this.productos = res.body;
      },
      (res: HttpErrorResponse) => this.onError(res.message)
    );
  }

  save() {
    this.updateEntity();
    super.save();
  }

  public subscribeToSaveResponse(result: Observable<HttpResponse<IVenta>>) {
    result.subscribe((res: HttpResponse<IVenta>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
  }

  public onSaveSuccess() {
    this.isSaving = false;
    this.previousState();
  }

  public updateEntity() {
    if (this.entity.codigo === undefined) {
      this.entity.codigo = 'COD00000' + Math.round(Math.random() * (10000 - 1) + 1);
    }

    if (this.entity.codigo.length === 0) {
      this.entity.codigo = 'COD00000' + Math.round(Math.random() * (10000 - 1) + 1);
    }
  }

  searchProduct(query) {
    if (!query) {
      // return this.clear();
      this.productoService.query().subscribe(
        (res: HttpResponse<ITipoDeDocumento[]>) => {
          this.productos = res.body;
        },
        (res: HttpErrorResponse) => this.onError(res.message)
      );
    } else {
      this.productoService.search({
        query: query,
        page: this.page,
        size: this.itemsPerPage,
        sort: this.sort()
      }).subscribe(
        (res: HttpResponse<IProducto[]>) => {
          this.productos = res.body;
        },
        (res: HttpErrorResponse) => this.onError(res.message)
      );
    }
  }

  searchClient(query) {
    if (!query) {
      // return this.clear();
      this.clienteService.query().subscribe(
        (res: HttpResponse<ITipoDeDocumento[]>) => {
          this.clientes = res.body;
          this.dataSourceClientes = new MatTableDataSource<Cliente>(this.clientes);
        },
        (res: HttpErrorResponse) => this.onError(res.message)
      );
    } else {
      this.clienteService.search({
        query: query,
        page: this.page,
        size: this.itemsPerPage,
        sort: this.sort()
      }).subscribe(
        (res: HttpResponse<IProducto[]>) => {
          this.clientes = res.body;
          this.dataSourceClientes = new MatTableDataSource<Cliente>(this.clientes);
        },
        (res: HttpErrorResponse) => this.onError(res.message)
      );
    }
  }


  saveChangesInProductosDetallesRow($event: FocusEvent, i: any, label: string) {
    // @ts-ignore
    console.log($event.target.value, i, label);

    if (label === 'cantidad') {
      // @ts-ignore
      this.productosDetalles[i].cantidad = parseInt($event.target.value);
    }

    if (label === 'precioVenta') {
      // @ts-ignore
      this.productosDetalles[i].precioVenta = parseFloat($event.target.value);
    }

    this.dataSourceProductosDetalles = new MatTableDataSource<ProductoDetalle>(this.productosDetalles);
    this.setAmmount();
  }

  deleteProductosDetalles(i: any, row: any) {
    this.productosDetalles.splice(i,1);

    this.dataSourceProductosDetalles = new MatTableDataSource<ProductoDetalle>(this.productosDetalles);
    this.setAmmount();
  }

  goStep(step: string, view: string, row: Cliente) {
    switch (step) {
      case 'sell': {
        this.stateStep = step;
        break;
      }

      case 'clientList': {
        this.stateStep = step;
        this.searchClient('');
        break;
      }

      case 'clientUpdate': {
        this.stateStep = step;
        if (view === 'new') {
          this.client = new Cliente();
        } else {
          this.client = row;
        }
        break;
      }
    }
  }

  setClient(row: Cliente) {
    this.client = row;
    this.goStep('sell', null, null);
  }

  saveClient() {
    console.log(this.client.toString());
    this.isSaving = true;
    if (this.client.id !== undefined) {
      this.clienteService.update(this.client).subscribe(
        (res: HttpResponse<Cliente>) => {
          console.log(res.body);
          this.client = res.body;
          this.goStep('sell', null, null);
        },
        (res: HttpErrorResponse) => this.onError(res.message)
      );
    } else {
      this.clienteService.create(this.client).subscribe(
        (res: HttpResponse<Cliente>) => {
          console.log(res.body);
          this.client = res.body;
          this.goStep('sell', null, null);
        },
        (res: HttpErrorResponse) => this.onError(res.message)
      );
    }
  }

  validateSearchProduct() {
    if (this.currentSearchProduct.length > 2 || this.currentSearchProduct.length === 0) {
     this.searchProduct(this.currentSearchProduct)
    }
  }

  validateSearchClient() {
    if (this.currentSearchClient.length > 2 || this.currentSearchClient.length === 0) {
      this.searchClient(this.currentSearchClient)
    }
  }

  openDialogVariantSelection(entity): void {
    const dialogRef = this.dialogVariant.open(SellVariantselectionComponent, {
      width: '50%',
      data: { entity: entity }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result !== undefined) {
        console.log(result);

        let productoLabelExtra = null;

        if (result.isVariant) {
          productoLabelExtra = result.variant.nombre;
        } else {
          productoLabelExtra = entity.unidadDeMedida;
        }

        const productoDetalle = <ProductoDetalle>{
          cantidad: 1,
          precioVenta: result.isVariant ? result.variant.precioCompra : entity.precioVenta,
          producto: entity,
          productoLabel: entity.nombre + '('+productoLabelExtra+')',
          variante: result.variant
        };

        const index = this.productosDetalles.map(x => x.productoLabel).indexOf(productoDetalle.productoLabel);

        if (index !== -1) {
          this.productosDetalles[index].cantidad += 1;
          this.productosDetalles[index].precioVenta += productoDetalle.precioVenta;
        } else {
          this.productosDetalles.push(productoDetalle);
        }

        this.dataSourceProductosDetalles = new MatTableDataSource<ProductoDetalle>(this.productosDetalles);
        this.setAmmount();
      }
    });
  }

  setAmmount(){
    if (this.productosDetalles.length === 0) {
      this.subtotalMonto = this.totalMonto = 0;
    } else {
      this.subtotalMonto = this.totalMonto = this.productosDetalles.map(x => x.precioVenta * x.cantidad).reduce((a, b) => a + b, 0);
    }
  }

  addExtraInfoSell() {
    console.log(JSON.stringify(this.productosDetalles));
    console.log(JSON.stringify(this.productosDetalles).length);
  }
}