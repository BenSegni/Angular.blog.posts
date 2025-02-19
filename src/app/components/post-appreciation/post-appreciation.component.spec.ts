import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PostAppreciationComponent } from './post-appreciation.component';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';

describe('PostAppreciationComponent', () => {
  let component: PostAppreciationComponent;
  let fixture: ComponentFixture<PostAppreciationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PostAppreciationComponent],
      providers: [provideHttpClient(), provideHttpClientTesting()],
    })
    .compileComponents();

    fixture = TestBed.createComponent(PostAppreciationComponent);
    component = fixture.componentInstance;

    fixture.componentRef.setInput('appreciation', {
      modelValue: 0,
      transform: (value: number) => value
    });

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
