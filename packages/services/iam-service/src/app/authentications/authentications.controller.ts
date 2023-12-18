import { Body, Controller, Post } from '@nestjs/common';
import { AuthenticationsService } from './authentications.service';
import { AuthenticationsDto } from './dtos/authentications.dto';
import { CommonResponse, returnException } from '@finestchoicex-iam/backend-utils';

@Controller('authentications')
export class AuthenticationsController {
  constructor(private readonly authenticationsService: AuthenticationsService) {}
  @Post('createAuth')
  async createAuthentication(@Body() authDto:AuthenticationsDto):Promise<CommonResponse>{
    try {
      // return await this.authenticationsService.createAuthentication(authDto)
    } catch (error) {
      return returnException(CommonResponse,error)
    }
  }
}
