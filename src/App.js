import React, { Component } from 'react';
import './App.css';

import click1 from './sounds/click1.wav';
import click2 from './sounds/click2.wav';

class App extends Component {
  constructor(){
    super();

    this.state={
      playing: false,
      bpm: 100,
      count: 0,
      beatsPerMeasure: 4,
    }

    this.click1 = new Audio(click1);
    this.click2 = new Audio(click2);
  }

  handleBpmChange =(event) =>{
    if(this.state.playing){
      clearInterval(this.timer);
      this.timer = setInterval(
        this.playClick, 
        (60 / this.state.bpm) * 1000
      );

      this.setState({
        bpm : event.target.value,
        count: 0,
      });
    }else{
      this.setState({bpm: event.target.value});
    }


  }

  startStop = () =>{

    if(this.state.playing){
      clearInterval(this.timer);
      this.setState({
        playing: false,
      });
    }else{
      this.timer = setInterval(
        this.playClick,
        (60 / this.state.bpm) * 1000
      );
      this.setState({
        count: 0,
        playing: true,

      }, this.playClick);
    }

  }

  playClick = () =>{
    const {count, beatsPerMeasure} = this.state;

    if(count % beatsPerMeasure === 0){
      this.click2.play();
    }else{
      this.click1.play();
    }

    this.setState(() =>({
      count: (count + 1) % beatsPerMeasure,
    }));
    
  }

  render() {
    const {playing, bpm} = this.state;
    return (
      <div className="metronome">
        <div className="bpm-slider">
          <div>
            {bpm} BPM
          </div>
          <input 
            type="range" 
            min="60" 
            max="240" 
            value={bpm} 
            onChange={this.handleBpmChange}
          />
        </div>
        <button onClick={this.startStop}>{playing? 'Stop': 'Start'}</button>
      </div>
    );
  }
}

export default App;
