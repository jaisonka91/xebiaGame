import React, { Component } from 'react';

export default class LocationComponent extends Component {
  render(){
    const { text } = this.props;
    if(text){
      return(
        <div className="locations">
          {text}
        </div>
      )
    }
  }
}
