import { IsNotEmpty } from 'class-validator' //เหมือน yarn แล้วหาไม่เจอ ทำให้ต้องใช้ npm แทน

// dto ใช้ในการ mapping data
export class CreateTaskDto {
  @IsNotEmpty() // เป็นตัว validation ตัวนึง โดยเราไม่ต้องไป check เอง 
  title: string;

  @IsNotEmpty()
  description: string;
}
