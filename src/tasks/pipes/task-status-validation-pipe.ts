import { PipeTransform, BadRequestException } from "@nestjs/common";
import { TaskStatus } from "../task-status.enum";

// สร้าง pipe checkStatus ขึ้นมา
export class TaskStatusValidationPipe implements PipeTransform {
  readonly allowedStatuses = [
    TaskStatus.OPEN,
    TaskStatus.IN_PROGRESS,
    TaskStatus.DONE
  ]

  transform(value: any) {
    value = value.toUpperCase()

    if (!this.isStatusValid(value)) {
      throw new BadRequestException(`${value} is an invalid status`) // ดัก error Bad Request ข้อมูลที่ส่งมาไม่ถูกต้อง
    }

    return value
  }

  private isStatusValid(status: any) {
    const idx = this.allowedStatuses.indexOf(status)
    return idx !== -1
  }
}