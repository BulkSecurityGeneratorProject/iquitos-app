/* tslint:disable max-line-length */
import { TestBed, getTestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { of } from 'rxjs';
import { take, map } from 'rxjs/operators';
import * as moment from 'moment';
import { DATE_FORMAT } from 'app/shared/constants/input.constants';
import { ProductService } from 'app/entities/product/product.service';
import { IProduct, Product, ProductType } from 'app/shared/model/product.model';

describe('Service Tests', () => {
    describe('Product Service', () => {
        let injector: TestBed;
        let service: ProductService;
        let httpMock: HttpTestingController;
        let elemDefault: IProduct;
        let currentDate: moment.Moment;
        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [HttpClientTestingModule]
            });
            injector = getTestBed();
            service = injector.get(ProductService);
            httpMock = injector.get(HttpTestingController);
            currentDate = moment();

            elemDefault = new Product(
                0,
                'AAAAAAA',
                'AAAAAAA',
                0,
                currentDate,
                false,
                false,
                'image/png',
                'AAAAAAA',
                0,
                0,
                ProductType.BIENES
            );
        });

        describe('Service methods', async () => {
            it('should find an element', async () => {
                const returnedFromService = Object.assign(
                    {
                        expirationDate: currentDate.format(DATE_FORMAT)
                    },
                    elemDefault
                );
                service
                    .find(123)
                    .pipe(take(1))
                    .subscribe(resp => expect(resp).toMatchObject({ body: elemDefault }));

                const req = httpMock.expectOne({ method: 'GET' });
                req.flush(JSON.stringify(returnedFromService));
            });

            it('should create a Product', async () => {
                const returnedFromService = Object.assign(
                    {
                        id: 0,
                        expirationDate: currentDate.format(DATE_FORMAT)
                    },
                    elemDefault
                );
                const expected = Object.assign(
                    {
                        expirationDate: currentDate
                    },
                    returnedFromService
                );
                service
                    .create(new Product(null))
                    .pipe(take(1))
                    .subscribe(resp => expect(resp).toMatchObject({ body: expected }));
                const req = httpMock.expectOne({ method: 'POST' });
                req.flush(JSON.stringify(returnedFromService));
            });

            it('should update a Product', async () => {
                const returnedFromService = Object.assign(
                    {
                        code: 'BBBBBB',
                        description: 'BBBBBB',
                        dni: 1,
                        expirationDate: currentDate.format(DATE_FORMAT),
                        isFavorite: true,
                        visibleToSell: true,
                        image: 'BBBBBB',
                        stock: 1,
                        stockLimitNotification: 1,
                        productType: 'BBBBBB'
                    },
                    elemDefault
                );

                const expected = Object.assign(
                    {
                        expirationDate: currentDate
                    },
                    returnedFromService
                );
                service
                    .update(expected)
                    .pipe(take(1))
                    .subscribe(resp => expect(resp).toMatchObject({ body: expected }));
                const req = httpMock.expectOne({ method: 'PUT' });
                req.flush(JSON.stringify(returnedFromService));
            });

            it('should return a list of Product', async () => {
                const returnedFromService = Object.assign(
                    {
                        code: 'BBBBBB',
                        description: 'BBBBBB',
                        dni: 1,
                        expirationDate: currentDate.format(DATE_FORMAT),
                        isFavorite: true,
                        visibleToSell: true,
                        image: 'BBBBBB',
                        stock: 1,
                        stockLimitNotification: 1,
                        productType: 'BBBBBB'
                    },
                    elemDefault
                );
                const expected = Object.assign(
                    {
                        expirationDate: currentDate
                    },
                    returnedFromService
                );
                service
                    .query(expected)
                    .pipe(
                        take(1),
                        map(resp => resp.body)
                    )
                    .subscribe(body => expect(body).toContainEqual(expected));
                const req = httpMock.expectOne({ method: 'GET' });
                req.flush(JSON.stringify([returnedFromService]));
                httpMock.verify();
            });

            it('should delete a Product', async () => {
                const rxPromise = service.delete(123).subscribe(resp => expect(resp.ok));

                const req = httpMock.expectOne({ method: 'DELETE' });
                req.flush({ status: 200 });
            });
        });

        afterEach(() => {
            httpMock.verify();
        });
    });
});
