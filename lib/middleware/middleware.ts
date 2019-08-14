import * as jwt from 'jsonwebtoken';

export class Middleware{

    public token (req, res, next) {
        var token = req.headers['x-access-token'];
        if (token) {
            jwt.verify(token, app.get('superSecret'), function(err, decoded) {      
                if (err) {
                    res.json(
                        {"status" : false,
                        "data"   : 'Failed to authenticate token' }
                        );
                    return;    
                }else{    
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
}