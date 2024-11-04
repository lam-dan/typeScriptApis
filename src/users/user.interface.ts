// export interface User {
//     username: string,
//     email: string,
//     password: string,
//     state: string,
// }

// // Omit password from interface to make it more simple
// type userPreview = Omit<User, "password">;

// export interface UnitUser extends User {
//     id: string;
// }

// export interface Users {
//     [key: string]: UnitUser
// }

// export interface Cities{
//     [key:string]: City[];
// }

// export type City = string;


export interface User {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    state: string;
}

export interface UnitUser extends User {
    id: string;
}

export interface Users {
    [id:string]:UnitUser;
}

export type City = string;

export interface Cities {
    [id:string]: City[];
}

export type UserPreview = Omit<User,'password'>;