import { Component } from '@angular/core';

interface Task {
  id: number,
  title: string,
  done: boolean
}

@Component({
  selector: 'app-todolist',
  templateUrl: './todolist.component.html',
  styleUrls: ['./todolist.component.css']
})

export class TodolistComponent {
  idForTask: number = 4;
  idForUncompletedTask: number = 1;
  tasks: Task[] = [{id: 1, title: 'Task 1', done: false}, {id: 2, title: 'Task 2', done: false}, {id: 3, title: 'Task 3', done: false}]
  completedTasks: Task[] = [];

  showEdit: boolean = false;
  editTaskId: number | undefined = undefined;
  editTaskTitle: string = "";

  createTask(title: string) {
    this.tasks.push({id: ++this.idForTask, title: title, done: false});
  }

  deleteTask(id: number){
    console.log('clicked delete for ', id);
    this.tasks = this.tasks.filter((task) => task.id !== id);
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

    this.tasks.map((task) => {
      if(task.id === this.editTaskId){
        task.title = newTitle;
      }
    })

    this.showEdit = false;
    console.log('successfully updated title');
  }

  editTask(id: number | undefined, title: string){
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

  completeTask(id: number){
    const task: Task | undefined = this.tasks.find((task) => task.id === id);
    if(task === undefined){
      window.alert('the task does not exist. Something went wrong.');
      return;
    }

    this.deleteTask(task.id);
    this.createCompletedTask(task.title)
  }

  createCompletedTask(title: string){
    this.completedTasks.push({id: ++this.idForUncompletedTask, title: title, done: true});
  }

  moveTaskToUncomplete(id: number){
    const task: Task | undefined = this.completedTasks.find((task) => task.id === id);
    if(task === undefined){
      window.alert('the task does not exist. Something went wrong.');
      return;
    }

    this.deleteCompletedTask(task.id);
    this.createTask(task.title)
  }

  deleteCompletedTask(id: number){
    this.completedTasks = this.completedTasks.filter((task) => task.id !== id);
  }


}
