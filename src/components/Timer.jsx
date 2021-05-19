import React, { useRef, useEffect, useState } from 'react';

export const Timer = (props) => {

    const [time, setTime] = useState(props.time);
    const [active, setActive] = useState(props.autostart);

    let interval = useRef();

    useEffect(() => {
        interval.current = setInterval(() => {
            if(active && time > 0) {
                setTime( time - props.step);
                props.onTick(time);
            } else if(active && time === 0) {
                setTime(props.time);
                setActive(false)
                clearInterval(interval.current);
            } else if(!active && time === 0 ) {
                setTime(props.time)
            } else {
                setTime(time)
            }
        }, props.step * 1000);

        return (() => {
            if (interval.current) {
                clearInterval(interval.current);
            }
        })
    }, [time, active, props]);

    const toggle = () => {
        active ?  setActive(false) : setActive(true);
    };

    const clock = time => {
        let minutes = Math.floor(time / 60);
        let seconds = time % 60;

        if (minutes < 10) {
            minutes = '0' + minutes;
        }
        if(seconds < 10) {
            seconds = '0' + seconds;
        }

        return `${minutes}:${seconds}`;
    }

    return(
        <div>
            <div> {clock(time)} </div>
            <button onClick={toggle} > { active ? 'stop' : 'start'} </button>
        </div>
    )
}