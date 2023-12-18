export class AllUsersResponseDto {
    constructor(
        public usersId: number,
        public firstName: string,
        public mobileNo :number,
        public gender : string,
        public applicationId: number,
        public clientId: number,
        public clientName: string,
    ) {}
}
