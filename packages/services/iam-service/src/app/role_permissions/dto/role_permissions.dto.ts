import { ApiProperty } from '@nestjs/swagger';

export class RolePermissionDto {
  @ApiProperty()
  id: number;

  @ApiProperty()
  permission_id: number;

  @ApiProperty()
  roles_id: number;

}
