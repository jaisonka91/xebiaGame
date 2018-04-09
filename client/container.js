import React, { Component } from 'react';
import Location from './components/locations';
import Square from './components/square';
import { move, resolve, clearGrid } from './functions/game';
import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';

@DragDropContext(HTML5Backend)
export default class App extends Component {

  constructor(props){
    super();
    this.state = {
      buttonDis: false,
      solution: true,
      positionSet: props.positionSet,
      pathArray: []
    }
  }

  componentWillReceiveProps(nextProps){
    this.setState({positionSet: nextProps.positionSet});
  }


  handleSquareClick(toX, toY) {
    move(toX, toY);
  }

  renderSquare(i) {
    const { positionSet, pathArray } = this.state;
    const x = i % 5;
    const y = Math.floor(i / 5);
    const elm = positionSet[x][y];
    const piece = elm ? <Location text={elm}/> : null;
    let fill = false;
    pathArray.find(function(currentValue, index, arr){
      if(currentValue[0] == y && currentValue[1] == x){
        fill = true;
      }
    })
    return (
     <div key={i} style={{ width: '20%', height: '20%' }}>
       <Square x={x} y={y} fill={fill}>
         {piece}
       </Square>
     </div>
   );
 }

 handleResolve = () =>{
   let result = resolve();
   if(result === false){
     this.setState({solution: false, buttonDis: true});
   }else{
     let { positionSet } = this.props;
     let start = [];
     let pathArray = [];
     positionSet.forEach((item, index1)=>{
       item.forEach((data, index2)=>{
         if(data == 'S'){
           start = [index1, index2];
         }
       })
     });
     pathArray.push([start[1], start[0]]);
     result.forEach((data, index)=>{
       if(data == 'South'){
         pathArray.push([pathArray[index][0], pathArray[index][1] + 1]);
       }else if(data == 'East'){
         pathArray.push([pathArray[index][0] + 1, pathArray[index][1]]);
       }else if(data == 'North'){
         pathArray.push([pathArray[index][0], pathArray[index][1] - 1]);
       }else if(data == 'West'){
         pathArray.push([pathArray[index][0] - 1, pathArray[index][1]]);
       }
     });
     this.setState({pathArray, buttonDis: true})
   }
 }

 handleClear = () => {
   clearGrid();
   this.setState({solution: true, pathArray: [], buttonDis: false});
 }

 render(){
   const squares = [];
   for (let i = 0; i < 25; i++) {
     squares.push(this.renderSquare(i));
   }
   return(
      <div className="container">
        <div style={{marginBottom: 20}}>
          <div className="block">
            <span>Start point, Only one allowed.</span>
            <Location text={"S"}/>
          </div>
          <div className="block">
            <span>End point, Only one allowed.</span>
            <Location text={"E"}/>
          </div>
          <div className="block">
            <span>Boulder, Multiple allowed.</span>
            <Location text={"B"}/>
          </div>
          {/* <Location text={"G"}/>
          <Location text={"WE"}/>
          <Location text={"WX"}/> */}
        </div>
        <div>
          <span>Drag and Drop items to grid.</span>
        </div>
        <div>
          <button onClick={this.handleResolve} disabled={this.state.buttonDis} className="buttonClick">Resolve</button>
          <button onClick={this.handleClear}>Clear Grid</button>
        </div>
        <div style={{textAlign: 'center'}}>
          {!this.state.solution && <span style={{color: '#e74c3c', fontSize: 17}}> No solution </span>}
        </div>
        <div className="warp-box">
          {squares}
        </div>
      </div>
    )
  }
}
