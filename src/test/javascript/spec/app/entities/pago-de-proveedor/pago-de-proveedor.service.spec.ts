/* tslint:disable max-line-length */
import { TestBed, getTestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { of } from 'rxjs';
import { take, map } from 'rxjs/operators';
import * as moment from 'moment';
import { DATE_FORMAT } from 'app/shared/constants/input.constants';
import { PagoDeProveedorService } from 'app/entities/pago-de-proveedor/pago-de-proveedor.service';
import { IPagoDeProveedor, PagoDeProveedor } from 'app/shared/model/pago-de-proveedor.model';

describe('Service Tests', () => {
    describe('PagoDeProveedor Service', () => {
        let injector: TestBed;
        let service: PagoDeProveedorService;
        let httpMock: HttpTestingController;
        let elemDefault: IPagoDeProveedor;
        let currentDate: moment.Moment;
        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [HttpClientTestingModule]
            });
            injector = getTestBed();
            service = injector.get(PagoDeProveedorService);
            httpMock = injector.get(HttpTestingController);
            currentDate = moment();

            elemDefault = new PagoDeProveedor(0, 0, 0, currentDate, 'AAAAAAA', 'AAAAAAA', 'image/png', 'AAAAAAA');
        });

        describe('Service methods', async () => {
            it('should find an element', async () => {
                const returnedFromService = Object.assign(
                    {
                        fecha: currentDate.format(DATE_FORMAT)
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

            it('should create a PagoDeProveedor', async () => {
                const returnedFromService = Object.assign(
                    {
                        id: 0,
                        fecha: currentDate.format(DATE_FORMAT)
                    },
                    elemDefault
                );
                const expected = Object.assign(
                    {
                        fecha: currentDate
                    },
                    returnedFromService
                );
                service
                    .create(new PagoDeProveedor(null))
                    .pipe(take(1))
                    .subscribe(resp => expect(resp).toMatchObject({ body: expected }));
                const req = httpMock.expectOne({ method: 'POST' });
                req.flush(JSON.stringify(returnedFromService));
            });

            it('should update a PagoDeProveedor', async () => {
                const returnedFromService = Object.assign(
                    {
                        monto: 1,
                        montoPagado: 1,
                        fecha: currentDate.format(DATE_FORMAT),
                        codigoDeDocumento: 'BBBBBB',
                        glosa: 'BBBBBB',
                        imagen: 'BBBBBB'
                    },
                    elemDefault
                );

                const expected = Object.assign(
                    {
                        fecha: currentDate
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

            it('should return a list of PagoDeProveedor', async () => {
                const returnedFromService = Object.assign(
                    {
                        monto: 1,
                        montoPagado: 1,
                        fecha: currentDate.format(DATE_FORMAT),
                        codigoDeDocumento: 'BBBBBB',
                        glosa: 'BBBBBB',
                        imagen: 'BBBBBB'
                    },
                    elemDefault
                );
                const expected = Object.assign(
                    {
                        fecha: currentDate
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

            it('should delete a PagoDeProveedor', async () => {
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
