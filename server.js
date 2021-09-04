const express = require('express');
const http = require('http');
const morgan = require('morgan');
const mongoose = require('mongoose');
const cors = require('cors');
const config = require('./config');
const fileUpload = require('express-fileupload');
const helmet = require('helmet')
const Video = require('./models/video')

const app = express();
app.use(helmet())

// db setup
mongoose.connect(config.connectionString, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false
});

// app setup
app.use(morgan('dev'));

const corsOptions = {
    'allowedHeaders': ['Content-Type'], // headers that React is sending to the API
    'exposedHeaders': ['Content-Type'], // headers that you are sending back to React
    'origin': '*',
    'methods': 'GET,HEAD,PUT,PATCH,POST,DELETE',
    'preflightContinue': false
};
app.use(cors(corsOptions));
// app.use(function (req, res, next) {
//     res.header("Access-Control-Allow-Origin", "*"); // update to match the domain you will make the request from
//     res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
//     next();
// });

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(fileUpload());

const authRoutes = require('./routes/auth.routes')
app.use('/channel/', authRoutes)

const videoRoutes = require('./routes/video.routes')
app.use('/channel/videos', videoRoutes)

const commentRoutes = require('./routes/comment.routes')
app.use('/channel/comments', commentRoutes)

const linkRoutes = require('./routes/link.routes')
app.use('/channel/links', linkRoutes)

const userRoutes = require('./routes/user.routes')
app.use('/channel/users', userRoutes)

const fileRoutes = require('./routes/file.routes')
app.use('/channel/files', fileRoutes)

const playlistRoutes = require('./routes/playlist.routes')
app.use('/channel/playlists', playlistRoutes)

// server app
const server = http.createServer(app);
server.listen(5000);