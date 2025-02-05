import bcryptjs from 'bcryptjs';
import { User } from '../Models/user.js';
import { generateTokenAndSetCookie } from '../utils/generateToken.js';
export async function signup(req, res) {
    console.log(req.body)
    try {
        const { email, password, username } = req.body;
        if (!email || !password || !username) {
            return res.status(400).json({ success: false, message: 'Please enter all fields' });

        }
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return res.status(400).json({ success: false, message: 'Invalid email' });
        }
        if (password.length < 6) {
            return res.status(400).json({ success: false, message: 'Password must be at least 6 characters' });
        }
        const existingUserByEmail = await User.findOne({ email: email });
        if (existingUserByEmail) {
            return res.status(400).json({ success: false, message: 'User with this email already exists' });
        }
        const existingUserByUsername = await User.findOne({ username });

        if (existingUserByUsername) {
            return res.status(400).json({ success: false, message: 'User with this username already exists' });
        }
        const salt = await bcryptjs.genSalt(10);
        const hashedPassword = await bcryptjs.hash(password, salt);

        const PROFILE_PICS = ["/avatar1.png", "/avatar2.png", "/avatar3.png"];
        const image = PROFILE_PICS[Math.floor(Math.random() * PROFILE_PICS.length)];

        const newUser = new User({
            email,
            password: hashedPassword,
            username,
            image,
        });
        if (newUser) {
            generateTokenAndSetCookie(newUser._id, res);
            await newUser.save();
            res.status(201).json({
                success: true,
                user: {
                    ...newUser._doc,
                    password: "",
                }
            });
        }


    } catch (error) {
        console.log("Error in signup controller", error.message)
        res.status(500).json({ success: false, message: 'Internal server error here' });
    }
}

export async function login(req, res) {
   try {
    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(400).json({ success: false, message: 'Please enter all fields' });
    }
    const user = await User.findOne({ email });
    if (!user) {
        return res.status(400).json({ success: false, message: 'Invalid credentials' });
    }
    const ispasswordMatch = await bcryptjs.compare(password, user.password);
    if (!ispasswordMatch) {
        return res.status(400).json({ success: false, message: 'Invalid credentials' });
    }
    
    generateTokenAndSetCookie(user._id, res);

    res.status(200).json({ success: true, user: { ...user._doc, password: "" }
     });
   }

    catch (error) {
     console.log("Error in login controller", error.message)
     res.status(500).json({ success: false, message: 'Internal server error here' });
    }
}

export async function logout(req, res) {
   try{
    res.clearCookie('jwtn-netflix');
    res.status(200).json({ success: true, message: 'Logged out successfully' });
    }catch(error){
        console.log("Error in logout controller", error.message)
        res.status(500).json({ success: false, message: 'Internal server error here' }); 
   }
}

export async function authCheck(req, res) {
    console.log(req.user)

    try{
        
        res.status(200).json({ success: true, user:req.user });
    } catch(error){
     
        res.status(500).json({ success: false, message: 'Internal server error' });
    }
}