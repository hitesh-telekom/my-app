import { Component, OnInit } from '@angular/core';
import Task from './../Task'
import { Observable } from 'rxjs';

import {TasksSchedulerService} from './../tasks-scheduler.service';

@Component({
  selector: 'app-todolist',
  templateUrl: './todolist.component.html',
  styleUrls: ['./todolist.component.css']
})

export class TodolistComponent implements OnInit {
  tasks : Task[] = this.taskService.getTaskList()
  completedTasks : Task[] = this.taskService.getCompletedTasksList();

  showEdit: boolean = false;
  editTaskId: number | undefined = undefined;
  editTaskTitle: string = "";

  constructor(private taskService: TasksSchedulerService){}
  ngOnInit(): void {
    // this.completedTasks = this.taskService.getCompletedTasksList();
  }

  createTask(title: string){
    this.taskService.createTask(title)
  }

  completeTask(id: number){
    this.taskService.completeTask(id);
    this.tasks = this.taskService.getTaskList()
    
  }
  
  deleteTask(id: number){
    console.log('clicked delete for ', id);
    this.taskService.deleteTask(id)
  }

  moveTaskToUncomplete(id: number){
    this.taskService.moveTaskToUncomplete(id);
  }

  deleteCompletedTask(id: number){
    this.taskService.deleteCompletedTask(id);
  }

  updateTaskTitle(newTitle: string){
    if(this.editTaskId === undefined){
      console.log('something went wrong, id is undefined');
      return;
    }
    
    console.log(this.editTaskId);
    
    // this.tasks[this.editTaskId-1].title = newTitle;
    // you need to update the task with a particular id, not a particular index
    // so this approach would not work in general

    this.taskService.editTaskTitle(this.editTaskId, newTitle);
    this.showEdit = false;
    console.log('successfully updated title');
  }

  showEditTaskForm(id: number | undefined, title: string){
    console.log('edit id function called for id', id);

    if(id === undefined){
      console.log('something went wrong, id is undefined.');
      return;
    }

    this.showEdit = true;
    this.editTaskId = id;
    this.editTaskTitle = title;

    // this.tasks[this.editTaskId].title = newTitle;
  }

}
