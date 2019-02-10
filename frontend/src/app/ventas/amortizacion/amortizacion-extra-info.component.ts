import {Component, ElementRef, Inject} from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import {HttpErrorResponse, HttpResponse} from "@angular/common/http";
import {TipoDePagoService} from "../../configuration/paymenttype/tipo-de-pago.service";
import {ITipoDePago, TipoDePago} from "../../models/tipo-de-pago.model";
import {ITipoDeDocumentoDeVenta, TipoDeDocumentoDeVenta} from "../../models/tipo-de-documento-de-venta.model";
import {TipoDeDocumentoDeVentaService} from "../../configuration/documenttypesell/tipo-de-documento-de-venta.service";
import Util from "../../shared/util/util";
import {Amortizacion} from "../../models/amortizacion.model";
import {Venta} from "../../models/venta.model";

import * as moment from 'moment';
import {JhiDataUtils} from "ng-jhipster";

@Component({
  selector: 'app-amortizacion-extra-info',
  templateUrl: './amortizacion-extra-info.component.html',
  styleUrls: ['./amortizacion-extra-info.component.scss']
})
export class AmortizacionExtraInfoComponent {

  public paymentTypes: TipoDePago[] = [];
  public documentTypeSells: TipoDeDocumentoDeVenta[] = [];
  amortization: Amortizacion = new Amortizacion();

  public montoTotal: number;

  constructor(
    private dataUtils: JhiDataUtils,
    public dialogRef: MatDialogRef<AmortizacionExtraInfoComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public tipoDePagoService: TipoDePagoService,
    public tipoDeDocumentoDeVenta: TipoDeDocumentoDeVentaService,
    private elementRef: ElementRef
  ) {
    console.log(this.data);
    this.amortization.montoPagado = this.data.entity.montoTotal - this.getMontoAmortizadoPopUp(this.data.entity);
    this.montoTotal = this.amortization.montoPagado;
    this.amortization.monto = this.data.entity.montoTotal;
    this.amortization.codigoDocumento = this.data.client.codigo;
    this.amortization.fecha = moment();
    console.log(this.amortization.fecha);

    this.tipoDePagoService.query().subscribe(
      (res: HttpResponse<ITipoDePago[]>) => {
        this.paymentTypes = res.body;
        if (this.paymentTypes.length > 0){
          this.data.entity.tipoDePagoId = this.paymentTypes[0].id;
        }
      },
      (res: HttpErrorResponse) => this.onError(res.message)
    );

    this.tipoDeDocumentoDeVenta.query().subscribe(
      (res: HttpResponse<ITipoDeDocumentoDeVenta[]>) => {
        this.documentTypeSells = res.body;
        // if (this.documentTypeSells.length > 0){
        //   this.data.entity.tipoDeDocumentoDeVentaId = this.documentTypeSells[0].id;
        // }
      },
      (res: HttpErrorResponse) => this.onError(res.message)
    );
  }

  getMontoAmortizadoPopUp(sell: Venta): number {
    return sell.amortizacions.map(x => x.montoPagado).reduce((a, b) => a + b, 0)
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  closeAndCheckSell(param: string) {
      if (param ==='exit') {
        this.dialogRef.close({
          entity: null,
          amortization: null,
          flag: param
        });
      }

    if (param ==='pay') {
      this.amortization.tipoDeDocumentoDeVentaId = this.data.entity.tipoDeDocumentoDeVentaId;
      this.amortization.tipoDePagoId = this.data.entity.tipoDePagoId;
      this.amortization.glosa = this.data.entity.glosa;
      this.amortization.montoPagado = parseFloat(this.amortization.montoPagado.toString());

      let tipoDocumentoVenta = this.documentTypeSells.find(x => x.id === this.amortization.tipoDeDocumentoDeVentaId);
      const countTipoDocumentoVenta = sessionStorage.getItem('correlativo.contador.' + tipoDocumentoVenta.nombre);
      sessionStorage.setItem('correlativo.contador.' + tipoDocumentoVenta.nombre, (parseInt(countTipoDocumentoVenta) + 1).toString());

      this.updateEntityCustom();

      this.dialogRef.close({
        entity: this.data.entity,
        amortization: this.amortization,
        flag: param
      });
    }
  }

  onError(errorMessage: string) {
    console.log(errorMessage);
  }

  checkNumbersDecimalOnly(event: KeyboardEvent) {
    return Util.checkNumbersDecimalOnly(event);
  }

  checkNumbersOnly(event: any): boolean {
    return Util.checkNumbersOnly(event);
  }

  parseFloatCustom(cantidad: number) {
    // @ts-ignore
    return parseFloat(Math.round(cantidad * 100) / 100).toFixed(2)
  }

  validateDocumentCodeInvalid(){
    if (this.amortization.codigoDocumento === undefined) {
      return true;
    } else {
      return this.amortization.codigoDocumento.length === 0;
    }
  }

  public updateEntityCustom() {
    let flag = true;

    if (this.documentTypeSells.find(x => x.nombre === 'Boleta Electronica').id === this.amortization.tipoDeDocumentoDeVentaId) {
      this.amortization.codigo = 'B001-00000' + Math.round(Math.random() * (10000 - 1) + 1);
      flag = false;
    }

    if (this.documentTypeSells.find(x => x.nombre === 'Factura Electronica').id === this.amortization.tipoDeDocumentoDeVentaId) {
      this.amortization.codigo = 'F001-00000' + Math.round(Math.random() * (10000 - 1) + 1);
      flag = false;
    }

    if (flag) {
      this.amortization.codigo = 'M001-00000' + Math.round(Math.random() * (10000 - 1) + 1);
    }
  }

  byteSize(field) {
    return this.dataUtils.byteSize(field);
  }

  openFile(contentType, field) {
    return this.dataUtils.openFile(contentType, field);
  }

  setFileData(event, entity, field, isImage) {
    this.compress(event, entity);
    // this.dataUtils.setFileData(event, entity, field, isImage);
  }

  clearInputImage(field: string, fieldContentType: string, idInput: string) {
    this.dataUtils.clearInputImage(this.amortization, this.elementRef, field, fieldContentType, idInput);
  }

  compress(e, entity: Amortizacion) {
    let width = 0;
    let height = 0;
    const fileName = e.target.files[0].name;
    const reader = new FileReader();
    reader.readAsDataURL(e.target.files[0]);
    reader.onload = event => {
      const img = new Image();
      // @ts-ignore
      img.src = event.target.result;
      img.onload = (image) => {
        const elem = document.createElement('canvas');

        // @ts-ignore
        if (image.path[0].width > image.path[0].height) {
          // @ts-ignore
          if (image.path[0].width > 1000) {
            // @ts-ignore
            const aux = image.path[0].width - 1000;
            // @ts-ignore
            width = image.path[0].width - aux;
            // @ts-ignore
            height = (width / image.path[0].width) * image.path[0].height;
          } else {
            // @ts-ignore
            width = image.path[0].width;
            // @ts-ignore
            height = image.path[0].height;
          }
        } else {
          // @ts-ignore
          if (image.path[0].height > 1000) {
            // @ts-ignore
            const aux = image.path[0].height - 1000;
            // @ts-ignore
            height = image.path[0].height - aux;
            // @ts-ignore
            width = (height / image.path[0].height) * image.path[0].width;
          } else {
            // @ts-ignore
            width = image.path[0].width;
            // @ts-ignore
            height = image.path[0].height;
          }
        }

        elem.width = width;
        elem.height = height;

        const ctx = elem.getContext('2d');
        // img.width and img.height will give the original dimensions
        ctx.drawImage(img, 0, 0, width, height);
        ctx.canvas.toBlob((blob) => {
          const file = new File([blob], fileName, {
            type: 'image/jpeg',
            lastModified: Date.now()
          });

          var fileReader= new FileReader();

          fileReader.onload = (e) => {
            // @ts-ignore
            // console.log(e.target.result.toString().split(';base64,')[1]);
            entity.fotoComprobanteContentType = 'image/jpeg';
            // @ts-ignore
            entity.fotoComprobante = e.target.result.toString().split(';base64,')[1];
          };

          fileReader.readAsDataURL(file);

        }, 'image/jpeg', 1);
      };
        reader.onerror = error => console.log(error);
    };
  }

}
