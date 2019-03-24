import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {BaseVenta} from "./BaseVenta";
import {MatDialog, MatTableDataSource} from "@angular/material";
import {ProductoDetalle} from "../../models/producto-detalle.model";
import {Amortizacion} from "../../models/amortizacion.model";
import {SellShowImageComponent} from "./sell-show-image.component";

declare var require: any;

@Component({
  selector: 'app-sell-detail',
  templateUrl: './sell-detail.component.html',
  styleUrls: ['./sell-detail.component.scss']
})
export class SellDetailComponent extends BaseVenta implements OnInit {

  displayedColumnsProductosDetalles = ['producto', 'cantidad', 'precioVenta', 'precioTotal'];
  displayedColumnsAmortizaciones = ['comprobante', 'fecha', 'metodo', 'importe','img', 'imprimir'];
  dataSourceProductosDetalles = new MatTableDataSource<ProductoDetalle>(null);
  dataSourceAmortizaciones = new MatTableDataSource<Amortizacion>(null);

  constructor(private activatedRoute: ActivatedRoute, public dialog: MatDialog) {
    super(null,null,null,dialog, null, null, require('../menu.json'), 'VENTAS');
  }

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ entity }) => {
      this.entity = entity;
      this.dataSourceProductosDetalles = new MatTableDataSource<ProductoDetalle>(this.entity.productoDetalles);
      this.dataSourceAmortizaciones = new MatTableDataSource<Amortizacion>(this.entity.amortizacions);
    });
  }

  getMontoAmortizado(): number {
    return this.entity.amortizacions.map(x => x.montoPagado).reduce((a, b) => a + b, 0)
  }

  showImage(s: string) {
    console.log(s);

    const dialogRef = this.dialog.open(SellShowImageComponent, {
      width: '95%',
      data: { image: s }
    });

    dialogRef.afterClosed().subscribe(result => {
    });
  }
}
