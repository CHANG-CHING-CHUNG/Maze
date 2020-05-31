
const lines3 = ['13 8',
'...##########',
'##........###',
'#########.###',
'...#...##.###',
'.#.#.#.##.###',
'.#...#....###',
'.############',
'.............'];

const lines4 = ['18 9',
              '...##########....#',
              '##........###.##.#',
              '#########.###.##.#',
              '...#...##.###.##.#',
              '.#.#.#.##.###.##.#',
              '.#...#....###.##.#',
              '.############.##.#',
              '..............##.#',
              '################..'];
              
              
const lines2 = ['5 5','...##','##.##','##...','####.','####.'];
const lines = ['6 5','.#####','.#####','.#####','.#####','......'];


function resolveMaze(lines) {

  
    let wAndH = lines.shift();
    wAndH = wAndH.split(' ');
    
    let [w, h] = wAndH;
    w = Number(w);
    h = Number(h);
    let nestedArr =   lines.map(item => {
      let a = [];
      a.push(item);
      return a;
    })
    
    nestedArr = nestedArr.map(item => {
      return item[0].split("");
    })
    
    let blockStart = [];
    let blockEnd = [];
  
    for(let i = 0; i < w; i++){
      blockStart.push('#');
      blockEnd.push('#');
    }
    
    nestedArr.splice(0, 0, blockStart)
    nestedArr.splice(h+1, 0, blockEnd);
    
    nestedArr.forEach(item => {
      item.unshift('#');
      item.push('#');
    })
  
    let roadCoordinates = [];
    
    function findRoad(arr = [], h = 0, w = 0, road) {
    
      const checkUp = (arr, h, w) => {
        if(arr[h-1][w] === '.') {
          return true;
        } else {
          return false;
        }
      }
    
      const checkRight = (arr, h, w) => {
        if(arr[h][w+1] === '.') {
          return true;
        } else {
          return false;
        }
      }
      const checkDown = (arr, h, w) => {
        if(arr[h+1][w] === '.') {
          return true;
        } else {
          return false;
        }
      }
      const checkLeft = (arr, h, w) => {
        if(arr[h][w-1] === '.') {
          return true;
        } else {
          return false;
        }
      }
    
      if(arr[h] != 'undefined') {
    
        if(arr[h][w] === '.') {
    
          if(checkUp(arr, h, w)) {
            arr[h][w] = '1';
            road.push([w,h])
            findRoad(arr, h-1, w, road);
          } else if(checkRight(arr, h, w)) {
            arr[h][w] = '1'
            road.push([w,h])
            findRoad(arr, h, w+1, road);
          } else if(checkDown(arr, h, w)) {
            arr[h][w] = '1'
            road.push([w,h])
            findRoad(arr, h+1, w, road);
          } else if(checkLeft(arr, h, w)) {
            arr[h][w] = '1'
            road.push([w,h])
            findRoad(arr, h, w-1, road);
          } else if(arr[h][w] === '.') {
            arr[h][w] ='1';
            road.push([w,h])
          }
    
    
        } else {
          console.log('Wrong')
        }
        
      }
    
    }
    
    findRoad(nestedArr, 1, 1, roadCoordinates)
    
    nestedArr.pop();
    nestedArr.shift()
    nestedArr.forEach(item => {
    item.pop();
    item.shift()
    })
  
    roadCoordinates.pop();
    console.log(roadCoordinates.length)
    console.log(nestedArr)
  
  
  
  function createMaze(arr,w,h) {
    const maze = document.querySelector('#maze');
    for(let k = 0; k < h; k++) {
      const div = document.createElement('div');
      for(let i = 0; i < w; i++) {
        const span = document.createElement('span');
        if(k === 0 && i === 0) {
          span.textContent = 'Start';
          span.style.cssText = 'color: red';
        } else if(k === h-1 && i === w-1) {
          span.textContent = 'End';
          span.style.cssText = 'color: red';
        } else if(arr[k][i] === '1'){
          span.textContent = arr[k][i];
          span.style.cssText = 'color: #fff';
        } else if(arr[k][i] === '#'){
          span.textContent = arr[k][i];
          span.style.cssText = 'color: black';
        } else {
          span.textContent = '#';
          span.style.cssText = 'color: black';
        }
        div.appendChild(span)
        maze.appendChild(div);
      }
  
    }
  
  }
  
  createMaze(nestedArr,w,h)
}

const btn = document.querySelector('#btn');

btn.addEventListener('click', () => {
  let span = document.querySelectorAll('#maze span');
  span = Array.from(span);
  span.forEach(item => {
    item.remove()
  })
  const inputMaze = document.querySelector('#inputMaze');
  let maze = inputMaze.value;
  maze = maze.split('\n');
  resolveMaze(maze);
})