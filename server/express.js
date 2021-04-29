import express from 'express'
import path from 'path'
import cookieParser from 'cookie-parser'
import compress from 'compression'
import cors from 'cors'
import helmet from 'helmet'

import models from './models/index';
import routes from './routes/IndexRoute';

const app = express()

// parse body params and attache them to req.body
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser())
// use helmet spy bisa dikenali SEO
app.use(helmet())
// secure apps by setting various HTTP headers
app.use(compress())
// enable CORS - Cross Origin Resource Sharing
app.use(cors());



//comment script dibawah before building for production
const CURRENT_WORKING_DIR = process.cwd()
app.use('/dist', express.static(path.join(CURRENT_WORKING_DIR, 'dist')))


app.use("/hr/api/v1/test", (req, res) => {
    res.send("Hello HR-Fullstack")
});

// #middleware
app.use(async (req, res, next) => {
    req.context = {models};
    next();
});


app.use('/api/users',routes.usersRoute);
app.use('/api/course', routes.courseroute);
app.use('/api/Coursecontent', routes.Coursecontentroute);
app.use('/api/Orders', routes.ordersRoute);
app.use('/api/upload',routes.courseroute);



// Catch unauthorised errors
app.use((err, req, res, next) => {
    if (err.name === 'UnauthorizedError') {
        res.status(401).json({ "error": err.name + ": " + err.message })
    } else if (err) {
        res.status(400).json({ "error": err.name + ": " + err.message })
        console.log(err)
    }
})

export default app