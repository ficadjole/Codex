export interface UserDto{
    userId          : number;
    firstName       : string;
    lastName        : string;
    email           : string;
    username        : string;
    userRole        : string;
}

export const emptyUser : UserDto = {
    userId: 0,
    firstName   : "",
    lastName    : "",
    username    : "",
    email       : "",
    userRole    : "",
};