import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PostAppreciationComponent } from './post-appreciation.component';
import { of } from 'rxjs';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';

describe('PostAppreciationComponent', () => {
  let component: PostAppreciationComponent;
  let fixture: ComponentFixture<PostAppreciationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PostAppreciationComponent],
      providers: [provideHttpClient(), provideHttpClientTesting()],
    }).compileComponents();

    fixture = TestBed.createComponent(PostAppreciationComponent);
    component = fixture.componentInstance;

    component.appreciation.set(11);
    fixture.componentRef.setInput('postId', '1');

    fixture.detectChanges();
  });

  describe('Testing Button interactions', () => {
    it('should increment the likeCount value when appreciate is called', () => {
      const spyService = spyOn<any>(component['_postAppreciationService'], 'appreciatePost').and.returnValue(
        of({
          content: '',
          id: '1',
          likeCount: 12,
          title: '',
        })
      );

      component.appreciate();

      expect(component.appreciation()).toBe(12);
      expect(component.voteButtonSelected()).toBe('appreciate');
      expect(spyService).toHaveBeenCalledWith('1', 12);
    });
    it('should increment the likeCount value when appreciate is called', () => {
      const spyService = spyOn<any>(component['_postAppreciationService'], 'appreciatePost').and.returnValue(
        of({
          content: '',
          id: '1',
          likeCount: 10,
          title: '',
        })
      );

      component.unappreciate();

      expect(component.appreciation()).toBe(10);
      expect(component.voteButtonSelected()).toBe('unappreciate');
      expect(spyService).toHaveBeenCalledWith('1', 10);
    });
  });
});
