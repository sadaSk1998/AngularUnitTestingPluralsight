import { TestBed, inject } from "@angular/core/testing";
import { HeroService } from "./hero.service";
import { MessageService } from "./message.service";
import { HttpClientTestingModule, HttpTestingController } from "@angular/common/http/testing"
describe('HeroService', () => {
    let mockMessageservice;
    let httpClientTestingModule: HttpTestingController
    let service: HeroService
    beforeEach(() => {
        mockMessageservice = jasmine.createSpyObj(['add'])
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule],
            providers: [
                HeroService,
                {
                    provide: MessageService, useValue: mockMessageservice
                }
            ]
        })
        httpClientTestingModule = TestBed.inject(HttpTestingController);
        service = TestBed.inject(HeroService);
    })
    // 2nd method
    describe('HeroService', () => {
        // first method of service injection 
        it('should call get hero method with Id', inject(
            [
                HeroService, HttpTestingController
            ],
            (
                service: HeroService,
                controller: HttpTestingController
            ) => {
                // should subscribe because this api call is returning observable and if we did not call won't happen
                service.getHero(4).subscribe((data) => {
                    expect(data.name).toBe('sad');
                });


                // service.getHero(5).subscribe();
                // expecting method should call with given URL and if we want to return something that time we should use flush method and will return 
                const req = controller.expectOne('api/heroes/4');
                req.flush({ id: 4, name: 'sad', strength: 100 });
                expect(req.request.method).toBe('GET');
                // this method will not allow any extra requests or calls
                //this will only request what we requested with not any extra requests or calls
                controller.verify();
            }));

        // second method of service injection 
        it('should call get hero method with Id-2', (

        ) => {
            service.getHero(4).subscribe((data) => {
                expect(data.name).toBe('sad');
            });

            const req = httpClientTestingModule.expectOne('api/heroes/4');
            req.flush({ id: 4, name: 'sad', strength: 100 });
            expect(req.request.method).toBe('GET');
            httpClientTestingModule.verify();
        });



    });


});