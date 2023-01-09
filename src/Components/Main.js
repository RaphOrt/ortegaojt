import React, { Component, useState, useEffect, useRef } from 'react';
import posts from '../MOCK_DATA.json';
import dragimg from './image/drag.png';


function Main({ appData, maintoApp }) {
    const [checked, setChecked] = useState([]);
    const [referenceNum, setRefNum] = useState(0);
    // const [toggle, setToggle] = useState(true);
    var ref = useRef([]);
    var refdiv = useRef([]);
    const handleCheck = (event) => {
        var updatedList = [...checked];
        if (event.target.checked) {
            updatedList = [...checked, event.target.value];
        } else {
            updatedList.splice(checked.indexOf(event.target.value), 1);
        }
        setChecked(updatedList);

    };
    if (maintoApp != referenceNum) {

        setRefNum(1 + referenceNum)
        var reflength = ref.current.length;
        var length = checked.length;

        ref.current.pop();

        for (let i = 0; i < reflength - length; i++) {
            ref.current[i].checked = false;
        }
    }
    function togglecontent({ key }, { data }) {
        // setToggle(!toggle);
        var toggle = data.toggle;
        if (toggle == true) {
            data.toggle = false;
            refdiv.current[key].style.display = 'block'
        } else {
            data.toggle = true;
            refdiv.current[key].style.display = 'none'
        }
        console.log(toggle)

        console.log(refdiv.current[key])

    }
    // const togglecontent = (event) => {
    //     console.log(event.id)
    //     console.log(event)
    // }

    useEffect(() => {
        appData(checked);

    })

    return (
        <div>
            {posts.map((data, key) => {
                return (
                    <div className='card' id={key} key={key}>
                        <div className='drag'>
                            <img className='dragicon' src={dragimg}></img>
                        </div>
                        <div className='checkboxCont'>
                            <div className='control-group'>
                                <label class="control control-checkbox">
                                    <input className='checkboxes' id="checkboxes" type="checkbox" ref={(e) => { ref.current[key] = e }} value={key} onChange={handleCheck} />
                                    <div class="control_indicator"></div>
                                </label>
                            </div>
                        </div>
                        <div className='activeCircle'>
                            <div className='circle'></div>
                        </div>

                        <a className='entry' key={key} onClick={() => togglecontent({ key }, { data })}>
                            <div className='dateIcon'>
                                <strong className='dateNum'>
                                    {new Date(data.date).getDate()}
                                </strong>
                                <small className='txtCont'>
                                    {new Date(data.date).toLocaleString('default', { month: 'short' })}
                                </small>
                            </div>
                            <div className='circleCont'>
                                <div className='circle2'>
                                    <bold className='ta'>
                                        TA
                                    </bold>
                                </div>
                            </div>
                            <div className='subjCont'>
                                <strong className='subject'>
                                    Fwd: {data.email_subject}
                                </strong>
                                <div className='subSubj'>
                                    <small>{data.senderF} {data.senderL}</small> <small className='greySub'> &lt; {data.email} &gt; {new Date(data.date).toLocaleString('default', { month: 'long', day: '2-digit', year: 'numeric' })} at {data.time}</small>
                                </div>
                            </div>

                        </a>
                        <div className='contentCont' ref={(e) => { refdiv.current[key] = e }} style={{ display: 'none' }}>
                            <hr class="dashedHR" />
                            <div>
                                <strong>{data.senderF} {data.senderL}</strong>
                            </div>
                            <div>
                                <small className='greySub'>{new Date(data.date).toLocaleString('default', { month: 'long', day: '2-digit', year: 'numeric' })} at {data.time}</small>
                            </div>
                            {data.content}
                        </div>


                    </div>
                )
            }, 1000)}

        </div>
    )

}


export default Main;
