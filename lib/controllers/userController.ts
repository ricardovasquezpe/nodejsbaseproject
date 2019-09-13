import * as mongoose from 'mongoose';
import { UserSchema } from '../models/userModel';
import { Request, Response } from 'express';
import { validationResult } from 'express-validator';
import { sign } from 'jsonwebtoken';

const User = mongoose.model('User', UserSchema);

export class UserController{

    public login (req: Request, res: Response) {
        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            return res.status(422).json({ errors: errors.array() })
        }

        User.findOne({ username : req.body.username, 'password': req.body.password}, { '_id': 1, 'username' : 1, 'password': 1}, function(err, user) {
            if(!user){
              res.json(
                {"status" : false,
                 "data"   : 'User not found'}
              );
              return;
            }
      
            var token = sign(user.toJSON(), "123456789"/*, { expiresIn : '24h' }*/);
            res.json(
              {"status" : true,
               "data"   : user,
               "token"  : token}
            );
            return;
          });
    }

    public register(req: Request, res: Response){
        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            return res.status(422).json({ errors: errors.array() })
        }

        req.body.created_at = new Date();
        var newUser = User(req.body);
        newUser.save(function(err) {
        if (err){
            if(err.code == 11000){
                res.json(
                {"status" : false,
                "data"   : "user already created"}
                );
            }else{
            res.json(
                {"status" : false,
                "data"   : "Weird error"}
                );
            }
            return;
        }

        res.json(
            {"status" : true,
            "data"   : 'User created!'}
        );
        return;

        });
    }

    public suma(a , b){
        return a + b;
    }

}