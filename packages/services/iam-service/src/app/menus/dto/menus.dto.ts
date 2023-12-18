import { ApiProperty } from '@nestjs/swagger';

export class MenuDto {
  @ApiProperty()
  id: number;

  @ApiProperty()
  name: string;

  @ApiProperty()
  order: number;

  @ApiProperty()
  icon_type: 'sysLib' | 'svg';

  @ApiProperty()
  icon_name: string;

  
  @ApiProperty()
 module_id: number;
 
}
