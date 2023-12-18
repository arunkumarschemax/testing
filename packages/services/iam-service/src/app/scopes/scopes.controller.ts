import { Body, Controller, Delete, Get, Param, Post, Put, Scope } from '@nestjs/common';
import { ScopeService } from './scopes.service';

@Controller('scopes')
export class ScopeController {
  constructor(private readonly scopesService: ScopeService) {}


  @Post()
  saveScope(@Body() scopeData: Scope) {}

  @Get()
  getAllScopes() {}

  @Get(':id')
  getScopeById(@Param('id') id: string) {}

  @Put(':id')
  updateScope(@Param('id') id: string, @Body() scopeData: Scope) {}

  @Delete(':id')
  deleteScope(@Param('id') id: string) {}

}
