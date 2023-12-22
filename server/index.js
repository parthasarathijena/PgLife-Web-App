const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const multer = require('multer');
const paths = require('path')
const cors = require('cors');
const { MongoClient } = require('mongodb');

const app = express();
require('./dbconn/conn');
app.use(cors());

app.use(express.json())
app.use("/images",express.static(paths.join(__dirname,"/public/images")));

const storage = multer.memoryStorage();
const upload = multer({ storage });
const mongourl = 'mongodb+srv://jubul577:partha123@pglife.up6hriq.mongodb.net/pgdata?retryWrites=true&w=majority';



let client;
async function connectToDatabase() {
    try {
        client = await MongoClient.connect(mongourl);
        console.log('Connected to MongoDB Atlas');
    } catch (error) {
        console.error('Error connecting to MongoDB Atlas:', error);
    }
}

app.use(async (req, res, next) => {
    if (!client) {
        await connectToDatabase();
    }
    next();
});
// app.use("/images",express.static(paths.join(__dirname,"/public/images")));

// const storage = multer.diskStorage({
//     destination: (req,file,cb) => {
//         cb(null,'public/images');
//     },
//     filename: (req,file,cb) => {
//         cb(null,file.originalname);
//     }
// })

// const upload = multer({storage : storage});


const authRoute = require('./routes/auth')
const postRoute = require('./routes/post')


app.use('/api/auth', authRoute);
app.use('/api/post', postRoute);


app.post('/api/upload', upload.single('file'), async (req, res) => {
    try {
        const db = client.db('pgdata');

        const { GridFSBucket } = require('mongodb');
        const bucket = new GridFSBucket(db);

        const uploadStream = bucket.openUploadStream(req.file.originalname);
        uploadStream.end(req.file.buffer);

        res.send('File uploaded successfully!');
    } catch (error) {
        console.error('Error uploading file:', error);
        res.status(500).send('Internal Server Error');
    }
});

app.get('/api/image/:filename', async (req, res) => {
    try {

        const db = client.db('pgdata');
        const { GridFSBucket } = require('mongodb');
        const bucket = new GridFSBucket(db);


        const downloadStream = bucket.openDownloadStreamByName(req.params.filename);
        const fileExtension = req.params.filename.split('.').pop().toLowerCase();
        let contentType;
        if (fileExtension === 'jpeg' || fileExtension === 'jpg') {
            contentType = 'image/jpeg';
        } else if (fileExtension === 'png') {
            contentType = 'image/png';
        }
        res.set('Content-Type', contentType);

        downloadStream.pipe(res);
    } catch (error) {
        console.error('Error fetching file:', error);
        res.status(500).send('Internal Server Error');
    }
});

// app.post('/api/upload',upload.single('file'),(req,res) =>{
//     try{
//         return res.status(200).json('file uploaded successfully');
//     }catch(err){
//         console.log(err);
//     }
// })

app.listen(5000, () => {
    console.log('Server is running at port 5000');
})