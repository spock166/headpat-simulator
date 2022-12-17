import './App.css';
import {useEffect, useState} from 'react';

function App() {
  const [headpats, setHeadpats] = useState(0);
  const [name, setName] = useState("");
  const [showNameEdit, setNameEdit] = useState(true);
  const [color, setColor] = useState('#' + Math.floor(Math.random()*16777215).toString(16));
  const [weebs, setWeebs] = useState(0);
  const [requiredHeadpats, setRequiredHeadpats] = useState(10);

  //Code to handle heapat increases
  const increaseHeadpats = ()=>{
    setHeadpats(headpats+1);
    setColor('#' + Math.floor(Math.random()*16777215).toString(16));
  }

  //Code to handle name change
  const handleNameChange = (event) => {
    setName(event.target.value);
  }

  //Code to buy weebs
  const buyWeeb = ()=>{
    setHeadpats(headpats-requiredHeadpats);
    setRequiredHeadpats(Math.floor(requiredHeadpats*1.2));
    setWeebs(weebs+1);
  }

  useEffect(() => {
    const interval = setInterval(() => {
      setHeadpats(headpats+weebs);
      setColor('#' + Math.floor(Math.random()*16777215).toString(16));
    }, 1000);
  
    return () => clearInterval(interval);
  }, [headpats, weebs]);

  return(
    <div className="App">
      <h1>Headpat Simulator</h1>
      <p><button onClick={()=>{setNameEdit(!showNameEdit)}}>Toggle Name Entry</button></p>
      {showNameEdit && <input type="text"onChange={handleNameChange}/>}
      <h2>{name?name:"Jimmy"}-senpai</h2>
      <h1 style={{color:color}}>Headpats:{headpats} </h1>
      <p>Weebs: {weebs}</p>
      <p>Headpats until next weeb: {Math.max(requiredHeadpats-headpats,0)}</p>
      <button onClick={increaseHeadpats}>Pat head</button>
      <button disabled={headpats >= requiredHeadpats ?false:true} onClick={buyWeeb}>Buy Weeb</button>
    </div>);
};

export default App;