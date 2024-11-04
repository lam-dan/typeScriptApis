import { User, UnitUser, Users, City} from './user.interface';

import bcrypt from "bcryptjs";
import {v4 as random} from "uuid";
import fs from "fs";

const loadUsers = (): Users => {
    try {
        const users = fs.readFileSync('./users.json','utf-8');
        return JSON.parse(users) as Users;
    } catch(error){
        console.log(error);
        return {};
    }
}

let users: Users = loadUsers();

export const saveUsers = (): void => {
    try {
        fs.writeFileSync('./users.json',JSON.stringify(users),'utf-8')
        console.log("Users saved");
    } catch(error){
        console.log(error);
    }
}

export const findAll = async (): Promise <UnitUser[]> => {
    return Object.values(users);
}

export const findOne = async (id:string): Promise<UnitUser> => {
    return users[id];
}

export const loadCities = () => {
    try {   
        const cities = fs.readFileSync('./cities.json','utf-8')

        return JSON.parse(cities);
    } catch(error) {
        console.log(error);
        return {};
    }
};

const cities = loadCities();

export const findAllCities = async(state:string): Promise<City[]> => {
    return cities[state];
}

export const updateUser = async (id:string, updateValues: User): Promise<UnitUser | null> => {
    const userExists = await findOne(id);
    if(!userExists){
        return null;
    }
    if(updateValues.password){
        const salt = await bcrypt.genSalt(10);
        const newPass = await bcrypt.hash(updateValues.password, salt);
        updateValues.password = newPass;
    }
    users[id] = {
        ...userExists,
        ...updateValues
    }
    saveUsers();
    return users[id];
}

export const remove = async(id:string) => {
    const foundUser = findOne(id);
    if(!foundUser){
        return null;
    }
    delete users[id];
    saveUsers();
}

export const createUser = async(user: UnitUser) => {
    const foundUser = findOne(user.email);

    if(!foundUser){
        let id = random();
        users[id] = user;
    }

    saveUsers();
}



// // export const findOne
// // export const create
// // export const findByEmail
// // export const comparePassword 
// // export const update
// // export const remove 



