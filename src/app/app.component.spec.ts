import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router, RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { BlogPostsComponent } from './components/blog-posts/blog-posts.component';
import { Location } from '@angular/common';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;
  let router: Router;
  let location: Location;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        AppComponent,
        BlogPostsComponent,
        RouterModule.forRoot([{ path: '', component: BlogPostsComponent }]),
      ],
      providers: [provideHttpClient(), provideHttpClientTesting()],
    });
    router = TestBed.inject(Router);
    location = TestBed.inject(Location);
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

    it('should render the Blog Posts Component as landing component', async () => {
      await router.navigate(['']);

      fixture.detectChanges();

      expect(fixture.nativeElement.querySelector('app-blog-posts')).toBeTruthy();
    });
  });
});
