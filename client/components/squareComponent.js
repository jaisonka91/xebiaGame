import React, { Component } from 'react';

export default class SquareComponent extends Component {
  render(){
    const { fill } = this.props;
    return(
      <div className="square" style={{background: fill?'#2ecc71':'#fff'}}>
        {this.props.children}
      </div>
    )
  }
}
