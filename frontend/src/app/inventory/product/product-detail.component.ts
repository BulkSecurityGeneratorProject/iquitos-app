import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {BaseProducto} from "./BaseProducto";

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss']
})
export class ProductDetailComponent extends BaseProducto implements OnInit {
  constructor(private activatedRoute: ActivatedRoute) {
    super(null,null,null,null, null, null);
  }

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ entity }) => {
      this.entity = entity;
    });
  }

}
