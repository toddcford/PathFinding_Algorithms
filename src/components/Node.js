import React, {useState} from "react";

function Node(props) {

  const getPositionFromId = (value) => {
    
    let row = parseInt(value.match(/\d+/));
    let col = parseInt(value.match(/\d+$/));
    console.log([row,col]);
    return [row, col];
}
  const handleNodeClick = (e) => {
    let newPos = getPositionFromId(e.target.id);
    return;

  }

  return (
    <div className='grid-button-div'>
      <button className={props.isStart ? 'grid-button-start': (props.isEnd ? 'grid-button-end' : (props.isVisited ? 'grid-button-visited' : 'grid-button'))}
                     id={`button${props.row}_${props.col}`}
                onClick={(e)=>handleNodeClick(e)}>
      </button>
    </div>
  )
}

export default Node;