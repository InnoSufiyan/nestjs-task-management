/* eslint-disable prettier/prettier */
import { Get, Injectable } from '@nestjs/common';
import { Task, TaskStatus } from './task.model';
import {v4 as uuidV4} from 'uuid'

@Injectable()
export class TasksService {
    private tasks : Task[] = []
    getAllTasks(): Task[] {
        return this.tasks
    }
    getTask(id: string): Task {
        return this.tasks.find((task) => task.id === id)
    }
    createTask(title: string, description: string): Task {
        const task : Task = {
            id: uuidV4(),
            title,
            description,
            status: TaskStatus.OPEN,
        }

        this.tasks.push(task)
        return task
    }
}
