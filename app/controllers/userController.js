//user login method
let userLoginMethod = (req, res) => {
    return new Promise((resolve, reject) => {
        if(req.body.userName && req.body.password) {
            console.log('username & password available');
            console.log(req.body);
        }else{
            
        }
    });
}