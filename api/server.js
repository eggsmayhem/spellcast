
// const express = require('express')
// const app = express() 
// const cors = require('cors')
// // const { response } = require('express')
// const PORT = 8000

// app.use(cors())

// app.set('view engine', 'ejs')

// app.use(express.static('public'))
// // app.use(express.static('img'))
// // app.use(express.static('css'))
// app.use('/static', express.static('public'))

// app.use(express.urlencoded({ extended: true}))
// app.use(express.json())

// app.get('/', (req, res) => {
//     res.render('index.ejs')
// })


// app.listen(process.env.PORT || PORT, () => {
//     console.log('Welcome to Hell\'s Front End, Please Enjoy Your Stay')
// })


const express = require('express');
const app = express();
const PORT = 8800;
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const helmet = require('helmet');
const morgan = require('morgan');

const userRoute = require('./routes/users')
const authRoute = require('./routes/auth')
const postRoute = require('./routes/posts')
const conversationRoute = require('./routes/conversations')
const messageRoute = require('./routes/messages')
const entityRoute = require('./routes/entities')
//import multer to upload files locally on test server before migrating to cloud
const multer = require('multer')
const path = require('path')

dotenv.config();

mongoose.connect(
    process.env.MONGO_URL,
    {useNewUrlParser : true, useUnifiedTopology: true},
    ()=>{
        console.log('Connected to MongoDB')
    }
);

//temp file uploading/image path
//when using img path, don't make GET request, but go directly to bottom directory

app.use('/img', express.static(path.join(__dirname, 'public/img')))
//MIDDLEWARE
//body parser for making post requests
app.use(express.json())
app.use(helmet())
app.use(morgan("common"))

//we would use the below for standard webpage routing, but since we are creating a REST API, we will not use them for this part of the project
// app.get("/", (req, res)=> {
//     res.send("Welcome to the homepage")
// })

// app.get("/users", (req, res)=> {
//     res.send("Welcome to the Users page")
// })

//set local disk storage file upload path for local server

const storage = multer.diskStorage({
    destination: (req, file, cb)=> {
        cb(null, 'public/img')
    },
    filename: (req,file,cb)=> {
        //getting name from Share component's data.append('name')
        cb(null, req.body.name)
    }
})
const upload = multer({storage})
app.post('/api/upload', upload.single('file'), (req, res) => {
    try {
        return res.status(200).json('File uploaded successfully')
    }
    catch(err) {
        console.log(err)
    }
})
//reaching from index.js to the routes in the routes folder and connecting them to the Route variables created at the start of this file 
app.use('/api/users', userRoute);
app.use('/api/auth', authRoute);
app.use('/api/posts', postRoute)
app.use('/api/conversations', conversationRoute)
app.use('/api/messages', messageRoute)
app.use('/api/entities', entityRoute)


app.listen(PORT, () =>{
    console.log(`Backend server running on ${PORT} `)
});
