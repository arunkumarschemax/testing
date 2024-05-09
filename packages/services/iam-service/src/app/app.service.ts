import { ErrorResponse } from '@finestchoicex-iam/backend-utils';
import { Injectable } from '@nestjs/common';
import { Logger } from '@nestjs/common';
import { SnakeNamingStrategy } from '../database/strategies';
import * as fs from 'fs';
import * as path from 'path';



const fullPath = __dirname;
const newPath = fullPath.replace(/\\dist/, '');
@Injectable()

export class AppService {
  constructor() {
  }

  getData(): any {
    try { 
      const k = fs.readFileSync(path.join(newPath, '\\src\\app\\app.controller.ts'),'utf-8');
      // const k = fs.readFileSync(path.join(newPath, '\\files\\DSC_0211.JPG'));
      return k;
    } catch (error) {
      console.error('Error reading file:', error);
      // Handle the error appropriately, for example:
      throw new ErrorResponse(6546, 'File not found');
    }
  }

}
// C:\New folder (2)\library\packages\services\iam-service\files\DSC_0211.JPG
