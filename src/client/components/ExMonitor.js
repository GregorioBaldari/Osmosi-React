// Renders the bodies

import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import io from 'socket.io-client';
import data from '../lmac1.json';
import RecordingSwitch from '../commons/recordingSwitch.js';
import DemoSwitch from '../commons/demoSwitch.js';
import TrackingSwitch from '../commons/trackingSwitch.js'

//https://github.com/js6450/kinect-data
// SPINE BASE
// SPIN MID
// NECK
// HEAD
// SHOULDER LEFT
// ELBOW LEFT
// WRIST LEFT
// HAND LEFT
// SHOULDER RIGHT
// ELBOW RIGHT
// WRIST RIGHT
// HAND RIGHT
// HIP LEFT
// KNEE LEFT
// ANKLE LEFT
// FOOT LEFT
// HIP RIGHT
// KNEE RIGHT
// ANKLE RIGHT
// FOOT RIGHT#

///******Not Available in Demo demoMode
// spineShoulder 	: 20,
// handTipLeft 		: 21,
// thumbLeft 			: 22,
// handTipRight 		: 23,
// thumbRight 			: 24

function bodyParam () {
  this.RWrist_Center_D = 0;
  this.Max_RWrist_Center_D = -1; //Used to create sounds all along the available scale. See in genereto note functions in Apps

  this.LWrist_Center_D = 0;
  this.Max_LWrist_Center_D = -1; //Used to create sounds all along the available scale. See in genereto note functions in Apps

  this.Body_Monitor_D = -1;
  this.Max_Body_Monitor_D = -1; //Used to create sounds all along the available scale. See in genereto note functions in Apps

  //Body Cnetre body, calculated. NOT a kinect param
  this.cx = 0;
  this.cy = 0;

  // SPINE BASE
  //this.spnbx = 0;
  //this.spnby = 0;

  // SPIN MID
  //this.spnmx = 0;
  //this.spmmy = 0;

  // NECK
  //this.nckx = 0;
  //this.ncky = 0;

  // HEAD
  this.hdx = 0;
  this.hdy = 0;

  // SHOULDER LEFT
  //this.shdLx = 0;
  //this.shdLy = 0;

  // ELBOW LEFT
  //this.elbLx = 0;
  //this.elbLy = 0;

  // WRIST LEFT
  this.wrsLx = 0;
  this.wrsLy = 0;

  // HAND LEFT
  //this.hndLx = 0;
  //this.hndLy = 0;

  // SHOULDER RIGHT
  //this.shdRx = 0;
  //this.shdRy = 0;

  // ELBOW RIGHT
  //this.elbRx = 0;
  //this.elbRy = 0;

  // WRIST RIGHT
  this.wrsRx = 0;
  this.wrsRy = 0;

  // HAND RIGHT
  //this.hndRx = 0;
  //this.hndRy = 0;

  // HIP LEFT
  //this.hpLx = 0;
  //this.hpLy = 0;

  // KNEE LEFT
  this.knLx = 0;
  this.knLy = 0;

  // ANKLE LEFT
  this.ankLx = 0;
  this.ankLy = 0;

  // FOOT LEFT
  //this.ftLx = 0;
  //this.ftLy = 0;

  // HIP RIGHT
  //this.hpRx = 0;
  //this.hpRy = 0;

  // KNEE RIGHT
  this.knRx = 0;
  this.knRy = 0;

  // ANKLE RIGHT
  this.ankRx = 0;
  this.ankRy = 0;

  // FOOT RIGHT
  //this.ftRx = 0;
  //this.ftRy = 0;

  ///******Not Available in Demo demoMode
  // spineShoulder 	: 20,
  // handTipLeft 		: 21,
  // thumbLeft 			: 22,
  // handTipRight 		: 23,
  // thumbRight 			: 24
}

var recData = {
  startTime:null,
  endTime:null,
  frame:null,
};

//Setting Socke connetion
var socketio_url = "http://localhost:8080" ;
var socket = io.connect(socketio_url);
var kinectBodies = [];
var demoMode = true;

class ExMonitor extends Component {

  constructor(props){
      console.log("Building ExMonitor");
      super(props);
      socket.on('bodyFrame', this.settingKinectBodies.bind(this));

      this.recordingMode = false;
      this.onRecordingModeHandler = this.onRecordingModeHandler.bind(this);

      this.demoMode = false;
      this.onDemoModeHandler = this.onDemoModeHandler.bind(this);
      this.demoIndex = -1;

      this.trackingMode = false;
      this.onTrackingModeHandler = this.onTrackingModeHandler.bind(this);

      this.drawMouseInput = false;
      this.mouseX = null;
      this.mouseY = null;
      this.monitorMouseX = null;
      this.monitorMouseY = null;
      this.onMouseMoveHandler = this.onMouseMoveHandler.bind(this);
      this.onCanvasClickHandler = this.onCanvasClickHandler.bind(this);
      this.onMouseOutHandler = this.onMouseOutHandler.bind(this);

      this.body = null;
      this.bodyParam = new bodyParam();
      this.demo = null;//SetInterval variable used to call clearInterval
      this.rec = null;//SetInterval variable used to call clearInterval
      this.recData = recData;
      this.state = {recordingMode:this.recordingMode, demoMode:this.demoMode, trackingMode:this.trackingMode};

      //Monitor Phisical Paramater
      this.canvas = null;
      this.cw = null;
      this.ch = null;
      this.centerMonitorX = null;
      this.centerMonitorY = null;
  }

  componentDidUpdate(){
    this.canvas = document.getElementById('bodyCanvas');
    this.cw = this.canvas.width;
    this.ch = this.canvas.height;
    this.centerMonitorX = this.canvas.width/2;
    this.centerMonitorY = this.canvas.height/2;
    console.log('Did Update');
  }

  settingKinectBodies(bodyFrame){
    this.demoMode = false
    //clearInterval(demo);
    for(var i=0; i<bodyFrame.bodies.length; ++i){
      if (bodyFrame.bodies[i].tracked === true){
        this.body = bodyFrame.bodies[i];
        this.processKinectBodies();
        return;
      }
    }
  }

  processKinectBodies(){
    this.bodyParam = Object.assign({},this.props.bodyParam);
    this.populateKinectBodyParam(this.body.joints,this.bodyParam,cw,ch);
    var ctx = this.canvas
    ctx.clearRect(0, 0, this.cw, this.ch);

    //Draw Joints
    for (var i =0 ; i<20; ++i) {
      var joint= this.body.joints[i];
      this.drawSimpleCircle(ctx, joint.colorX*this.cw, joint.colorY*this.ch, 5, 'red', true);
    }

    //Calculate distance of wristels
    var x1 = this.bodyParam.cx;
    var y1 = this.bodyParam.cy;
    //Left
    var x2 = this.bodyParam.wrsRx;
    var y2 = this.bodyParam.wrsRy;
    //Right
    var x3 = this.bodyParam.wrsLx;
    var y3 = this.bodyParam.wrsLy;
    this.bodyParam.RWrist_Center_D = Math.sqrt((x2-x1)*(x2-x1)+(y2-y1)*(y2-y1));
    this.bodyParam.LWrist_Center_D = Math.sqrt((x3-x1)*(x3-x1)+(y3-y1)*(y3-y1));
    this.props.newBodyParam(this.bodyParam);

    //Draw distance of wristels
    if(true){
      this.drawSimpleCircle(ctx, this.bodyParam.cx, this.bodyParam.cy, this.bodyParam.RWrist_Center_D, 'red', false);
      this.drawSimpleCircle(ctx, this.bodyParam.cx, this.bodyParam.cy, this.bodyParam.LWrist_Center_D, 'red', false);
    }
  }

  processDemoBodies(){
    this.bodyParam = Object.assign({},this.bodyParam);
    this.populateBDemoBodyParam(this.body.joints,this.bodyParam);
    var ctx = this.canvas.getContext('2d');
    ctx.clearRect(0, 0, this.cw, this.ch);

    //Draww Monitor Center
    if(true){
        this.drawSimpleCircle(ctx, this.centerMonitorX, this.centerMonitorY, 10, 'green', false);
    }

    //Draw each joints
    for (var i = 0 ; i < 20; ++i) {
      var joint= this.body.joints[i];
      this.drawSimpleCircle(ctx, joint.x, joint.y, 5, 'red', true);
    }
    //Calculate distance of wristels
    var x0 = this.centerMonitorX;
    var y0 = this.centerMonitorY;

    var x1 = this.bodyParam.cx;
    var y1 = this.bodyParam.cy;
    //Left
    var x2 = this.bodyParam.wrsRx;
    var y2 = this.bodyParam.wrsRy;
    //Right
    var x3 = this.bodyParam.wrsLx;
    var y3 = this.bodyParam.wrsLy;
    this.bodyParam.RWrist_Center_D = Math.sqrt((x2-x1)*(x2-x1)+(y2-y1)*(y2-y1));
    if(this.bodyParam.RWrist_Center_D > this.bodyParam.Max_RWrist_Center_D){
      this.bodyParam.Max_RWrist_Center_D = this.bodyParam.RWrist_Center_D;
    }

    this.bodyParam.LWrist_Center_D = Math.sqrt((x3-x1)*(x3-x1)+(y3-y1)*(y3-y1));
    if(this.bodyParam.LWrist_Center_D > this.bodyParam.Max_LWrist_Center_D){
      this.bodyParam.Max_LWrist_Center_D = this.bodyParam.LWrist_Center_D;
    }

    ////Calculate distance of body center from monitor centerMonitor
    this.bodyParam.Body_Monitor_D = Math.sqrt((x1-x0)*(x1-x0)+(y1-y0)*(y1-y0));
    if(this.bodyParam.Body_Monitor_D > this.bodyParam.Max_Body_Monitor_D){
      this.bodyParam.Max_Body_Monitor_D = this.bodyParam.Body_Monitor_D;
    }

    this.props.newBodyParam(this.bodyParam);

    //Draw distance of wristels
    if(true){
      this.drawSimpleCircle(ctx, this.bodyParam.cx, this.bodyParam.cy, this.bodyParam.RWrist_Center_D, 'red', false);
      this.drawSimpleCircle(ctx, this.bodyParam.cx, this.bodyParam.cy, this.bodyParam.LWrist_Center_D, 'red', false);
      this.drawSimpleCircle(ctx, this.centerMonitorX, this.centerMonitorY, this.bodyParam.Body_Monitor_D, 'green', false);
    };

    if(this.drawMouseInput == true){
      this.drawMouseCoordinate(ctx);
      this.writeCoordinateOnCanvas(ctx);
    };

    if(this.demoMode){
      this.writeDemoDetailsOnCanvas(ctx);
    };

  }

  drawMouseCoordinate(ctx){
    var BB=this.canvas.getBoundingClientRect();

    this.monitorMouseX = this.mouseX - BB.left;
    this.monitorMouseY = this.mouseY - BB.top;

    ctx.strokeStyle = 'grey';
    ctx.setLineDash([5, 3]);
    ctx.lineWidth = 0.5;
    ctx.beginPath();
    ctx.moveTo(this.monitorMouseX, 0);
    ctx.lineTo(this.monitorMouseX, this.ch);
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(0, this.monitorMouseY);
    ctx.lineTo(this.cw, this.monitorMouseY);
    ctx.stroke();
    return;
  }

  writeCoordinateOnCanvas(ctx){
    // var BB=this.canvas.getBoundingClientRect();
    // var offsetX=BB.left;
    // var offsetY=BB.top;
    var msg= 'X:' + this.monitorMouseX + ' Y:' + this.monitorMouseY;
    ctx.font = "12px Comic Sans MS";
    ctx.textAlign = "center";
    ctx.fillText(msg, this.monitorMouseX+45, this.monitorMouseY-10);
    return;
  }

  writeDemoDetailsOnCanvas(ctx){
    var BB=this.canvas.getBoundingClientRect();
    var offsetX=BB.left;
    var offsetY=BB.top;
    var msg='Frame ' + this.demoIndex + ' of ' + (data.length-1);
    ctx.font = "10px Comic Sans MS";
    ctx.textAlign = "center";
    ctx.fillText(msg, 60, 20);
    return;
  }

  drawSimpleCircle(ctx, cx, cy, d, color, toFill){
    ctx.fillStyle = color;
    ctx.strokeStyle = color;
    ctx.beginPath();
    ctx.arc(cx, cy, d, 0, 2 * Math.PI);
    ctx.stroke();
    if (toFill) {
      ctx.fill();
    }
  }

  drawnWistCircles(ctx, toFill){
    var x1 = this.bodyParam.cx;
    var y1 = this.bodyParam.cy;

    //Right
    var x2 = this.bodyParam.wrsRx;
    var y2 = this.bodyParam.wrsRy;
    this.bodyParam.RWrist_Center_D = Math.sqrt((x2-x1)*(x2-x1)+(y2-y1)*(y2-y1));
    this.drawSimpleCircle(ctx, x1, y1,   this.bodyParam.RWrist_Center_D, 'blue', toFill);

    //Left
    var x2 = this.bodyParam.wrsLx;
    var y2 = this.bodyParam.wrsLy;
    this.bodyParam.LWrist_Center_D = Math.sqrt((x2-x1)*(x2-x1)+(y2-y1)*(y2-y1));
    this.drawSimpleCircle(ctx, x1, y1,   this.bodyParam.LWrist_Center_D, 'blue', toFill);
  }

  populateKinectBodyParam(joints,bodyParam,cw,ch){
    //Body Cnetre body, calculated. NOT a kinect param
    bodyParam.cx = joints[0].colorX*cw;
    bodyParam.cy = joints[0].colorX*cw;

    // SPINE BASE
    //bodyParam.spnbx = joints[0].colorX*cw;
    //bodyParam.spnby = joints[0].colorY*ch;

    // SPIN MID
    //bodyParam.spnmx = joints[1].colorX*cw;
    //bodyParam.spmmy = joints[1].colorY*ch;

    // NECK
    //bodyParam.nckx = joints[2].colorX*cw;
    //bodyParam.ncky = joints[2].colorY*ch;

    // HEAD
    bodyParam.hdx = joints[3].colorX*cw;
    bodyParam.hdy = joints[3].colorY*ch;

    // SHOULDER LEFT
    //bodyParam.shdLx = joints[4].colorX*cw;
    //bodyParam.shdLy = joints[4].colorY*ch;

    // ELBOW LEFT
    //bodyParam.elbLx = joints[5].colorX*cw;
    //bodyParam.elbLy = joints[5].colorY*ch;

    // WRIST LEFT
    bodyParam.wrsLx = joints[6].colorX*cw;
    bodyParam.wrsLy = joints[6].colorY*ch;

    // HAND LEFT
    //bodyParam.hndLx = joints[7].colorX*cw;
    //bodyParam.hndLy = joints[7].colorY*ch;

    // SHOULDER RIGHT
    //bodyParam.shdRx = joints[8].colorX*cw;
    //bodyParam.shdRy = joints[8].colorY*ch;

    // ELBOW RIGHT
    //bodyParam.elbRx = joints[9].colorX*cw;
    //bodyParam.elbRy = joints[9].colorY*ch;

    // WRIST RIGHT
    bodyParam.wrsRx = joints[10].colorX*cw;
    bodyParam.wrsRy = joints[10].colorY*ch;

    // HAND RIGHT
    //bodyParam.hndRx = joints[11].colorX*cw;
    //bodyParam.hndRy = joints[11].colorY*ch;

    // HIP LEFT
    //bodyParam.hpLx = joints[12].colorX*cw;
    //bodyParam.hpLy = joints[12].colorY*ch;

    // KNEE LEFT
    bodyParam.knLx = joints[13].colorX*cw;
    bodyParam.knLy = joints[13].colorY*ch;

    // ANKLE LEFT
    bodyParam.ankLx = joints[14].colorX*cw;
    bodyParam.ankLy = joints[14].colorY*ch;

    // FOOT LEFT
    //bodyParam.ftLx = joints[15].colorX*cw;
    //bodyParam.ftLy = joints[15].colorY*ch;

    // HIP RIGHT
    //bodyParam.hpRx = joints[16].colorX*cw;
    //bodyParam.hpRy = joints[16].colorY*ch;

    // KNEE RIGHT
    bodyParam.knRx = joints[17].colorX*cw;
    bodyParam.knRy = joints[17].colorY*ch;

    // ANKLE RIGHT
    bodyParam.ankRx = joints[18].colorX*cw;
    bodyParam.ankRy = joints[18].colorY*ch;

    // FOOT RIGHT
    //bodyParam.ftRx = joints[19].colorX*cw;
    //bodyParam.ftRy = joints[19].colorY*cw;

    ///******Not Available in Demo demoMode
    // spineShoulder 	: 20,
    // handTipLeft 		: 21,
    // thumbLeft 			: 22,
    // handTipRight 		: 23,
    // thumbRight 			: 24

    return bodyParam;

  }

  populateBDemoBodyParam(joints,bodyParam){

    // SPINE BASE
    bodyParam.cx = joints[0].x;
    bodyParam.cy = joints[0].y;

    // HEAD
    bodyParam.hdx = joints[3].x;
    bodyParam.hdy = joints[3].y;

    // WRIST LEFT
    bodyParam.wrsLx = joints[6].x;
    bodyParam.wrsLy = joints[6].y;

    // HAND LEFT
    bodyParam.hlx = joints[7].x;
    bodyParam.hly = joints[7].y;

    // WRIST RIGHT
    bodyParam.wrsRx = joints[10].x;
    bodyParam.wrsRy = joints[10].y;

    // HAND RIGHT

    bodyParam.hrx = joints[11].x;
    bodyParam.hry = joints[11].y;

    // KNEE LEFT
    bodyParam.knLx = joints[13].x;
    bodyParam.knLy = joints[13].y;

    // ANKLE LEFT

    bodyParam.ankLx = joints[14].x;
    bodyParam.ankLy = joints[14].y;

    // ANKLE RIGHT

    bodyParam.ankRx = joints[18].x;
    bodyParam.ankRy = joints[18].y;

    return bodyParam;

  }

////Monitor Controller

  onRecordingModeHandler(){
    this.recordingMode = !this.recordingMode;
    if(this.recordingMode){
      this.startRecording();
    } else {
      this.stopRecording()
    }
    this.setState({recordingMode: this.recordingMode});
  }

  startRecording(){
    var currentdate = new Date();
    this.recData.startTime = currentdate.getDate() + "/"
                + (currentdate.getMonth()+1)  + "/"
                + currentdate.getFullYear()
                + " @ " +
                + currentdate.getHours() + ":"
                + currentdate.getMinutes() + ":"
               + currentdate.getSeconds();
    socket.emit('Start Recording', this.recData);
    console.log('Starting Recording');
    if(this.body.joints != null){
      this.rec = setInterval(() => {
        this.recData.frame = JSON.stringify(this.bodyParam)
        socket.emit('New Frame', this.recData);
      }, 3000);
    }
  }

  stopRecording(){
    clearInterval(this.rec);
    var currentdate = new Date();
    this.recData.endTime = currentdate.getHours() + ":"
                + currentdate.getMinutes() + ":"
               + currentdate.getSeconds();
    socket.emit('Stop Recording', this.recData);
    console.log('Stop Recording');
    this.recordingMode = false;
    this.setState({recordingMode:this.recordingMode});
  }

  onDemoModeHandler(){
    this.demoMode = !this.demoMode;
    if(this.demoMode) {
      this.trackingMode = false;
      this.recordingMode = false;
      this.loadDemo();
    } else {
      clearInterval(this.demo);
    }
    this.setAllState();
  }

  loadDemo(){
    if(this.demoMode == true){
      this.demoIndex = -1;
      this.demo = setInterval(() => {
        ++this.demoIndex;
        if(this.demoIndex<data.length){
          this.body = data[this.demoIndex][0];
          this.processDemoBodies();
        } else {
          clearInterval(this.demo);
          this.loadDemo(); //Let's starting the Demo over and over again!!
        }
      }, 150);
    }
  }

/////Mouse over Monitor controller

  onTrackingModeHandler(){
    this.trackingMode = !this.trackingMode;
    if(this.trackingMode){
      this.demoMode = false;
    } else {
      this.recordingMode = false;
    }
    this.setAllState();
  }

  onMouseMoveHandler(e){
    this.mouseX = e.clientX;
    this.mouseY = e.clientY;
    this.drawMouseInput = true;
  }

  onCanvasClickHandler(e){
    this.centerMonitorX = this.monitorMouseX;
    this.centerMonitorY = this.monitorMouseY;
    this.bodyParam.Max_Body_Monitor_D = -1 //Just to reset this value
  }

  onMouseOutHandler(){
    this.drawMouseInput = false;
  }

  setAllState(){
    if(this.state.trackingMode !=  this.trackingMode){
      this.setState({trackingMode:this.trackingMode});
    }
    if (this.state.ecordingMode != this.recordingMode){
      this.setState({recordingMode:this.recordingMode});
    }
    if (this.state.demoMode != this.demoMode){
      this.setState({demoMode: this.demoMode});
    }
  }

  render() {
    return (
      <div>
        <div className={"col-12"}>
          <div className = "row pb-3">
              <canvas className = {"border"} ref="canvas" id="bodyCanvas" width="512" height="424"
                onMouseMove={this.onMouseMoveHandler}
                onMouseOut = {this.onMouseOutHandler}
                onClick = {this.onCanvasClickHandler}
                >
              </canvas>
          </div>
          <div className="row pl-2">
            <div className = "col-3 border-right">
              <DemoSwitch
                onChange = {()=> this.onDemoModeHandler}
                value = {this.state.demoMode}
                disabled = {this.state.trackingMode}
              />
            </div>
            <div className = "col-3">
              <TrackingSwitch
                onChange = {()=> this.onTrackingModeHandler}
                value = {this.state.trackingMode}
                disabled = {this.state.demoMode}
              />
            </div>
            <div className = "col-3">
              <RecordingSwitch
                onChange = {()=> this.onRecordingModeHandler}
                value = {this.state.recordingMode}
                disabled = {!this.state.trackingMode}
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default ExMonitor;
