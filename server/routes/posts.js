var express = require('express');
var router = express.Router();


const pgp = require('pg-promise')(); 
const connectionString = "postgres://localhost:5432/facebook_db" 
const db = pgp(connectionString) 



router.get('/all', async(req, res) => {
    try {
        let posts = await db.any("SELECT * FROM posts")
        res.json({
            payload: posts,
            message: "Success. Retrieved all the posts"
        })
    } catch (error) {
        res.status(500)
        res.json({
            message: "Error. Something went wrong"
        })
        console.log(error)
    }
});

router.get('/:user_id', async(req, res) => {
    // http://localhost:3000/posts/user_id
    let userId = req.params.user_id
    try{
        let posts = await db.any(`SELECT * FROM posts WHERE poster_id = ${userId} `)
        res.json({
            payload: posts,
            message: `Success. Retrieved all the post from selected ${userId} `
        })
    }catch{
        res.status(500)
        res.json({
            message: "Error. Something went wrong"
        })
    }
});

router.post('/register', async(req, res) => {

    try {
        let insertQuery = `
        INSERT INTO posts(poster_id,body)
            VALUES($1, $2)
        `
        await db.none(insertQuery, [req.body.poster_id, req.body.body])
        res.json({
            payload: req.body,
            message: "Posts registered"
        })
    } catch (error) {
        res.json({
            message: "There was an error registering the Posts"
        })
    }
});




module.exports = router;