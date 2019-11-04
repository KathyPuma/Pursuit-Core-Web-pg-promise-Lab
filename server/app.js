const express = require('express');
const cors = require('cors');
const app = express();
const port = 3000;
app.use(cors())
app.use(express.urlencoded({
    extended: false
}))
app.use(express.json())
//ROUTER(import)
const usersRouters = require('./routes/usersRouter')
const postRouter = require('./routes/posts')
const likesRouter = require('./routes/likes')
app.use('/users', usersRouters)
app.use('/posts', postRouter)
app.use('/likes', likesRouter)

app.use('/', (req, res) => {
    res.send("Welcome to Facebook")
})


app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`)
})