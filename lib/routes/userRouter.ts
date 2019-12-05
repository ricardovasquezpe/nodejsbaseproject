import {Request, Response, NextFunction} from "express";
import { UserController } from "../controllers/userController";
import { check } from "express-validator";
import { CustomValidators } from "../util/customValidators";
import { verify } from 'jsonwebtoken';

export class UserRoutes { 
    
    public userController: UserController = new UserController() 
    public customValidators: CustomValidators = new CustomValidators();
    
    public routes(app): void {

        app.route('/')
        .get((req: Request, res: Response) => {            
            res.status(200).send({
                message: 'API Working Correctly now'
            })
        });
        
        app.route('/login').post([
            check('username').isLength({ min: 1 }).withMessage('Username field is required'),
            check('password').isLength({ min: 1 }).withMessage('Password field is required')
          ], this.userController.login);

        app.route('/register').post([
            check('name').isLength({ min: 1, max : 20 }).withMessage('Name field is not correct'),
            check('lastname').isLength({ min: 1, max : 20 }).withMessage('Lastname field is not correct'),
            check('username').isLength({ min: 1, max : 20 }).withMessage('Username field is not correct'),
            check('password').isLength({ min: 6, max : 20 }).withMessage('Password field is not correct'),
            check('birthdate').isLength({ min: 1 }).custom(this.customValidators.isValidDate).withMessage('Birthdate field is not correct'),
            check('email').isLength({ min: 1 }).isEmail().withMessage('Email field is not correct')
        ], this.userController.register);

        var middleware = function (req, res, next) {
            var token = req.headers['x-access-token'];
            if (token) {
                verify(token, app.get('superSecret'), function(err, decoded) {      
                    if (err) {
                        res.json(
                            {"status" : false,
                            "data"   : 'Failed to authenticate token' }
                            );
                        return;    
                    }else{
                        req.decoded = decoded;    
                        next();
                    }
                });
            }else{
                res.json(
                    {"status" : false,
                    "data"   : 'No token provided' }
                    );
                return;
            }
        }
        app.use(middleware);

    }
}