import './App.css';
import react, {useState, useEffect} from 'react'
import Node from './components/Node';
import ContentGrid from './components/ContentGrid'
import Navbar from './components/Navbar'

let windWidth = window.innerWidth;
let windHeight = window.innerHeight;
let cols = Math.floor(windWidth / 24);
let rows = Math.floor(windHeight / 28);
let currentAlgo = 'Dijkstra';


const changeAlgo = (algo) => {
  currentAlgo = algo;
  console.log("changing algo")
  let menu_item = document.querySelector('#algo-dropdown');
  menu_item.innerHTML = `${algo}`;
  console.log(algo);
}

function App() {
  const [nodes, setNodes] = useState([]);
  let grid = [];
  let START_ROW = 15;
  let START_COL = 30;
  const FINISH_ROW = 1;
  const FINISH_COL = 1;

  const onMouseDown = () => {

  }

  const createNode = (row, col) => {
    return {
      row,
      col,
      isStart: row === START_ROW && col === START_COL,
      isFinish: row === FINISH_ROW && col === FINISH_COL,
      distance: Infinity,
      isVisited: false,
      isWall: false,
      previousNode: null,
    }
  }
  
  const createInitialGrid = () => {
    for (let i = 0; i < rows; i++) { 
      const currentRow = []
      for(let j = 0; j < cols; j++) { 
        currentRow.push(createNode(i,j));
      }
      grid.push(currentRow);
    }
    return grid;
  }

  const updateGridWithWall = (grid, row, col) => {
    const newGrid = grid.slice();
    const node = newGrid[row][col];
    const newNode = {
      ...node,
      isWall: !node.isWall,
    };
    newGrid[row][col] = newNode;
    return newGrid;
  };

  const animatePath = (shortestPath) => {
    for (let i = 1; i < shortestPath.length-1; i++) {
      setTimeout(() => {
        const node = shortestPath[i];
        document.getElementById(`button${node.row}_${node.col}`).className='grid-button-path';
      }, i * 50)
    }
  }

  const animateGrid = (nodesToAnimate, shortestPath) => {
    for (let i = 1; i < nodesToAnimate.length-1; i++) {
      if (i === nodesToAnimate.length-2) {        
        setTimeout(() => {
          animatePath(shortestPath);
        }, 10 * i)
      }
      setTimeout(() => {
        const node = nodesToAnimate[i];
        console.log(node)
        document.getElementById(`button${node.row}_${node.col}`).className='grid-button-visited'
      }, i * 10) 
    } 

  }

  const getNeighbors = (current_node) => {
    
    let neighbors = [];
    if (current_node.row - 1 >= 0 ) {
      const bottom_neighbor = nodes[current_node.row-1][current_node.col];
      neighbors.push(bottom_neighbor);
    }
    if (current_node.row + 1 < rows) {
      const top_neighbor = nodes[current_node.row+1][current_node.col];
      neighbors.push(top_neighbor);
    }
    if (current_node.col + 1 < cols) {
      const right_neighbor = nodes[current_node.row][current_node.col+1];
      neighbors.push(right_neighbor)
    }
    if (current_node.col - 1 >= 0) {
      const left_neighbor = nodes[current_node.row][current_node.col-1];
      neighbors.push(left_neighbor)
    }
    neighbors = neighbors.filter(neighbor => neighbor.isVisited === false);
    return neighbors;
  }

  const sortNodes = (node_list) => {
    return node_list.sort((node1, node2) => node1.distance - node2.distance)
  }

  const updateNeighbors = (current_node, grid) => {
    const neighbors = getNeighbors(current_node);
    for (const neighbor of neighbors) {
      neighbor.distance = current_node.distance + 1;
      neighbor.previousNode = current_node;
    }
  }
  function getNodes(grid) {
    const all_nodes = [];
    for (const row of grid) {
      for (const node of row) {
        all_nodes.push(node);
      }
    }
    return all_nodes;
  }

  const dijkstra = (all_nodes, start_node, end_node) => {
    const inOrderNodes = [];
    start_node.distance = 0;
    const unvisitedNodes = getNodes(all_nodes);
    
    while (!!unvisitedNodes.length) {
      sortNodes(unvisitedNodes);
      const closest = unvisitedNodes.shift();
      closest.isVisited = true;
      if (closest.distance === Infinity) return inOrderNodes;
      inOrderNodes.push(closest);
      if (closest === end_node) return inOrderNodes;
      updateNeighbors(closest, all_nodes);
    }    
  }

  const getShortestPath = (finish_node) => {
    let shortestPath = [];
    let current_node = finish_node;
    while (current_node !== null) {
      shortestPath.unshift(current_node)
      current_node = current_node.previousNode;
    }
    return shortestPath;
  }
  
  const visualizeAlgorithm = () => {
    const startNode  = nodes[START_ROW][START_COL]
    const finishNode = nodes[FINISH_ROW][FINISH_COL]
    const inOrderNodes = dijkstra(nodes,startNode, finishNode)
    const shortestPath = getShortestPath(finishNode);
    animateGrid(inOrderNodes, shortestPath);
  }

  useEffect(() => {
    const grid = createInitialGrid();
    setNodes(grid);  
  }, [])

  return (
    <div className="App">
      <Navbar visualizeAlgorithm={visualizeAlgorithm} changeAlgo={changeAlgo} currentAlgo={currentAlgo} />
      <ContentGrid nodes={nodes} />      
    </div>
  );
}

export default App;
