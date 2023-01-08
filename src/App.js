import React, { useState, useEffect, useReducer } from 'react';
import './App.css';
import posts from './MOCK_DATA.json';
import Main from './Components/Main.js';
import saveimg from './Components/image/save.png';


function App() {
  const [data, setdata] = useState([]);
  const [update, forceUpdate] = useReducer(x => x + 1, 0);
  const [datalength, setlength] = useState(0);

  const deletearr = (e) => {

    var Delindex = 0;
    data.forEach(id => {

      var delnum = id - Delindex;

      posts.splice(delnum, 1);
      Delindex++;
    })
    Delindex = 0;

    forceUpdate()

  }

  const AppData = (e) => {
    setdata(e)
    // console.log(setref)
  }


  return (
    <div className="App">

      <div>
        <nav>
          <input type="checkbox"></input>
          <a className='nav-item save'>Save<img src={saveimg} /></a>
          <a className='nav-item'>Manage Filters</a>
          <a>  |  </a>
          <a className='nav-item' id='delete' onClick={deletearr}>Delete</a>
        </nav>
      </div>
      <hr></hr>
      <small>Unread</small>
      <Main appData={AppData} maintoApp={update} />
    </div>
  );
}

export default App;
