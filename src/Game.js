import React from "react";
import Die from "./Die";
import {nanoid} from "nanoid"
import ReactDOM from "react-dom"
import Confetti from "react-confetti"
import Introduction from "./Introduction";
export default function Game(){
   const [dice,setDice]=React.useState(createNewDice())
    const [winner,setWinner]=React.useState(false)
    const [timer,setTimer]=React.useState(0)
    const [bestTime,setBestTime]=React.useState(   JSON.parse(localStorage.getItem("bestTime")) || 0)
    const [counter,setCounter]=React.useState(0)
    function generateNewDieElement(){
   return({
       id: nanoid(),
       value: Math.ceil(Math.random()*6),
       isClicked: false
   })}


React.useEffect(()=>{
if(!winner){
       setTimeout(()=>{
           setTimer(timer+1)},1000)

    for (var i=0;i<10;i++){
        if(!dice[i].isClicked ||dice[0].value!=dice[i].value){
            break;
        }
    }
    if(i==10){
        setWinner(true)
        setDice(createNewDice)
        if (!bestTime || timer < bestTime) {
            setBestTime(timer);
        }

    }
       }
    })
    React.useEffect(() => {
        localStorage.setItem("bestTime", JSON.stringify(bestTime));
    }, [bestTime]);

   function createNewDice(){
        const dice=[]
       for (let i=0;i<10;i++){
        dice.push(generateNewDieElement())
       }
       return dice
   }
   function roll_restart() {
       if(!winner){
      setDice(oldDice=>oldDice.map(die=>
      {return(die.isClicked ? die: generateNewDieElement())
      }))
           setCounter(counter+1)
       }
       else{
           ReactDOM.render(<div>
               <Introduction/>
               <Game/>
               </div> ,document.getElementById("root"))
       }

   }
       function handleClick(id){
       setDice(oldDice=>oldDice.map(die=>{
               return( id===die.id ?{
                   ...die,
                   isClicked: !die.isClicked
               } :die )
           })
       )
       }
       function congrats(){
       ReactDOM.render(<div>
           <Confetti width="950px" height="450px" className="confetti"/>
           <div className="container-winner">
               <h1 className="congrats">Congratulations !</h1>
               <div className="score-board">
               <h3>Dice roll count : {counter}</h3>
               <h3>Time : {timer} seconds</h3>
               <h3>Fastest Time : {bestTime} seconds</h3>
                   </div>
           <button className="button-restart" onClick={roll_restart}>Restart</button></div></div>,document.getElementById("root"))
       }

       const diceElements = dice.map(die => <Die key={die.id} value={die.value}
      isClicked={die.isClicked} handleClick={()=>handleClick(die.id)}/>)
       return (<div>
           {winner ? congrats() && setTimer(0) && setCounter(0):
           <div className="dice--container">
               {diceElements}
           </div>}
           <button className="button" onClick={roll_restart}>{!winner ?"Roll" :"Restart"}</button>
       </div>)
   }