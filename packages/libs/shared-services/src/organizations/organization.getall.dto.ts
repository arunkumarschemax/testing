export class GetAllOrganizations{
    name:string;
    description:string;
    organizationId:string;
    versionFlag:number;
    isActive:boolean;
    constructor(
        name:string,
    description:string,
    organizationId:string,
    versionFlag:number,
    isActive:boolean,
    ){
        this.name=name;
        this.description=description;
        this.isActive=isActive;
        this.organizationId=organizationId;
        this.versionFlag=versionFlag;
    }
}