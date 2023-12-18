import { ApiProperty } from "@nestjs/swagger";
import { AbstractDto } from "../../../common";

export class ApplicationsDto extends AbstractDto {
  @ApiProperty()
  name: String
  @ApiProperty()
  description: string;
}