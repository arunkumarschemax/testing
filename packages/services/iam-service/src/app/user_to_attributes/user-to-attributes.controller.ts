import { Controller } from '@nestjs/common';
import { UserToAttributesService } from './user-to-attributes.service';

@Controller('user-to-attributes')
export class UserToAttributesController {
  constructor(private readonly userToAttributesService: UserToAttributesService) {}
}
