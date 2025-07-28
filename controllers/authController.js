import userModel from "../Models/userModel.js";




export const registercontroller = async (req, res, next) => {
    try {
        const {name, email, password} = req.body
        //validate
        if(!name){
            next("Name is required")
        }
        if (!email) {
           next("Email is required");
        }
        if (!password) {
           next("Password is required  and greater than 6 character");
        }
        
        //existing user
        const existingUSer = await userModel.findOne({email})
        if(existingUSer) {
             next("Email already register please login");
            
        }
        const user = await userModel.create({name,email,password})
        //token
        const token = user.createJWT();
        res.status(201).send({succees:true, message:"User created successfully", user: {
            name:user.name,
            lastname:user.lastname,
            email:user.email,
            location:user.location 
        },
        token
    })
       
        

    } catch (error) {
        next(error);        
    }
};

//Login

export const loginController =async (req, res, next) => {
    const {email, password} =  req.body
    //validation
    if(!email || !password){
        next('Please provide all fields')
    }
    //find user by email
    const user = await userModel.findOne({email}).select("+password")
    if(!user){
        next("Invalid Username or Password")
    }
    //compare password
    const isMatch = await user.comparePassword(password)
    if(!isMatch){
        next("Invalid Username or Password");
    }
    user.password = undefined;

    //token
    const token = user.createJWT()
    res.status(200).json({
        succees: true,
        message:"Login Successfully",
        user,
        token,
    })

}


