/* eslint-disable prettier/prettier */
import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { Task } from './task.model';

@Controller('tasks')
export class TasksController {
    constructor(private tasksService: TasksService) { }
    @Get()
    getAllTasks(): Task[] {
        return this.tasksService.getAllTasks();
    }
    @Get(':id')
    getTask(@Param('id') id: string): Task {
        return this.tasksService.getTask(id);
    }
    @Post()
    createTask(@Body('title') title: string, @Body('description') description: string ): Task {
        return this.tasksService.createTask(title, description);
    }
}
