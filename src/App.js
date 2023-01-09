import React, { useState, useEffect, useReducer } from 'react';
import './App.css';
import posts from './MOCK_DATA.json';
import Main from './Components/Main.js';
import saveimg from './Components/image/save.png';
import filterimg from './Components/image/filters.png';
import deleteimg from './Components/image/delete.png';
import arrowimg from './Components/image/down-arrow.png';


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

      <div className='navBar'>
        <nav>
          <input type="checkbox"></input>
          <a className='nav-item save'>SAVE <img src={saveimg} /></a>
          <a className='nav-item manage'>MANAGE FILTERS <img src={filterimg} /></a>
          <a>  |  </a>
          <a className='nav-item delete' id='delete' onClick={deletearr}>DELETE <img src={deleteimg} /></a>
          <div className='paging'>
            <small>
              <a>&lt;     </a>100 of 100<a>     &gt;</a>
            </small>
          </div>
        </nav>
      </div>
      <div className='status'>

        <small className='unread'>Unread</small>
        <div className='circle3'>100<img className='arrowimg' src={arrowimg} /></div>
      </div>
      <Main appData={AppData} maintoApp={update} />
    </div>
  );
}

export default App;
