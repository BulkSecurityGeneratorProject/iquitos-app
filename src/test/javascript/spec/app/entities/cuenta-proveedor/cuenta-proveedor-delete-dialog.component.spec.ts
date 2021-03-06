/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { IquitosAppTestModule } from '../../../test.module';
import { CuentaProveedorDeleteDialogComponent } from 'app/entities/cuenta-proveedor/cuenta-proveedor-delete-dialog.component';
import { CuentaProveedorService } from 'app/entities/cuenta-proveedor/cuenta-proveedor.service';

describe('Component Tests', () => {
    describe('CuentaProveedor Management Delete Component', () => {
        let comp: CuentaProveedorDeleteDialogComponent;
        let fixture: ComponentFixture<CuentaProveedorDeleteDialogComponent>;
        let service: CuentaProveedorService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [IquitosAppTestModule],
                declarations: [CuentaProveedorDeleteDialogComponent]
            })
                .overrideTemplate(CuentaProveedorDeleteDialogComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(CuentaProveedorDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(CuentaProveedorService);
            mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
            mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
        });

        describe('confirmDelete', () => {
            it('Should call delete service on confirmDelete', inject(
                [],
                fakeAsync(() => {
                    // GIVEN
                    spyOn(service, 'delete').and.returnValue(of({}));

                    // WHEN
                    comp.confirmDelete(123);
                    tick();

                    // THEN
                    expect(service.delete).toHaveBeenCalledWith(123);
                    expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    expect(mockEventManager.broadcastSpy).toHaveBeenCalled();
                })
            ));
        });
    });
});
