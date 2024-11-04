import express, {Request, Response} from 'express';
import { UnitUser, User, City } from './user.interface';
import * as database from './user.database';

export const userRouter = express.Router();

//anonymous function
userRouter.get('/users', async (req: Request, res: Response) => {
    console.log('Starting users api')
    try {
        const users = await database.findAll();
        if(!users){
            console.log("No Users")
            return res.status(404).json('No Users')
        }
        return res.status(200).json(users);
    } catch (error){
        console.log(error);
        return res.status(500);
    }
})

userRouter.get('/user/:id', async (req: Request, res: Response) => {
    try {
        const user = await database.findOne(req.params.id);
        if(!user){
            console.log("No user")
            return res.status(404).json('No Users')
        }
        return res.status(200).json(user);
    } catch(error){
        console.log(error)
        return res.status(500);
    }
})

userRouter.get('/users-cities', async (request: Request, response: Response) => {
    try{
        let cityPromises : Promise<City[]>[] = [];
        const users = await database.findAll();
        for(let i = 0; i<users.length;i++){
            const cities = database.findAllCities(users[i].state);
            cityPromises.push(cities);
        }
        const result = await Promise.allSettled(cityPromises);
        return response.status(200).json(result);
    } catch(error){
        console.log(error);
        return response.status(500);
    }
})


userRouter.get('', async ()=> {



})
//Unions and intersections
//make sure you are using type narrowing 

// What is TypeScript and how does it differ from JavaScript?
// Typescript is a superset of Javascript which includes classes and interfaces. It allows javascript code to be strongly typed

//What are the benefits of Typescript?
// 

//What are the interfaces in TypeScript?
// /

