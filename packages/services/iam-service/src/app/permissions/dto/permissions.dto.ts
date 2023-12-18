import { ApiProperty } from '@nestjs/swagger';

export class PermissionDto {
  @ApiProperty()
  id: number;

  @ApiProperty()
  name: string;

  
  @ApiProperty()
 sub_menu_id: number;

  
  @ApiProperty()
 scope_id: number;
 
}
