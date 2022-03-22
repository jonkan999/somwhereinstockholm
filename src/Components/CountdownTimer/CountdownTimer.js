import {useState,useEffect} from 'react';


const CountdownTimer = ({countdownTimestampMs,showScore}) => {

    var [seconds, setSeconds] = useState(countdownTimestampMs);
    console.log(showScore)
    
    useEffect(( ) => {
        const intervalId = setInterval(() => {
            updateRemainingTime()
        }, 1000);
        return () => clearInterval(intervalId);
    },[])
    

    function updateRemainingTime() {
        setSeconds(seconds = seconds -1)    
    }
    if (seconds > 0 && showScore!==true) {
        return(
            <div className="Counter">
                <span>{seconds}</span>
            </div>
        );
    } else {
        
        return(
            <div className="Counter">
                <span>Time!</span>
            </div>
        );
    }
    
}

export default CountdownTimer;
	
  
