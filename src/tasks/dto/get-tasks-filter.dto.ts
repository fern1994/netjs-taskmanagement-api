import { IsOptional, IsIn, IsNotEmpty } from "class-validator";
import { TaskStatus } from "../task-status.enum";

export class GetTasksFilterDto {

  @IsOptional() // อนุญาตให้ไม่ต้องส่งมาก็ได้ 
  @IsIn([TaskStatus.OPEN, TaskStatus.IN_PROGRESS, TaskStatus.DONE]) // แต่ถ้ามีค่าให้ตรงกับค่าใน array นี้
  status: TaskStatus;

  @IsOptional() // อนุญาตให้ไม่ต้องส่งมาก็ได้
  @IsNotEmpty() // ถ้าส่งค่ามาต้องไม่เป็นค่าว่าง
  search: string
}