import { ApiProperty } from '@nestjs/swagger';

export class UnitDto {
  @ApiProperty()
  id: number;

  @ApiProperty()
  name: string;

  
  @ApiProperty()
 description: string;

  
  @ApiProperty()
 organisation_id: number;
 
}
