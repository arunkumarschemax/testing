import { returnException } from '@finestchoicex-iam/backend-utils';
import { CommonResponse, GetAllUserResponse, GetAllUsersDropDown, UnitIdDto, UsersIdDto } from '@finestchoicex-iam/shared-models';
import { Body, Controller, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { OrganizationIdReqDto } from '../organization/dtos/activate.dto';
import { UsersDto } from './dtos/user.dto';
import { UsersService } from './users.service';

@Controller('Users')
@ApiTags('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) { }

  @Post('createUser')
  async userCreation(@Body() createRequest: UsersDto): Promise<CommonResponse> {
    try {
      return await this.usersService.userCreation(createRequest);
    } catch (error) {
      return returnException(CommonResponse, error);
    }
  }
  @Post('getAllUsers')
  async getAllUsers(): Promise<GetAllUserResponse> {
    try {
      return await this.usersService.getAllUsers()
    } catch (error) {
      return returnException(GetAllUserResponse, error);
    }
  }
  @Post('getAllUsersDropdown')
  async getAllUsersDropdown(): Promise<GetAllUsersDropDown> {
    try {
      return await this.usersService.getAllUsersDropdown();
    } catch (error) {
      return returnException(GetAllUsersDropDown, error)
    }
  }
  @Post('activateDeactivateUsers')
  async activateDeactivateUsers(@Body() userDto: UsersIdDto): Promise<CommonResponse> {
    try {
      return await this.usersService.activateDeactivateUsers(userDto);
    } catch (error) {
      return returnException(CommonResponse, error)
    }
  }

  @Post('getUsersByUnitId')
  async getUsersByUnitId(@Body() req: UnitIdDto): Promise<GetAllUserResponse> {
    try {
      return await this.usersService.getUsersByUnitId(req);
    } catch (error) {
      return returnException(GetAllUserResponse, error)
    }
  }

  @Post('getUsersByOrgId')
  async getUsersByOrgId(@Body() req: OrganizationIdReqDto): Promise<CommonResponse> {
    try {
      return await this.usersService.getUsersByOrgId(req);
    } catch (error) {
      return returnException(CommonResponse, error)
    }
  }
}
