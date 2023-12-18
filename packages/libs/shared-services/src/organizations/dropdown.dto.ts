export class DropdownOrganizationDto{
    name:string;
    organizationId:string;
    constructor(
        name:string,
        organizationId:string,
    ){
        this.name=name;
        this.organizationId=organizationId;
    }
  
}