export class DropdownUsersDto {
    firstName: string;
    middleName: string;
    lastName: string;
    usersId: number;
    constructor(
        firstName: string,
        middleName: string,
        lastName: string,
        usersId: number,
    ) {
        this.firstName = firstName;
        this.middleName = middleName;
        this.lastName = lastName;
        this.usersId = usersId;
    }

}