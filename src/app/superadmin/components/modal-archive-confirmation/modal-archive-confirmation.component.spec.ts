import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalArquiveConfirmationComponent } from './modal-archive-confirmation.component';

describe('ModalArquiveConfirmationComponent', () => {
  let component: ModalArquiveConfirmationComponent;
  let fixture: ComponentFixture<ModalArquiveConfirmationComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ModalArquiveConfirmationComponent]
    });
    fixture = TestBed.createComponent(ModalArquiveConfirmationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
