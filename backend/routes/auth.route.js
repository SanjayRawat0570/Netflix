import express from 'express';
const router = express.Router();    
app.get ('/api/v1/signup', (req, res) => {
    res.send('Signup route');
    });
    app.get("/api/v1/login", (req, res)=>{
        res.send("login route");
    })
    app.get("/api/v1/logout", (req, res)=>{
        res.send("Logout route");
    });
    export default router;