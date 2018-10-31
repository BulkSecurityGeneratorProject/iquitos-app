import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IVenta } from 'app/shared/model/venta.model';

@Component({
    selector: 'jhi-venta-detail',
    templateUrl: './venta-detail.component.html'
})
export class VentaDetailComponent implements OnInit {
    venta: IVenta;

    constructor(private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ venta }) => {
            this.venta = venta;
        });
    }

    previousState() {
        window.history.back();
    }
}
