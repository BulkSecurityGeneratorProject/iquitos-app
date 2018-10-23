/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { IquitosAppTestModule } from '../../../test.module';
import { BoxDetailComponent } from 'app/entities/box/box-detail.component';
import { Box } from 'app/shared/model/box.model';

describe('Component Tests', () => {
    describe('Box Management Detail Component', () => {
        let comp: BoxDetailComponent;
        let fixture: ComponentFixture<BoxDetailComponent>;
        const route = ({ data: of({ box: new Box(123) }) } as any) as ActivatedRoute;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [IquitosAppTestModule],
                declarations: [BoxDetailComponent],
                providers: [{ provide: ActivatedRoute, useValue: route }]
            })
                .overrideTemplate(BoxDetailComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(BoxDetailComponent);
            comp = fixture.componentInstance;
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(comp.box).toEqual(jasmine.objectContaining({ id: 123 }));
            });
        });
    });
});
