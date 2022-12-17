import './App.css';
import {useState} from 'react';

function App() {
  const [headpats, setHeadpats] = useState(0);
  const [name, setName] = useState("");
  const [showNameEdit, setNameEdit] = useState(true);
  const [color, setColor] = useState('#' + Math.floor(Math.random()*16777215).toString(16));

  const increaseHeadpats =()=>{
    setHeadpats(headpats+1);
    setColor('#' + Math.floor(Math.random()*16777215).toString(16));
  }

  const handleNameChange = (event) => {
    setName(event.target.value);
  }

  return(
    <div className="App">
      <p><button onClick={()=>{setNameEdit(!showNameEdit)}}>Toggle Name Entry</button></p>
      {showNameEdit && <input type="text"onChange={handleNameChange}/>}
      <h2>Senpai {name}</h2>
      <h1 style={{color:color}}>Headpats:{headpats} </h1>
      <button onClick={increaseHeadpats}>Pat head</button>
    </div>);
};



export default App;
