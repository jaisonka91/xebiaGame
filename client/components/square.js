import React, { Component } from 'react';
import { findDOMNode } from 'react-dom';
import { move, canMove } from '../functions/game';
import { ItemTypes } from '../functions/constants';
import { DropTarget } from 'react-dnd';
import SquareComponent from './squareComponent';

const squareTarget = {
  drop(props, monitor, component) {
    move(props.x, props.y, monitor.getItem().elm);
  },
  canDrop(props, monitor) {
    return canMove(props.x, props.y);
  }
};

function collect(connect, monitor) {
  return {
    connectDropTarget: connect.dropTarget(),
    isOver: monitor.isOver()
  };
}

@DropTarget(ItemTypes.START, squareTarget, collect)
export default class Square extends Component {

  render() {

    const { connectDropTarget, isOver, fill } = this.props;
    return connectDropTarget(
      <div style={{height: '100%', width: '100%'}}>
        <SquareComponent fill={fill}>
          {this.props.children}
        </SquareComponent>
      </div>
    )
  }
}
