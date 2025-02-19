import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PostAppreciationComponent } from './post-appreciation.component';

describe('PostAppreciationComponent', () => {
  let component: PostAppreciationComponent;
  let fixture: ComponentFixture<PostAppreciationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PostAppreciationComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PostAppreciationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
