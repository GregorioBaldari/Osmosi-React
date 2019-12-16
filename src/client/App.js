import React, { Component } from 'react';
import './app.css';
import io from 'socket.io-client';
import InstrumentsPanel from './components/InstrumentsPanel.js';
import InstrumentsSettingPanel from './components/InstrumentsSettingPanel.js';
import MstSoundComponent from './components/MasterSoundComponent.js';
import ExMonitor from './components/ExMonitor.js';
import data from './lmac1.json';

///// IMPORTANT ////
// To add a new instrument:
// 1. Create the variable below (Remove all the space from the file name)
// 2. Load the files for Create.js sounds library
// 3. Add to instrumentTypeList
// 4. Add to InstrumentSelector component

//Adding Sounds: STEP 1
var wood_block = {
  name:'Wood Block',
  instance: null,
  source: [
    {src:"woodblock__025_mezzo-forte_struck-singly.mp3", id:"wbc0"},
    {src:"woodblock__025_mezzo-forte_struck-singly.mp3", id:"wbc1"},
    {src:"woodblock__025_mezzo-forte_struck-singly.mp3", id:"wbc2"},
    {src:"woodblock__025_mezzo-forte_struck-singly.mp3", id:"wbc3"},
  ],
  notes: ["wbc0","wbc1","wbc2","wbc3"],
  assetsPath: "src/client/audio/wood_block/"
};

var water_drop = {
  name:'Water Drop',
  instance: null,
  source: [
      {src:"01-C0.wav", id:"c0"},
      {src:"02-Db0.wav", id:"db0"},
      {src:"03-D0.wav", id:"d0"},
      {src:"04-Eb0.wav", id:"eb0"},
      {src:"05-E0.wav", id:"e0"},
      {src:"06-F0.wav", id:"f0"},
      {src:"07-Gb0.wav", id:"gb0"},
      {src:"08-G0.wav", id:"g0"},
      {src:"09-Ab0.wav", id:"ab0"},
      {src:"10-A0.wav", id:"a0"},
      {src:"11-Bb0.wav", id:"bb0"},
      {src:"12-B0.wav", id:"b0"},
      {src:"13-C1.wav", id:"c1"},
      {src:"14-Cb1.wav", id:"cb1"},
      {src:"15-D1.wav", id:"d1"},
      {src:"16-Eb1.wav", id:"eb1"},
      {src:"17-E1.wav", id:"e1"},
      {src:"18-F1.wav", id:"f1"},
      {src:"19-Gb1.wav", id:"gb1"},
      {src:"20-G1.wav", id:"g1"},
      {src:"21-Ab1.wav", id:"ab1"},
      {src:"22-A1.wav", id:"a1"},
    ],
  notes: ["c0","db0","d0","eb0","e0","f0","gb0","g0","ab0","a0","bb0","b0","c1","cb1","d1","eb1","e1","f1","gb1","g1","ab1","a1"],
  assetsPath: "src/client/audio/water_drop/"
}

var classic_guitar = {
  name:'Classic Guitar',
  instance: null,
  source: [
      {src:"c3_mf_rr3.wav", id:"c3"},
      {src:"c3_mf_rr3.wav", id:"d3"},
      {src:"eb3_mf_rr3.wav", id:"e3"},
      {src:"gb3_mf_rr3.wav", id:"g3"},
      {src:"a3_mf_rr3.wav", id:"a3"},
      {src:"c4_mf_rr3.wav", id:"c4"},
      {src:"c4_mf_rr3.wav", id:"d4"},
      {src:"eb4_mf_rr3.wav", id:"e4"},
      {src:"gb4_mf_rr3.wav", id:"g4"},
      {src:"a4_mf_rr3.wav", id:"a4"},
      {src:"c5_mf_rr3.wav", id:"c5"},
      {src:"eb5_mf_rr3.wav", id:"d5"},
      {src:"eb5_mf_rr3.wav", id:"e5"},
      {src:"gb5_mf_rr3.wav", id:"g5"},
      {src:"a5_mf_rr3.wav", id:"a5"},
    ],
  notes: ["c3","d3","e3","g3","a3","c4","d4","e4","g4","a4","c5","d5","e5","g5","a5"],
  assetsPath: "src/client/audio/guitar/"
};

var water_flowing = {
  name:'Water Flowing',
  instance: null,
  source: [
      {src:"1_C.wav", id:"wf1c"},
      {src:"2_D.wav", id:"wf2d"},
      {src:"3_E.wav", id:"wf3e"},
      {src:"4_G.wav", id:"wf4g"},
      {src:"5_A.wav", id:"wf5a"},
    ],
  notes: ["wf1c","wf2d","wf3e","wf4g","wf5a"],
  assetsPath: "src/client/audio/water_flowing/"
};

var marimba ={
  name:'Marimba',
  instance: null,
  source: [
      {src:"01_C2.wav", id:"mac2"},
      {src:"02_D2.wav", id:"mad2"},
      {src:"03_E2.wav", id:"mae2"},
      {src:"04_G2.wav", id:"mag2"},
      {src:"05_A2.wav", id:"maa2"},
      {src:"06_C3.wav", id:"mac3"},
      {src:"07_D3.wav", id:"mad3"},
      {src:"08_E3.wav", id:"mae3"},
      {src:"09_G3.wav", id:"mag3"},
      {src:"10_A3.wav", id:"maa3"},
      {src:"11_C4.wav", id:"mac4"},
      {src:"12_D4.wav", id:"mad4"},
      {src:"13_E4.wav", id:"mae4"},
      {src:"14_G4.wav", id:"mag4"},
      {src:"15_A4.wav", id:"maa4"},
      {src:"16_C5.wav", id:"mac5"}
    ],
  notes: ["mac2","mad2","mae2","mag2","maa2","mac3","mad3","mae3","mag3","maa3","mac4","mad4","mae4","mag4","maa4","mac5"],
  assetsPath: "src/client/audio/marimba/"

}

createjs.Sound.alternateExtensions = ["wav"];	// add other extensions to try loading if the src file extension is not supported
createjs.Sound.addEventListener("fileload", function(event) {

}); // add an event listener for when load is completed


//Adding Sounds: STEP 2
wood_block.sounds = createjs.Sound.registerSounds(wood_block.source, wood_block.assetsPath);
water_drop.sounds = createjs.Sound.registerSounds(water_drop.source, water_drop.assetsPath);
classic_guitar.sounds = createjs.Sound.registerSounds(classic_guitar.source, classic_guitar.assetsPath);
water_flowing.sounds = createjs.Sound.registerSounds(water_flowing.source, water_flowing.assetsPath);
marimba.sounds = createjs.Sound.registerSounds(marimba.source, marimba.assetsPath);

//Adding Sounds: STEP 3
const instrumentTypeList = {classic_guitar:'Classic Guitar', water_drop:'Water Drop', wood_block:'Wood Block', water_flowing:"Water Flowing", marimba:"Marimba"};
const instrumentName =['Body', 'Hands', 'Feet', 'Spine']; // Define the name of the instruments  based on their link to the body's parts
const instrumentModeList = {random:'Random', scale:'Scale'};
const instrumentChannelName ={body:'Body', hands:'Hands', feet: 'Feet'};

function bodyParam () {
  this.RWrist_Center_D = 0;
  this.LWrist_Center_D = 0;
  this.Body_Monitor_D = -1;
  this.Max_Body_Monitor_D = -1;
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

function Channel (name) {
  this.name = name;
  this.on = true;
  this.type = instrumentTypeList.classic_guitar;
  this.lastPlayedNotes= [];
  this.lastPlayedNote = null;
  this.volume = 0.2;
  this.sensitivity = 1;
  this.mode = instrumentModeList.scale;
};

var body = new Channel(instrumentChannelName.body);
var hands = new Channel(instrumentChannelName.hands);
var feet = new Channel(instrumentChannelName.feet);

class App extends Component {
    constructor(props) {
    super(props);

    this.audioContext = new AudioContext();
    this.bodyParam = null;
    this.state = {instruments:[body,hands,feet],};
    this.handleSoundPlaying = this.handleSoundPlaying.bind(this);
  }

  newBodyParameterHandle(bodyParameter){
    this.bodyParam= bodyParameter;
    this.loadInstruments(this.state.instruments)
  }

  renderMonitor(){
    console.log("Rendering");
    return(
      <ExMonitor newBodyParam={(value)=>this.newBodyParameterHandle(value)}/>
    )
  }

  loadInstruments (instruments){
      var i = 0;
      for (i=0; i<instruments.length; ++i) {
        this.prepInstrument(instruments[i]);
      }
    }

  // If Body Instrument is Off or with no volume don't play
  // Else set the channel and then use it
  prepInstrument (instrument){
    if (!instrument.on) return;
    if (instrument.volume == 0) return;
    var sounds = this.getSounds(instrument.type);
    var note = this.getNote(sounds, instrument, this.bodyParam);
    this.playInstrument(instrument, note);
  }

  //Provide the sounds sample based on the type defined by the Body Instrument
  // the sample are variable defined above. Should be a better way.....
  //MUST DO: Select the type automatically by its defintion
  getSounds (type){
    switch (type) {
      case instrumentTypeList.classic_guitar:
      return classic_guitar;
      break;
      case instrumentTypeList.water_drop:
      return water_drop;
      break;
      case instrumentTypeList.wood_block:
      return wood_block;
      break;
      case instrumentTypeList.water_flowing:
      return water_flowing;
      break;
      case instrumentTypeList.marimba:
      return marimba;
      break;
    }
  }

  //Generates random notes or redirect to the right instrument sounds generator
  getNote (sounds, instrument, bodyParam){
    var note = [];
    if (instrument.mode == instrumentModeList.random ){
      note.push(sounds.notes[Math.floor(Math.random()*sounds.notes.length)]);
      return note;
    } else {
      switch (instrument.name){
        case instrumentChannelName.body:
        note = this.generateCenterBodyNote(sounds, instrument, bodyParam);
        return note;
        break;
        case instrumentChannelName.hands:
        //As soon as you have the array of notes generate also the one for the hands
        note = this.generateWristeNote(sounds, instrument, bodyParam);
        return note;
        break;
        case instrumentChannelName.feet:
        note = this.generateFeetNote(sounds, instrument, bodyParam);
        return note;
        break;
      }
    }
  }

  generateFeetNote (sounds, instrument, bp) {
    var note = [];
    var arx = bp.ankRx;
    var ary = bp.ankRy;
    var alx = bp.ankLx;
    var aly = bp.ankLy;
    var d = Math.sqrt((arx-alx)*(arx-alx)+(ary-aly)*(ary-aly));
    var norm_d = Math.round(d/sounds.notes.length);
    //console.log('Distance from Center of Right Hands:' , d);
    //console.log('Distance from Center of Right Hands:' , Math.round(d/10));
    if(norm_d<sounds.notes.length){
      note.push(sounds.notes[norm_d]);
      } else {
        note.push((sounds.notes[(sounds.notes.length)-1]));
    }
    return note;
  }

  generateWristeNote(sounds, instrument, bp){
    //Right Wrist
    var note = [];
    var norm_d = Math.round(this.bodyParam.RWrist_Center_D/sounds.notes.length);
    //console.log('Distance from Center of Right Hands:' , d);
    //console.log('Distance from Center of Right Hands:' , Math.round(d/10));
    if(norm_d<sounds.notes.length){
      note.push(sounds.notes[norm_d]);
    } else {
      note.push((sounds.notes[(sounds.notes.length)-1]));
    }

    var norm_d = Math.round(this.bodyParam.LWrist_Center_D/sounds.notes.length);
    //console.log('Distance from Center of Right Hands:' , d);
    //console.log('Distance from Center of Right Hands:' , Math.round(d/10));
    if(norm_d<sounds.notes.length){
      note.push(sounds.notes[norm_d]);
    } else {
      note.push((sounds.notes.length)-1);
    }
    //console.log('Playing Note:' , note);
    return note;
  }

  generateWristeNoteNew(sounds, instrument, bp){
    //Right Wrist
    var note = [];

    var dist = Math.round(this.bodyParam.RWrist_Center_D*instrument.sensitivity);
    var maxDist = Math.round(bp.Max_RWrist_Center_D);
    var note_index = Math.round(((sounds.notes.length-1) * dist)/maxDist);
    //console.log('Note index:' , note_index);
    note.push(sounds.notes[note_index]);

    dist = Math.round(this.bodyParam.LWrist_Center_D*instrument.sensitivity);
    maxDist = Math.round(bp.Max_LWrist_Center_D*instrument.sensitivity);
    note_index = Math.round(((sounds.notes.length-1) * dist)/maxDist);

    return note;
  }

  generateCenterBodyNote (sounds, instrument, bodyParam){
    var bp = bodyParam;
    var note = [];
    var dist = Math.round(bp.Body_Monitor_D*instrument.sensitivity);
    var maxDist = Math.round(bp.Max_Body_Monitor_D*instrument.sensitivity);
    var note_index = Math.round(((sounds.notes.length-1) * dist)/maxDist);
    console.log('Note index:' , note_index);
    note.push(sounds.notes[note_index]);
    return note;
  }

  //All instruemts at the end plays here!!
  //If a note is already playing skip to play interval
  //Notes which are playing are stored in the Instrument.lastPlayedNote array.
  //Once the note 'complete' to play, the note is removed from the lastPlayedNote array.
  playInstrument (instrument, note){
    var that = this;
    note.forEach( function (n,index){
      if(instrument.name !== 'Bodky'){
        var i = instrument.lastPlayedNotes.indexOf(n);
        if(i<0){
          instrument.lastPlayedNotes.push(n);
          var myinstance = createjs.Sound.play(n);
          myinstance.volume = instrument.volume;
          myinstance.addEventListener("complete", createjs.proxy(that.handleSoundPlaying, that, instrument, n));
        }
      } else {
        if(instrument.lastPlayedNote !== n){
          var myinstance = createjs.Sound.play(n);
          myinstance.volume = instrument.volume;
          instrument.lastPlayedNote = n;
        }
      }
      //Skip and don't play it...probably I should accellerate the end of the play? i.e. fading out?
    });
  }

  //Play note 'complete' event handler
  handleSoundPlaying(that,instrument, note){
    var i = instrument.lastPlayedNotes.indexOf(note);
    instrument.lastPlayedNotes.splice(i,1);
  }

  render() {
    return (
      <div className="container-fluid">
      	<div className="row">
      		<div className={"col-md-12 bg-secondary"}>
            <h1 className={"text-white"}>Osmosi</h1>
          </div>
      	</div>
      	<div className={"row"}>
          <div className={"col-md-6 pr-0"}>
      		<InstrumentsPanel instruments={this.state.instruments} instrumentTypeList={instrumentTypeList}/>
          </div>
          <div className={"col-md-6 mt-3 pl-0"}>
            {this.renderMonitor()}
          </div>
        </div>
      </div>
    );
  }
}

export default App;
