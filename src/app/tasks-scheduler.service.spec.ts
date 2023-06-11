import { TestBed } from '@angular/core/testing';

import { TasksSchedulerService } from './tasks-scheduler.service';

describe('TasksSchedulerService', () => {
  let service: TasksSchedulerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TasksSchedulerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
