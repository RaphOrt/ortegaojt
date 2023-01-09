import React, { Component, useState, useEffect, useRef } from 'react';
import posts from '../MOCK_DATA.json';
import dragimg from './image/drag.png';
import downimg from './image/down.png';
import clockimg from './image/clock.png';


function Main({ appData, maintoApp }) {
    const [checked, setChecked] = useState([]);
    const [referenceNum, setRefNum] = useState(0);


    var ref = useRef([]);
    var refdiv = useRef([]);
    var arrowref = useRef([]);
    var tagsref = useRef([]);
    var timeref = useRef([]);
    // var timekey = useRef([]);

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
            arrowref.current[key].style.transform = 'rotate(0deg)'
            tagsref.current[key].style.display = 'none'
        } else {
            data.toggle = true;
            refdiv.current[key].style.display = 'none'
            arrowref.current[key].style.transform = 'rotate(-90deg)'
            tagsref.current[key].style.display = 'block'
        }


    }

    const GetTime = (date, time) => {
        const timenow = new Date();
        var timepast = new Date(date)
        var elapSec = timenow - timepast;
        let elapstime = Math.floor(elapSec / (1000 * 60 * 60 * 24));
        var timepassed;
        if (elapstime == 1) {
            timepassed = elapstime + " day."
        } else {
            timepassed = elapstime + " days."
        }
        return (timepassed)
    }


    useEffect(() => {
        appData(checked);

    })

    return (
        <div>
            {posts.map((data, key) => {
                return (
                    <div className='card' id={key} key={key}>
                        <div className='carditemsCont'>

                            <div className='drag'>
                                <img className='dragicon' src={dragimg}></img>
                            </div>
                            <div className='checkboxCont'>
                                <div className='control-group'>
                                    <label className="control control-checkbox">
                                        <input className='checkboxes' id="checkboxes" type="checkbox" ref={(e) => { ref.current[key] = e }} value={key} onChange={handleCheck} />
                                        <div className="control_indicator"></div>
                                    </label>
                                </div>
                            </div>
                            <div className='activeCircle'>
                                <div className='circle'></div>
                            </div>

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
                                    <small className='ta'>
                                        TA
                                    </small>
                                </div>
                            </div>
                            <div className='subjCont'>
                                <strong className='subject'>
                                    Fwd: {data.email_subject.charAt(0).toUpperCase() + data.email_subject.slice(1)}

                                </strong>
                                <div className='subSubj'>
                                    <small>{data.senderF} {data.senderL}</small> <small className='greySub'> &lt; {data.email} &gt; {new Date(data.date).toLocaleString('default', { month: 'long', day: '2-digit', year: 'numeric' })} at {data.time}</small>
                                </div>
                            </div>
                            <div className='dropdown' ref={(e) => { arrowref.current[key] = e }}> <img src={downimg}></img></div>
                            <div className='datetime' ref={(e) => { timeref.current[key] = e; }} ><img className='clock' src={clockimg} /> <small>{GetTime(data.date, data.time)}</small></div>
                            <div className='tags' ref={(e) => { tagsref.current[key] = e }}><small className='tagCont'><small className='tagItem'>{data.tag1}</small><small></small> <small className='tagItem'>{data.tag2}</small> <small className='tagItem'>1+</small></small></div>

                        </a>
                        <div className='contentCont' ref={(e) => { refdiv.current[key] = e }} style={{ display: 'none' }}>
                            <hr className="dashedHR" />
                            <div>
                                <strong>{data.senderF} {data.senderL}</strong>
                                <div className='tags2'><small><small className='tagItem'>{data.tag1}</small> <small className='tagItem'>{data.tag2}</small> <small className='tagItem'>{data.tags3}</small></small></div>

                            </div>
                            <div>
                                <small className='greySub'>{new Date(data.date).toLocaleString('default', { month: 'long', day: '2-digit', year: 'numeric' })} at {data.time}</small>
                            </div>
                            <small>-------- Forward message --------</small>
                            <div><small>From: <strong>{data.senderF} {data.senderL}</strong> &lt; <a href={"mailto:" + data.email}>{data.email}</a> &gt;</small></div>
                            <div><small>Date: {new Date(data.date).toLocaleString('default', { weekday: 'short', month: 'long', day: '2-digit', year: 'numeric' })} at {data.time}</small></div>
                            <div><small>Subject: {data.email_subject.charAt(0).toUpperCase() + data.email_subject.slice(1)}</small></div>
                            <div><small>To: Raphael Mardean Ortega &lt; <a href={"mailto:raphaelmardean.ortega.cics@ust.edu.ph"}>raphaelmardean.ortega.cics@ust.edu.ph</a> &gt;</small></div>
                            <div>

                                {data.content}
                            </div>
                        </div>


                    </div>
                )
            }, 1000)}

        </div>
    )

}


export default Main;
