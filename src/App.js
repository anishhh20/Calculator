import { useState } from 'react';
import './style.css';

function App() {
  
  //to set result, display input
  const [result, setResult] = useState("");

  //for previous result
  const [prevResult, setPrevResult] = useState("");
  
  //array of all the operators tht are in the calculator
  const operators = ["/", "*", "+","-","."];
  
  //array of numbers frm [0-9]
  const numbers = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"]

  //detect the keyboard which key is pressed
  document.onkeydown = checkKeycode

  var keycode;
  function checkKeycode(e) {
    if (window.event)
      {keycode = window.event.key;}
    else if (e)
      {keycode = e.which;}

    if(numbers.includes(keycode)){
      setResult(result + keycode)
    }

    if(operators.includes(keycode)){
           
      // get last_char from the input
      var last_char = result.slice(-1);
      
      //if input has already operator and new operator is clicked then, previous operator will be replaced with new
      if(operators.includes(last_char))
        return setResult(result.slice(0, -1) + keycode);
      
      setResult(result + keycode)
    }

    //when keyboard Enter key is pressed, calculate() func will called
    if(keycode === 'Enter'){
      calculate()
    }

    //keyboard_key=Escape, call ac() func
    if(keycode === 'Escape'){
      ac()
    }

    //keyboard_key=Backspace, call del() func
    if(keycode === 'Backspace'){
      del()
    }

    //keyboard_key=Enter && initially result is null, nothing will be displayed
    if(keycode === 'Enter' && result === ''){
     setResult("")
    }

    //result includes operators && keyboard_key=Enter, then last char of result will displayed as it is 
    // it reduces = "when we have single operator in result and we press Enter, it will 'Error' as msg"
    if(operators.includes(result) && keycode === 'Enter'){
      var last_char1 = result.slice(-1);
      setResult(last_char1);
    }
  }
   
  //handles the inputs
  const handleClick = (e) => {

    //if input has already Error msg n we've to calculate new value then, Error msg will be erased 
    if(result === 'Error'){
      return setResult(e.target.name);
    }
    
    if(operators.includes(e.target.name)){
      
      // get last_char from the input
      var last_char = result.slice(-1);

      //if input has already operator and new operator is clicked then, previous operator will be replaced with new
      if(operators.includes(last_char))
        return setResult(result.slice(0, -1) + e.target.name);
    }

    setResult(result.concat(e.target.name));
  }

  //clear out inputs && previous result will clear out
  const ac = () => {
    setResult("");
    setPrevResult("");
  }

  //delete one word from the input
  const del = () => {
    setResult(result.slice(0, -1));
  }

  //calculate function && previous result will set as current result "prevResult= 1+2 result=3"
  const calculate = () => {    
    try{
      var finaleResult = eval(result).toFixed(2);
      setResult(finaleResult.toString());
      setPrevResult(result);
    }
    catch(err) {
      setResult("Error")
    }
  }

  return (
    
    <div className="calculator-grid">

      <div className="output">
        <div className="prev-operand">{prevResult}</div>
        <div className="current-operand">{result}</div>
      </div>

      <button className="span-two change" onClick={ac} style={{color: 'red'}} >AC</button>
      <button onClick={del} className="change">DEL</button>
      <button name="/" onClick={handleClick} className="change">/</button>
      <button name="7" onClick={handleClick}>7</button>
      <button name="8" onClick={handleClick}>8</button>
      <button name="9" onClick={handleClick}>9</button>
      <button name="*" onClick={handleClick} className="change">*</button>
      <button name="4" onClick={handleClick}>4</button>
      <button name="5" onClick={handleClick}>5</button>
      <button name="6" onClick={handleClick}>6</button>
      <button name="-" onClick={handleClick} className="change">-</button>
      <button name="1" onClick={handleClick}>1</button>
      <button name="2" onClick={handleClick}>2</button>
      <button name="3" onClick={handleClick}>3</button>
      <button name="+" onClick={handleClick} className="change">+</button>
      <button name="." onClick={handleClick} className="change">.</button>
      <button name="0" onClick={handleClick}>0</button>
      <button className="span-two change" onClick={calculate} >=</button>
    </div>

  )
}

export default App;
