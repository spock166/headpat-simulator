import './App.css';
import {useEffect, useState} from 'react';

function App() {
  const [headpats, setHeadpats] = useState(0);
  const [name, setName] = useState("");
  const [showNameEdit, setNameEdit] = useState(true);
  const [color, setColor] = useState('#' + Math.floor(Math.random()*16777215).toString(16));
  const [heads, setHeads] = useState(0);

  const [weebs, setWeebs] = useState(0);
  const [weebCost, setWeebCost] = useState(10);

  const [cafeMaids, setCafeMaids] = useState(0);
  const [cafeCost, setCafeCost] = useState(100);

  const [catMaids, setCatMaids] = useState(0);
  const [catCost, setCatCost] = useState(500);

  const [twinMaids, setTwinMaids] = useState(0);
  const [twinCost, setTwinCost] = useState(1000);

  let warning = weebs>=heads? <div></div> : <div className='warning-div'>Not enough weebs!  There {heads===1?'is':'are'} {heads-weebs} unpatted {heads===1?'head':'heads'} leading to sadness.</div> ;
  

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
    setHeadpats(headpats-weebCost);
    setWeebCost(Math.floor(weebCost*1.2));
    setWeebs(weebs+1);
  }

  //Code to buy cafe maids
  const buyCafeMaid=()=>{
    setHeadpats(headpats-cafeCost);
    setCafeCost(Math.floor(cafeCost*1.1));
    setCafeMaids(cafeMaids+1);
    setHeads(heads+1);
  }

  //Code to buy cat maids
  const buyCatMaid=()=>{
    setHeadpats(headpats-catCost);
    setCatCost(Math.floor(catCost*1.15));
    setCatMaids(catMaids+1);
    setHeads(heads+1);
  }

    //Code to buy twin maids
    const buyTwinMaid=()=>{
      setHeadpats(headpats-twinCost);
      setTwinCost(Math.floor(twinCost*1.15));
      setTwinMaids(twinMaids+1);
      setHeads(heads+2);
    }

  useEffect(()=>{
    const intervalId = setInterval(()=>{
      let unaccountedWeebs = weebs;
      let headpatsGained = 0;
      
      //Cafe maids get boops first
      headpatsGained += 1*Math.min(unaccountedWeebs,cafeMaids);
      unaccountedWeebs-=Math.min(unaccountedWeebs,cafeMaids);

      //Cat maids get boops second
      headpatsGained += 1.25*Math.min(unaccountedWeebs,catMaids);
      unaccountedWeebs-=Math.min(unaccountedWeebs,catMaids);

      //Twin maids get boops third
      headpatsGained += 1.5*Math.min(unaccountedWeebs,twinMaids*2);
      unaccountedWeebs-=Math.min(unaccountedWeebs,twinMaids*2);
      

      setHeadpats(headpats+headpatsGained);
      
      if(headpatsGained > 0)
      {
        setColor('#' + Math.floor(Math.random()*16777215).toString(16));
      }
    },1000);    
    return ()=>clearInterval(intervalId);
  },[weebs,cafeMaids,catMaids,twinMaids,headpats]);

  

  return(
    <div className="App">
      <h1>Headpat Simulator</h1>
      <p><button onClick={()=>{setNameEdit(!showNameEdit)}}>Toggle Name Entry</button></p>
      {showNameEdit && <input type="text" onChange={handleNameChange}/>}
      <h2>{name?name:"Jimmy"}-senpai</h2>
      <h1 style={{color:color}}>Headpats:{headpats} </h1>
      <button onClick={increaseHeadpats}>Pat head</button>
      <div className='store-div'>
        {warning}
        
        <p>Weebs: {weebs}</p>
        <p>Headpats until next weeb: {Math.max(weebCost-headpats,0)}</p>
        <button disabled={headpats >= weebCost ?false:true} onClick={buyWeeb}>Buy Weeb</button>
      </div>
      <div className='store-div'>
        <p>Cafe Maids: {cafeMaids}</p>
        <p>A simple maid making her way in life.  1 headpat per pat</p>
        <p>Headpats until next cafe maid: {Math.max(cafeCost-headpats,0)}</p>
        <button disabled={headpats >= cafeCost ?false:true} onClick={buyCafeMaid}>Buy Cafe Maid</button>
      </div>
      <div className='store-div'>
        <p>Cat Maids: {catMaids}</p>
        <p>Headpats until next cat maid: {Math.max(catCost-headpats,0)}</p>
        <p>Here for meowster's every need nyan!  1.25 headpats per pat</p>
        <button disabled={headpats >= catCost ?false:true} onClick={buyCatMaid}>Buy Cat Maid</button>
      </div>
      <div className='store-div'>
        <p>Twin Maid Pairs: {twinMaids}</p>
        <p>Headpats until next twin maids: {Math.max(twinCost-headpats,0)}</p>
        <p>A pair of twins, be wary of double cuteness.  1.5 headpats per pat</p>
        <button disabled={headpats >= twinCost ?false:true} onClick={buyTwinMaid}>Buy Twin Maids</button>
      </div>
    </div>);
};

export default App;