import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import { UnitsService } from './units.service';

@Controller('units')
export class UnitsController {
  constructor(private readonly unitsService: UnitsService) {}

  @Post()
  saveUnit(@Body() unitData: any) {
   
  }

  @Get()
  getAllUnits() {
    
  }

  @Get(':id')
  getUnitById(@Param('id') id: string) {
 
  }

  @Put(':id')
  activateOrDeactivateUnit(@Param('id') id: string, @Body() unitData: any) {
   
  }

  @Get('dropdown')
  getAllUnitsDropDown() {
   
  }
}



