/* eslint-disable prettier/prettier */
import { Injectable, NotFoundException } from '@nestjs/common';
import { Task, TaskStatus } from './task.model';
import { v4 as uuidV4 } from 'uuid'
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';

@Injectable()
export class TasksService {
    private tasks: Task[] = []
    getAllTasks(): Task[] {
        return this.tasks
    }
    getTasksWithFilters(filterDto: GetTasksFilterDto): Task[] {
        const { status, search } = filterDto
        let task = this.getAllTasks()
        if (status) {
            task = this.tasks.filter((task) => task.status === status)
        }
        if (search) {
            task = this.tasks.filter((task) => {
                if (task.title.includes(search) || task.description.includes(search)) {
                    return true
                }
                return false
            })
        }
        return task
    }
    getTask(id: string): Task {

        const found = this.tasks.find((task) => task.id === id)
        if(!found) {
            throw new NotFoundException(`Task with ID "${id}" not found`)
        }
        return found
    }
    createTask(createTaskDto: CreateTaskDto): Task {
        const { title, description } = createTaskDto
        const task: Task = {
            id: uuidV4(),
            title,
            description,
            status: TaskStatus.OPEN,
        }

        this.tasks.push(task)
        return task
    }
    updateTask(id: string, status: TaskStatus): Task {
        console.log(status)
        const task = this.getTask(id)
        task.status = status
        return task
    }
    deleteTask(id: string): Task[] {
        this.tasks = this.tasks.filter((task) => task.id !== id)
        return this.tasks
    }
}
