import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CountryTableComponent } from './country-table.component';

describe('CountryTableComponent', () => {
  let component: CountryTableComponent;
  let fixture: ComponentFixture<CountryTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CountryTableComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CountryTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
