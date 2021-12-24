const booking = require('../models/booking.js')
const shows = require('../models/shows.js')
const {successMail,cancelMail} = require('./mail.js')
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const newUser = async (req,res) =>{
    const {username,email,password} = req.body
    console.log(username,email,password)
    //bookedSeats.flat().map((i) => parseInt(i))
    const checkUser = await shows.find({email : email});
    console.log(checkUser.length)
    if(checkUser.length === 0){
        //Encrypt user password
        encryptedPassword = await bcrypt.hash(password, 10);
        console.log("encryptedPassword--=>>",encryptedPassword)
        const data = await shows.create({
            username,email,password : encryptedPassword,
            isDeleted: false,
            addTime: new Date().toISOString()
        })

        // Create token
        const token = jwt.sign(
            { username: username, email },
            'sahil',
            {
            expiresIn: "2h",
            }
        );
        // save user token
        data.token = token;
        
        console.log("result",data);
        console.log(token)
        res.status(200).json({data,token})
        return
    }else{
        res.status(400).json({error:"User already exists!"})
    }
}

const checkUser = async (req,res) =>{

    try {
        console.log("started")
        const { username, password } = req.body;
        console.log(username, password)
        // Validate user input
        if (!(username && password)) {
            res.status(400).send("All input is required");
        }    
        // Validate if user exist in our database
        const user = await shows.findOne({ username });  
        
        if (user && (await bcrypt.compare(password, user.password))) {
            console.log("user",user)
            // Create token
            const token = jwt.sign(
                { username: username },
                'sahil',
                {
                expiresIn: "2h",
                }
            );

            // save user token
            user.token = token;
            let success = true;
            let data = {
                data : user,
                token : token,
                success : true
            }
                
            // user
            res.status(200).json(data);
            console.log("SENT RESPONSE HERE --->>>",data)
        }else{
            res.status(400).send("Invalid Credentials");
        }

    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}
const updateBooking = async (req,res) =>{
    const data = req.body;
    try {
        const updatedPost = await booking.findByIdAndUpdate(data._id, data, { new:true })
        const show = await shows.findById(data.showID)
        const sheets = updatedPost.bookedSeats.flat().map((i) => parseInt(i))
        if(sheets.length > 0){
            for(let i=0;i< sheets.length; i++){
                show.bookedSeats = show.bookedSeats.filter((id) => id !== sheets[i])
            }
            await shows.findByIdAndUpdate(data.showID, show, {new : true})
        }
        cancelMail({show,updatedPost})
        res.status(200).json(updatedPost);        
    } catch (error) {
        console.log(error)
        res.status(400).json({ message: error.message });
    }
}

module.exports = {newUser,checkUser}