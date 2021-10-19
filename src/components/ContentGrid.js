import react, {useState, useEffect} from 'react';
import Node from './Node'

export default function ContentGrid(props) {
  const nodes = props.nodes;

  return (
    <div className='grid-wrapper'>
    <div id="grid-container">
      {nodes.map((nodeRow, nodeRowIdx) => {
        return (
          <div key={nodeRowIdx}>
            {nodeRow.map((node,nodeIdx) => {
              const {row, col, isStart, isFinish, isVisited, previousNode} = node;
              return (
                <Node 
                  key={nodeIdx} 
                  row={row}
                  col={col}
                  isStart={isStart}
                  isEnd={isFinish}
                  isVisited={isVisited}
                  previousNode={previousNode}
                  />
              )
            })}
          </div>
          )}
        )
      }
    </div> 
    
  </div>
  )

}