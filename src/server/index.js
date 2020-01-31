const dotenv = require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const os = require('os');
const Kinect2 = require('kinect2');
const mongoose = require('mongoose');

// const result = dotenv.config();
//
// if (result.error) {
//   throw result.error
// };

//console.log(result.parsed);

var app = require('express')();
var http = require('http').createServer(app);

var io = require('socket.io')(http);

app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
});

//mongoose Section

mongoose
.connect(process.env.DATABASE_URL, {
  useUnifiedTopology: true,
  useNewUrlParser: true,
})
.then(() => console.log('DB Connected at: ',process.env.DATABASE_URL ))
.catch(err => {
  console.log('DB Connection Error: ', err.message);
});

var Schema = mongoose.Schema;

var sessionRecordingSchema = new Schema({
  title:  String,
  endTime: String,
  frames: [String]
});

//Socket.io section
io.on('connection', function(socket){

  var SessionRecording = mongoose.model('SessionRecording', sessionRecordingSchema);

  socket.on('Start Recording', function(msg){
    console.log('Start Recording at: ' + msg.startTime);
    var sessionRecording = new SessionRecording({title:msg.startTime});
    sessionRecording.save();
  });

  socket.on('New Frame', function(msg){
    var currentSession = SessionRecording.find({ title: msg.startTime}, function(err,docs){
      //console.log('New Frame received is: ' + docs[0]);
      docs[0].frames.push(msg.frame);
      docs[0].save();
    });
  });

  socket.on('Stop Recording', function(msg){
    var currentSession = SessionRecording.find({ title: msg.startTime}, function(err,docs){
      console.log('Stop Recording at: ' + msg.endTime);
      docs[0].endTime = msg.endTime;
      docs[0].save();
    });
  });
});

http.listen(8080, function(){
  console.log('Server listening on :8080');
});

//Kinect Section
kinect = new Kinect2();

if(kinect.open()){
  kinect.on('bodyFrame', sendFrame);

  function sendFrame(bodyFrame){
      io.emit('bodyFrame', bodyFrame);
  }

  kinect.openBodyReader();
}



app.use(express.static('dist'));

app.use( (req, res, next) => {
   res.header("Access-Control-Allow-Origin", "http://localhost:3000"); //The ionic server
   res.header("Access-Control-Allow-Credentials", "true");
   res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
   next();
});
