import React, { Component } from 'react';
import { ItemTypes } from '../functions/constants';
import { DragSource } from 'react-dnd';

const locationSource = {
  beginDrag(props) {
    return {
      elm: props.text
    };
  },
};

function collect(connect, monitor) {
  return {
    connectDragSource: connect.dragSource(),
    isDragging: monitor.isDragging()
  }
}

@DragSource(ItemTypes.START, locationSource, collect)
export default class Location extends Component {
  render(){
    const { connectDragSource, isDragging, text } = this.props;
    if(text == 'Visited'){
      return null;
    }
    return connectDragSource(
      <div className="locations">
        {text}
      </div>
    )
  }
}
