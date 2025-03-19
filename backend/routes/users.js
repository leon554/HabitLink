const express = require("express")
const User = require("../schemas/userSchema")
const jwt  = require("jsonwebtoken")
const router = express.Router()
 

const sampleDataEmail = "test@test"
router.post("/createhabit", authenticateToken, async (req, res) => {
    if(req.user.email === sampleDataEmail) {res.sendStatus(206); return}
    const name = req.body.name
    if(name == null) return res.status(401).json({msg: "habit not defined"})
    const user = await User.findOne({email: req.user.email})
    if (user.habits.some(h => h.habitName === name)) {
        return res.status(401).json({ msg: "habit already exists" });
    }   
    await User.updateOne(
        { email: req.user.email }, 
        { $push: { habits:  {    
                habitName: name, 
                color: req.body.color, 
                numeric: req.body.numeric, 
                unit: req.body.unit,
                completions: []
            }} 
        })
    res.status(201).json({msg: "succesfully added habit"})
}) 
 
router.get("/habits", authenticateToken, async (req, res) => {
    const email = req.user.email
    if(email === null) return res.status(401).json({msg: "no email found"})
    const user = await User.findOne({email: email})
    res.status(200).json(user.habits)
})

router.delete("/deletehabit", authenticateToken, async (req, res) => {
    if(req.user.email === sampleDataEmail) {res.sendStatus(206); return}
    const id = req.body.id
    if(id === null) return res.status(401).json({msg: "habit id not defined"})
    try {
        const result  = await User.updateOne(
            { email: req.user.email }, 
            { $pull: { habits: { _id: id } } }
        );
        if(result.matchedCount > 0 && result.modifiedCount > 0){
            res.status(201).json({msg: "habit succefully delted"})
        }
        else{
            res.status(404).json({msg: "habit not found"})
        }
    } catch (error) {
        res.status(500).json({msg: "Db server error"})
    }
})

router.put("/updatehabit", authenticateToken, async (req, res) => {
    const color = req.body.color
    const name = req.body.name
    const numeric = req.body.numeric
    const id = req.body.id
    if(req.user.email === sampleDataEmail) {res.sendStatus(206); return}
    if(name == null || color == null || id == null || numeric == null ) return res.status(401).json({msg: "color or name not defined"})
    try {
        const result = await User.updateOne({
            email: req.user.email, "habits._id": id
        }, {
            $set: {
              "habits.$.habitName": name,
              "habits.$.color": color,
              "habits.$.numeric": numeric,
              "habits.$._id": id
            }
        })
        if(result.matchedCount > 0){
            res.status(201).json({msg: "habit succefully updated"})
        }
        else{
            res.status(404).json({msg: "habit not found"})
        }

    }catch (error){
        res.status(500).json({msg: "Db server error"})
    }

})
router.put("/completehabit", authenticateToken, async (req, res) => {
    const id = req.body.id
    const user = await User.findOne({email: req.user.email})
    if(user == null) return res.status(401).json({msg: "user not found"})
    if(req.user.email === sampleDataEmail) {res.sendStatus(206); return}

    const habits = user.habits
    const selectedHabit = habits.find(h => h._id == id)
    if(selectedHabit == null) return res.status(401).json({msg: "Habit not found"})
    
    selectedHabit.completions.push({
            data: req.body.data,
            date: req.body.date
    })

    const result = await User.updateOne({email: req.user.email}, user)
    if(result.matchedCount > 0 && result.modifiedCount > 0){
        res.status(201).json({msg: "habit succefully completed"})
    }
    else{
        res.status(404).json({msg: "habit not found"})
    }
})





function authenticateToken(req, res, next){
    const authHeader = req.headers["authorization"]
    const token = authHeader && authHeader.split(" ")[1]
    if(token === null) return res.status(401).json({msg: "token not included"})

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
        if(err) return res.sendStatus(403)
        req.user = user
        next() 
    })
}
module.exports = router