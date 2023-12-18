import { Controller } from '@nestjs/common';
import { RolePermissionsService } from './role_permissions.service';

@Controller('role-permissions')
export class RolePermissionsController {
  constructor(private readonly rolePermissionsService: RolePermissionsService) {}
}
