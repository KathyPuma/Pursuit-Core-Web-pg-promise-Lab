const express = require('express')



const router = express.Router()
//pg-promise setup
const pgp = require('pg-promise')(); //Import pg promise
const connectionString = "postgres://localhost:5432/facebook_db" //url where postgres is running 
const db = pgp(connectionString) //connected db instance

// router.get('/', (req,res)=>{
//     //Es5 method of dealing with promises
//     // db.any("SELECT * FROM users")
//     // .then((rows)=>{
//     //     console.log(rows)
//     //     res.json(rows)
//     // })
//     // .catch((error)=>{
//     //     console.log(error)
//     // })
// })




router.get('/', async (req, res) => {
    // ES6 method/ async-await with try catch [dealing with promises]
    try {
        let users = await db.any("SELECT * FROM users")
        res.json({
            payload: users,
            message: "Success. Retrieved all the users"
        })
    } catch (error) {
        res.status(500)
        res.json({
            message: "Error. Something went wrong"
        })
        console.log(error)
    }
})



router.post('/register', async (req, res) => {
    console.log(req.body)
    try {
        let insertQuery = `
        INSERT INTO users(firstname,lastname,age)
            VALUES($1, $2, $3)
        `
        await db.none(insertQuery, [req.body.firstname, req.body.lastname, req.body.age])
        res.json({
            payload: req.body,
            message: "User registered"
        })
    } catch (error) {
        res.json({
            message: "There was an error registering the User"
        })
    }

})
module.exports = router;