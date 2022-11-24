import React  from "react";
export default function Die(props){
    const styles={
        backgroundColor: props.isClicked ? "#8ab647" :"white"
    }

    return(
<div className="die--face" onClick={props.handleClick} style={styles}>
    <h1 className="die-num">{props.value}</h1>
    </div>
      )
}