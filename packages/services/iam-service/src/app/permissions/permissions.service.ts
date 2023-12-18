import { Injectable } from '@nestjs/common';
import { PermissionDto } from './dto/permissions.dto';

@Injectable()
export class PermissionService {
  savePermissions(permissionDto: PermissionDto) {
    throw new Error('Method not implemented.');
  }
}
