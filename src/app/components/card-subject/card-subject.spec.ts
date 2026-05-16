import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardSubject } from './card-subject';

describe('CardSubject', () => {
  let component: CardSubject;
  let fixture: ComponentFixture<CardSubject>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CardSubject],
    }).compileComponents();

    fixture = TestBed.createComponent(CardSubject);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
