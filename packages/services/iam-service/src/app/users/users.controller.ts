import { Body, Controller, Param, Post } from '@nestjs/common';
import { UsersService } from './users.service';
import { ApiTags } from '@nestjs/swagger';
import { UsersDto } from './dtos/user.dto';
import { CommonResponse, returnException } from '@finestchoicex-iam/backend-utils';

@Controller('users')
@ApiTags('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) { }

  @Post('userCretaion')
  async userCreation(@Body() createRequest: UsersDto): Promise<CommonResponse> {
  try {
    console.log(createRequest)
    return this.usersService.userCreation(createRequest);
  } catch (error) {
    return returnException(CommonResponse,error);
  }
  }
  

}
