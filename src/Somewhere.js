
import App from './App';
import {useState,useEffect} from 'react';
import { ids } from './ids.js';

function getRandomInt(max) {
    return Math.floor(Math.random() * max);
  }
  
 let rndId = getRandomInt(ids.length);


const Somewhere = () => {
    var [startGame, setStartGame] = useState(false);
    var gameImage=ids[rndId];
    console.log('hej')
    console.log(startGame)
    if (startGame === false) {
        return (
        
            <div className="test">
                <h2 style={{ padding: "9.7vh 5vw", textAlign: "center",fontSize: "3vh", color: "white"}}> Somewhere in Stockholm </h2>  
                <p style={{ padding: "2vh 5vw", textAlign: "center",fontSize: "2vh", color: "white"}}> 
				Find out where you are at before the time runs out. <br/> Good luck!
				</p>
                <button className="start-btn" onClick={() => setStartGame(true)}>Start a game</button>
                
            </div>
        );
    } else {
        return (
        
            <div>setSeconds(seconds = seconds -1)
                <App dataFromParent = {gameImage} startInd = {() => setStartGame(false)} />
                    
            </div>
        );

    }
}

export default Somewhere;
