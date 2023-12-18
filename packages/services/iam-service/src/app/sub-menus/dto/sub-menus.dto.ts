import { IconType } from '@finestchoicex-iam/shared-models';
import { ApiProperty } from '@nestjs/swagger';

export class SubMenuDto {
  @ApiProperty()
  id: number;

  @ApiProperty()
  name: string;

  @ApiProperty()
  order: number;

  
  iconType: IconType;

  @ApiProperty()
  iconName: string;

  @ApiProperty()
  path: string;

  @ApiProperty()
  component: string;

  @ApiProperty()
  parentId: number;

  @ApiProperty()
  menu_id: number;
  isActive: boolean;
}

