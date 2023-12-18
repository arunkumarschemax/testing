import { ApiProperty } from "@nestjs/swagger";
import { AbstractDto } from "../../../common";

export class ApplicationsDto extends AbstractDto {
  @ApiProperty()
  applicationName: string
  @ApiProperty()
  description: string;
  @ApiProperty()
  applicationId: number;

}
