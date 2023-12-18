import { CommonRequestAttrs } from "@finestchoicex-iam/shared-models";
import { ApiProperty } from "@nestjs/swagger";

export class ModuleDto extends CommonRequestAttrs {
  @ApiProperty()
  moduleName: string
  @ApiProperty()
  moduleId: number
  @ApiProperty()
  moduleDescription: string
  @ApiProperty()
  applicationId: number
  @ApiProperty()
  application: string
  @ApiProperty()
  isActive: boolean
  @ApiProperty()
  versionFlag: number;
}