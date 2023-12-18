import { Body, Controller, Post, Req, Res, UseGuards } from '@nestjs/common';
import { AuthenticationsService } from './authentications.service';
import { AuthenticationsDto } from './dtos/authentications.dto';
import { returnException } from '@finestchoicex-iam/backend-utils';
import { CommonResponse, UsersResponse } from '@finestchoicex-iam/shared-models';
import { ApiTags } from '@nestjs/swagger';
import { Public } from './decorators/public';
import { LocalAuthGuard } from './guards/local-auth.guard';
import type { Response } from 'express';
import { LoginUserDto } from './dtos/user-login.dto';
import { Throttle } from '@nestjs/throttler';

@ApiTags('Auth')
@Controller('authentications')
export class AuthenticationsController {

  constructor(
    private readonly authenticationsService: AuthenticationsService
  ) {

  }



  // @Post('createAuth')
  // async createAuthentication(@Body() authDto: AuthenticationsDto): Promise<CommonResponse> {
  //   try {
  //     return await this.authenticationsService.createAuthentication(authDto)
  //   } catch (error) {
  //     return returnException(CommonResponse, error)
  //   }
  // }

  @Throttle(3, 60)
  @Public()
  @Post('getSalt')
  async getSalt(@Body() updateDto: LoginUserDto): Promise<CommonResponse> {
    try {
      return await this.authenticationsService.getSalt(updateDto.username);
    } catch (error) {
      return returnException(CommonResponse, error)
    }
  }

  @Throttle(3, 60)
  @Public()
  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Req() req: Request, @Res() response: Response): Promise<CommonResponse> {
    try {
      return await this.authenticationsService.login(req, response);
    } catch (error) {
      return returnException(CommonResponse, error)
    }
  }


  @Post('getAllUsers')
  async getAllUsers(): Promise<UsersResponse> {
    try {
      return await this.authenticationsService.getAllUsers();
    } catch (error) {
      return returnException(UsersResponse, error);
    }
  }

  @Post('usersUpdate')
  async usersUpdate(@Body() updateDto: AuthenticationsDto): Promise<CommonResponse> {
    try {
      return await this.authenticationsService.usersUpdate(updateDto)
    } catch (error) {
      return returnException(CommonResponse, error)
    }
  }


}
