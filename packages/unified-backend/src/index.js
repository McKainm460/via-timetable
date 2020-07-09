require("./db/mongoose")
const express = require("express")
// const cors = require("cors")
// const rateLimit = require("express-rate-limit");
const courseRouter = require("./routes/course")

const app = express()
const port = process.env.PORT || 3000

// let corsOptions = {
//     origin: 'https://viaplanner.ca', // allow only viaplanner to use the api 
//     optionsSuccessStatus: 200
// }


// const limiter = rateLimit({
//     windowMs: 15 * 60 * 1000, // 15 minutes
//     max: 100 // limit each IP to 100 requests per 15 minutes, so 9 requests per seconds
// });

app.set('trust proxy', 1);

// app.use(limiter);
// app.use(cors(corsOptions))
app.use(express.json()) // parse request as json
app.use(courseRouter)

if (process.env.NODE_ENV === 'production') {
    app.use((req, res, next) => {
        if (req.header('x-forwarded-proto') !== 'https')
            res.redirect(`https://${req.header('host')}${req.url}`)
        else
            next()
    })
}


app.get("/", (req, res) => {
    res.redirect('https://docs.viaplanner.ca/course-api/');
})

app.get("*", (req, res) => {
    res.redirect('https://docs.viaplanner.ca/course-api/');
})

app.listen(port, () => {
    console.log(`Server is up and running on port ${port}`)
})