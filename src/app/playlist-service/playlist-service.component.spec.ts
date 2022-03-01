import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlaylistServiceComponent } from './playlist-service.component';

describe('PlaylistServiceComponent', () => {
  let component: PlaylistServiceComponent;
  let fixture: ComponentFixture<PlaylistServiceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PlaylistServiceComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PlaylistServiceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
