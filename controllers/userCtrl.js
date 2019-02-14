const passport = require('passport');
const User = require('../models/user');

exports.createUser = (req, res, next) => {

    console.log(req.body);

    if (req.body.fullname === undefined || req.body.email === undefined || req.body.password === undefined)
    {
        return res.status(200).json({error:'You can not submit empty data: Error(1023)'});
    }

    if (req.body.fullname === '' || req.body.email === '' || req.body.password === '')
    {
        return res.status(200).json({error:'You can not submit empty data: Error(1024)'});
    }

    passport.authenticate('local-signup', (err, user, info) =>{
        if (err){
            // 500 - error but use 200 for msg to be show on client side
            return res.status(200).json({error:err});
        }

        if (info){
            // 400 - unathorized access but use 200 for msg to be show on client side
            return res.status(200).json({error:info});
        }

        // 201 - 200 is success and 201 is create new data
        return res.status(201).json({message:"User successfully created.", user: user});
    })(req, res, next);
}

exports.loginUser = (req, res, next) => {

    console.log(req.body);

    if (req.body.email === undefined || req.body.password === undefined)
    {
        return res.status(200).json({error:'You can not submit empty data'});
    }

    if (req.body.email === '' || req.body.password === '')
    {
        return res.status(200).json({error:'You can not submit empty data'});
    }
    
    passport.authenticate('local-login', (err, user, info) =>{
        if (err){
            // 500 - error but use 200 for msg to be show on client side
            return res.status(200).json({error:err});
        }

        if (info){
            // 400 - unathorized access but use 200 for msg to be show on client side
            return res.status(200).json({error:info});
        }

        // 201 - 200 is success and 201 is create new data
        return res.status(200).json({message:"User login successful.", user: user});
    })(req, res, next);
}

exports.homePage = async (req, res) => {

    console.log( req.params.email);
    const result = await User.findOne({'email':req.params.email}, {'password':0}); // exclude password from the found user object

    return res.status(200).json({user: result});
}
