const User = require('../models/user');

module.exports.signup = (req, res) => {
    return res.render('user_sign_up');
}; 

module.exports.signin = (req, res) => {
    return res.render('user_sign_in');
};


module.exports.create = async (req, res) => {
    if(req.body.password != req.body.confirm_password){
        return  res.redirect('back');
    }
    try{
        let user = await User.findOne({email: req.body.email});
        if(!user){
            User.create(req.body, (err, user) => {
                if(err){console.log('error in creating user while signing up');return;}
                console.log("user create successfully")
                return res.redirect('/user/signin');
            });
            
        }else{
            return  res.redirect('back');
        }
    }catch(err){
        console.log('error in creating the user', err);
    }
};

module.exports.createSession = (req, res) => {
    return res.render('dashboard');
};

module.exports.destroysession = (req, res) => {
    req.logout();
    return res.redirect('/');
}