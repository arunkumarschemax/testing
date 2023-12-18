import { ApiProperty } from '@nestjs/swagger';
import { IconType } from '@finestchoicex-iam/shared-models';

export class MenuDto {

  @ApiProperty()
  name: string;

  @ApiProperty()
  order: number;

  @ApiProperty()
  iconType: IconType;

  @ApiProperty()
  iconName: string;

  @ApiProperty()
  menuId: string;


}
