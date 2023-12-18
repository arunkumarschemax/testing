import { ApiProperty } from '@nestjs/swagger';

export class SubMenuDto {
  @ApiProperty()
  id: number;

  @ApiProperty()
  name: string;

  @ApiProperty()
  order: number;

  
  icon_type: 'sysLib' | 'svg';

  @ApiProperty()
  icon_name: string;

  @ApiProperty()
  path: string;

  @ApiProperty()
  component: string;

  @ApiProperty()
  parent_id: number;

  @ApiProperty()
  menu_id: number;
  isActive: boolean;
}

