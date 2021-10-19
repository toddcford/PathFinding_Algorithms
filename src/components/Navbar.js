import react from 'react';

export default function Navbar(props) {

  return (
    <nav class="navbar navbar-expand-lg bg-light navbar-light">
    <div className="container">
      <a href="#" className="navbar-brand">Path Finding Algorithms</a>

      <div className="dropdown show">
        <a className="btn btn-secondary dropdown-toggle" role="button" id="dropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
          Choose Algorithm
        </a>
        <div className="dropdown-menu" aria-labelledby="dropdownMenuLink" data-toggle="dropdown">
          <a id="Dijkstra" className="dropdown-item" onClick={(e)=>props.changeAlgo(e.target.innerHTML)}>Dijkstra</a>
          {/* <a id="DFS" className="dropdown-item" onClick={(e)=>changeAlgo(e.target.innerHTML)}>Depth First Search</a> */}
          
        </div>
        <a id="algo-dropdown">{props.currentAlgo}</a>
      </div>
    <button className='btn btn-primary btn-md' onClick={()=>props.visualizeAlgorithm()}> Run Visualization </button>          
    </div>        
  </nav>
  )
}