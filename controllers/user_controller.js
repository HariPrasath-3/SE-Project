const User = require('../models/user');

module.exports.signup = (req, res) => {
    return res.render('user_sign_up', {
        title: "Register"
    });
}; 

module.exports.signin = (req, res) => {
    return res.render('user_sign_in', {
        title: "Login"
    });
};


module.exports.create = async (req, res) => {
    if(req.body.password != req.body.confirm_password){
        return  res.redirect('back');
    }
    try{
        let user = await User.findOne({email: req.body.email});
        if(!user){
            User.create({
                email: req.body.email,
                password: req.body.password,
                name: req.body.name,
                role: "student"
            }, (err) => {
                console.log('error in creating user while signing up');
                return;
            });
            console.log("user create successfully")
            return res.redirect('/user/signin');            
        }else{
            return  res.redirect('back');
        }
    }catch(err){
        console.log('error in creating the user', err);
    }
};

module.exports.createSession = (req, res) => {
    req.flash('success', 'Logged In Successfully')
    return res.redirect('/dashboard');
};

module.exports.destroysession = (req, res) => {
    req.logout();
    req.flash('error', 'Logged Out Successfully')
    return res.redirect('/');
}