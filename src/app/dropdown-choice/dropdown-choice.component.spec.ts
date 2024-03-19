import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DropdownChoiceComponent } from './dropdown-choice.component';

describe('DropdownChoiceComponent', () => {
  let component: DropdownChoiceComponent;
  let fixture: ComponentFixture<DropdownChoiceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DropdownChoiceComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DropdownChoiceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
