let positionSet = [[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0]];
let observer = null;

function emitChange() {
  observer(positionSet);
}

export function observe(o) {
  if (observer) {
    throw new Error('Multiple observers not implemented.');
  }

  observer = o;
  emitChange();
}

export function move(toX, toY, elm) {
  if(elm === 'S'){
    positionSet.forEach((item, index1)=>{
      item.forEach((data, index2)=>{
        if(data === 'S'){
          positionSet[index1][index2] = 0;
        }
      })
    });
  }
  if(elm === 'E'){
    positionSet.forEach((item, index1)=>{
      item.forEach((data, index2)=>{
        if(data === 'E'){
          positionSet[index1][index2] = 0;
        }
      })
    });
  }
  positionSet[toX][toY] = elm;
  emitChange();
}

export function canMove(toX, toY) {
  return !positionSet[toX][toY];
}

export function resolve(){
  let start = false;
  let end = false;
  positionSet.forEach((item)=>{
    item.forEach((data, index2)=>{
      if(data === 'S'){
        start = true;
      }else if(data === 'E'){
        end = true;
      }
    });
  });
  if(start && end){
    var findShortestPath = function(startCoordinates, grid) {
      var distanceFromTop = startCoordinates[0];
      var distanceFromLeft = startCoordinates[1];
      var location = {
        distanceFromTop: distanceFromTop,
        distanceFromLeft: distanceFromLeft,
        path: [],
        status: 'Start'
      };
      var queue = [location];
      while (queue.length > 0) {
        var currentLocation = queue.shift();
        var newLocation = exploreInDirection(currentLocation, 'North', grid);
        if (newLocation.status === 'E') {
          return newLocation.path;
        } else if (newLocation.status === 'Valid') {
          queue.push(newLocation);
        }
        var newLocation = exploreInDirection(currentLocation, 'East', grid);
        if (newLocation.status === 'E') {
          return newLocation.path;
        } else if (newLocation.status === 'Valid') {
          queue.push(newLocation);
        }
        var newLocation = exploreInDirection(currentLocation, 'South', grid);
        if (newLocation.status === 'E') {
          return newLocation.path;
        } else if (newLocation.status === 'Valid') {
          queue.push(newLocation);
        }
        var newLocation = exploreInDirection(currentLocation, 'West', grid);
        if (newLocation.status === 'E') {
          return newLocation.path;
        } else if (newLocation.status === 'Valid') {
          queue.push(newLocation);
        }
      }
      return false;
    };
    var locationStatus = function(location, grid) {
      var gridSize = grid.length;
      var dft = location.distanceFromTop;
      var dfl = location.distanceFromLeft;

      if (location.distanceFromLeft < 0 ||
          location.distanceFromLeft >= gridSize ||
          location.distanceFromTop < 0 ||
          location.distanceFromTop >= gridSize) {
        return 'Invalid';
      } else if (grid[dft][dfl] === 'E') {
        return 'E';
      } else if (grid[dft][dfl] !== 0) {
        return 'Blocked';
      } else {
        return 'Valid';
      }
    };
    var exploreInDirection = function(currentLocation, direction, grid) {
      var newPath = currentLocation.path.slice();
      newPath.push(direction);
      var dft = currentLocation.distanceFromTop;
      var dfl = currentLocation.distanceFromLeft;
      if (direction === 'North') {
        dft -= 1;
      } else if (direction === 'East') {
        dfl += 1;
      } else if (direction === 'South') {
        dft += 1;
      } else if (direction === 'West') {
        dfl -= 1;
      }
      var newLocation = {
        distanceFromTop: dft,
        distanceFromLeft: dfl,
        path: newPath,
        status: 'Unknown'
      };
      newLocation.status = locationStatus(newLocation, grid);
      if (newLocation.status === 'Valid') {
        grid[newLocation.distanceFromTop][newLocation.distanceFromLeft] = 'Visited';
      }
      return newLocation;
    };
    let startP = [0,0];
    positionSet.forEach((item, index1)=>{
      item.forEach((data, index2)=>{
        if(data === 'S'){
          startP = [index1, index2]
        }
      })
    });
    let result = findShortestPath(startP, positionSet);
    return result;
  }else{
    alert('Assign both start location and end location');
  }
}

export function clearGrid(){
  positionSet = [[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0]];
  emitChange();
}
