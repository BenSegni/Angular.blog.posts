import {
  ComponentFixture,
  TestBed,
} from '@angular/core/testing';

import { AppComponent } from './app.component';

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [AppComponent],
    });

    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  describe('Testing initial render', () => {
    it('should render the correct title', () => {
      expect(fixture.nativeElement.querySelector('h1').textContent).toContain(
        'Angular blog'
      );
    });
  });
});
