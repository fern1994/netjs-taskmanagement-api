import { Controller, Get, Post, Body, Param, Delete, Patch, Query, UsePipes, ValidationPipe } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { Task, TaskStatus } from './task.model';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';
import { TaskStatusValidationPipe } from './pipes/task-status-validation-pipe';

// nest g module tasks --no-spec => สร้าง module tasks ใน directory tasks
// nest g controller tasks --no-spec => สร้าง controller tasks ใน directory tasks
@Controller('tasks')
export class TasksController {
  // arg tasksService type TasksService
  constructor(private tasksService: TasksService) { }

  @Get() // method api
  getTasks(@Query(ValidationPipe) filterData: GetTasksFilterDto): Task[] { // @Query เป็น query param url และให้ใช้ validation ใน DTO
    if (Object.keys(filterData).length) {
      return this.tasksService.getTaskWithFilters(filterData)
    } else {
      return this.tasksService.getAllTasks()
    }
  }

  @Get('/:id') // get url param id
  getTaskById(@Param('id') id: string): Task {
    return this.tasksService.getTaskById(id)
  }

  // @Body คือตัวที่เราส่ง body ผ่าน api @Body(title) เป็นการเรียก body title แบบเจาะจง title คือตัวแปร
  @Post() // method api
  @UsePipes(ValidationPipe) // เป็นตัวเชื่อมต่อกับตัว validation ที่เราใส่ใน DTO
  createTask(@Body() createTaskDto: CreateTaskDto): Task {
    return this.tasksService.createTask(createTaskDto)
  }

  @Delete('/:id')
  deleteTask(@Param('id') id: string) {
    this.tasksService.deleteTask(id)
    return { success: true, message: `Deleted task id ${id} successful!` }
  }

  @Patch('/:id') // ให้ใช้ body json เพราะ form-data ไม่มา
  updateTaskStatus(
    @Param('id') id: string,
    // เอา Pipe ที่ check status มาใส่เพื่อ check body status ที่ส่งเข้ามา
    @Body('status', TaskStatusValidationPipe) status: TaskStatus
  ): Task {
    return this.tasksService.updateTaskStatus(id, status)
  }
}
