import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalInactivateReasonComponent } from './modal-inactivate-reason.component';

describe('ModalInactivateReasonComponent', () => {
  let component: ModalInactivateReasonComponent;
  let fixture: ComponentFixture<ModalInactivateReasonComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ModalInactivateReasonComponent]
    });
    fixture = TestBed.createComponent(ModalInactivateReasonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
