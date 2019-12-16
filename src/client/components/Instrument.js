// One for
// - Only Hands
// - Spine
// - Full Body
// - Only Feet
//
// Each one controlls
// - Type of instrument
// - Volume
// - On and Off
// - Sensitivity
// - Effetc


import React, { Component } from 'react';
import ReactDOM from 'react-dom';

import OnOff from '../commons/switch.js';
import InstrumentSelector from '../commons/instrumentSelector.js';
import NoteSelector from '../commons/noteSelector.js';
import ModeSelector from '../commons/modeSelector.js';
import VolumeSelector from '../commons/volumeSelector.js';
import SensitivitySelector from '../commons/sensitivitySelector.js';
import SoundSource from './SoundSource.js';

class Instrument extends Component {
  constructor(props){
      super(props);
      this.onChangeSensitivityHandler = this.onChangeSensitivityHandler.bind(this);
      this.onChangeVolumeHandler = this.onChangeVolumeHandler.bind(this);
      this.onChangeNoteHandler = this.onChangeNoteHandler.bind(this);
      this.onChangeModeHandler = this.onChangeModeHandler.bind(this);
      this.onChangeInstrumentHandler = this.onChangeInstrumentHandler.bind(this);
      this.onOnOffHandler = this.onOnOffHandler.bind(this);
    }

  //// Triggered by the volume selector
  onChangeSensitivityHandler(e, value){
    this.props.onChangeSensitivity(value);
  }

  // Triggered by the volume selector
  onChangeVolumeHandler(e, value){
    this.props.onChangeVolume(value);
  }

  // Triggered by the note selector
  onChangeNoteHandler(e){
    this.props.onChangeNote(e.target.value);
  }

  onChangeModeHandler(e){
    this.props.onChangeMode(e.target.value);
  }

  // Triggered by the instrument selector
  onChangeInstrumentHandler(e){
    this.props.onChangeInstrument(e.target.value);
  }

  // Triggered by the Switch on/of selector
  onOnOffHandler(e){
    this.props.onOnOff(e.target.checked);
  }


  render() {
    return (
      <div className={"col-12 pt-1"}>
          <ul className={"list-group border-0 p-0"}>
            <li className={"list-group-item bg-secondary text-white p-0 rounded-0"}>
              <div className={"row"}>
                <div className={"col-md-3 pr-10"}>
                  {this.props.instrument.name}
                </div>
              </div>
            </li>
            <li className={"list-group-item border-0"}>
              <div className={"row mb-2"}>
                <div className={"col-md-1 mt-3 p-0"}>
                  <OnOff
                    onChange={()=> this.onOnOffHandler}
                    value={this.props.instrument.on}
                  />
                </div>
                <div className={"col-md-5 d-block"}>
                  <InstrumentSelector
                  onChange={()=> this.onChangeInstrumentHandler}
                  value={this.props.instrument.type}/>
                </div>
                <div className={"col-md-5"}>
                  <ModeSelector
                  onChange={()=>this.onChangeModeHandler}
                  value={this.props.instrument.mode}/>
                </div>
              </div>
            </li>
            <li className={"list-group-item ml-5 border-0 p-0"}>
              <div className={"row ml-4"}>
                <div className={"col-md-5 ml-5"}>
                  <VolumeSelector
                  onChangeCommitted={()=>this.onChangeVolumeHandler}
                  value={this.props.instrument.volume*10}/>
                </div>
                <div className={"col-md-5 ml-4"}>
                  <SensitivitySelector
                  onChangeCommitted={()=>this.onChangeSensitivityHandler}
                  value={this.props.instrument.sensitivity}/>
                </div>
              </div>
            </li>
          </ul>
      </div>
      )
    }
}

export default Instrument;
