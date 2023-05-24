import { Injectable } from '@angular/core';
import Task from './Task'
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class TasksSchedulerService {
  idForTask: number = 1;
  currentCompletedTaskId: number = 1;
  
  tasks: Task[] = []
  completedTasks: Task[] = []

  createTask(title: string) {
    this.tasks.push({id: ++this.idForTask, title: title, done: false});    
  }

  addTaskToCompletedTask(title: string){
    this.completedTasks.push({id: ++this.currentCompletedTaskId, title: title, done: false});
  }

  getCompletedTasksList(){
    return this.completedTasks;
  }

  getTaskList(){
    return this.tasks;
  }

  deleteTask(id: number){
    console.log("id in deleteTask = ", id);
    this.tasks = this.tasks.filter((task) => task.id !== id);
    console.log('tasks after deleteTask completed = ', this.tasks);
  }

  editTaskTitle(id: number, title: string){
    this.tasks.map((task) => {
      if(task.id === id){
        task.title = title;
      }
    });
  }

  completeTask(id: number){
    const task: Task | undefined = this.tasks.find((task) => task.id === id);
    if(task === undefined){
      window.alert('the task does not exist. Something went wrong.');
      return;
    }

    console.log('running completed task service');
    
    this.deleteTask(task.id);

    console.log('deleted task successfully. Here is the new task list: ', this.tasks);
    
    this.addTaskToCompletedTask(task.title);
    console.log('completed task list after moving task = ', this.completedTasks);
    console.log('added task to task service');
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

  generateRandomTask(){
    return this.http.get<{type: string}[]>('https://montanaflynn-lorem-text-generator.p.rapidapi.com/word', {
      headers: {
        'X-RapidAPI-Key': 'SIGN-UP-FOR-KEY',
        'X-RapidAPI-Host': 'montanaflynn-lorem-text-generator.p.rapidapi.com'
      }
    });
  }

  constructor(private http: HttpClient) {
    this.createTask('Task 1')
    this.createTask('Task 2')
    this.createTask('Task 3')
  }
}
