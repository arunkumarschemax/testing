import { returnException } from '@finestchoicex-iam/backend-utils';
import { CommonResponse, GetAllScopesDropDownResponse, GetAllScopesResponse } from '@finestchoicex-iam/shared-models';
import { Body, Controller, Post } from '@nestjs/common';
import { ScopeDto } from './dto/scopes.dto';
import { ScopeService } from './scopes-service';
import { ScopesIdDto } from './dto/scope-id.dto';
import { ApiTags } from '@nestjs/swagger';
@ApiTags('Scopes')
@Controller('scopes')
export class ScopeController {
  constructor(private readonly scopeService: ScopeService) { }

  @Post('createScope')
  async createScope(@Body() scopeDto: ScopeDto): Promise<CommonResponse> {
    console.log(scopeDto,'......')
    try {
      return await this.scopeService.createScope(scopeDto);

    } catch (error) {
      throw returnException(CommonResponse, error);
    }
  }

  @Post('getAllScopes')
  async getAllScopes(): Promise<GetAllScopesResponse> {
    try {
      return await this.scopeService.getAllScopes();
    } catch (error) {
      return returnException(GetAllScopesResponse, error);
    }
  }

  @Post('getAllScopesDropDown')
  async getAllScopesDropDown(): Promise<GetAllScopesDropDownResponse> {
    try {
      return await this.scopeService.getAllScopesDropDown();
    } catch (error) {
      return returnException(GetAllScopesDropDownResponse, error);
    }
  }

  @Post('activateAndDeactivatedScope')
  async activateAndDeactivatedScope(@Body() activateDto: ScopesIdDto): Promise<CommonResponse> {
    try {
      return await this.scopeService.activateAndDeactivatedScope(activateDto);
    } catch (error) {
      return returnException(CommonResponse, error);
    }
  }


}
