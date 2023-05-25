import './App.css';
import {useEffect, useState} from 'react';
import maidBG from './img/maid_1.png';

function App() {
  const [headpats, setHeadpats] = useState(0);

  const bgStyle ={
    backgroundImage:`url(${maidBG})`,
    backgroundSize: '99.5%',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center top 0%',
  };

  return(
    <div className="App" style={bgStyle}>
      <div className='title-div'>
        <ManualPats headpats={headpats} setHeadpats={setHeadpats}/>
        <UpgradeStore />
      </div>
			<MaidStore headpats={headpats} setHeadpats={setHeadpats}/>
    </div>);
};

function ManualPats({headpats,setHeadpats}){
	let waifuList = ['Saber','Rin','Kurisu','Sakura','Serika','Mayuri','Nami','Senri','Kazuki','Maho'];
  const [name, setName] = useState("");
  const [showNameEdit, setNameEdit] = useState(true);
  const [color, setColor] = useState('#' + Math.floor(Math.random()*16777215).toString(16));
  const [currentWaifu, setCurrentWaifu] = useState(waifuList[Math.floor(Math.random()*waifuList.length)])

  //Code to handle heapat increases
  const buttonHeadpats = ()=>{
    setHeadpats(headpats+1);
    setColor('#' + Math.floor(Math.random()*16777215).toString(16));
    setCurrentWaifu(waifuList[Math.floor(Math.random()*waifuList.length)]);
  }

  //Code to handle name change
  const handleNameChange = (event) => {
    setName(event.target.value);
  }

	return(
		<div className='title-content-div left-div'>
			<h1>Headpat Simulator</h1>
			<p><button onClick={()=>{setNameEdit(!showNameEdit)}}>Toggle Name Entry</button></p>
			{showNameEdit && <input type="text" onChange={handleNameChange}/>}
			<h2>{name?name:"Jimmy"}-senpai</h2>
			<h1 style={{color:color}}>Headpats:{headpats} </h1>
			<button onClick={buttonHeadpats}>Pat {currentWaifu}'s head</button>
		</div>
	);
}

function UpgradeStore(){
	return(
		<div className='title-content-div right-div'>
			<h1>Upgrades</h1>
			<button onClick={()=>{console.log("Hodor")}}>Placeholder Upgrade</button>
		</div>
	);
}

function MaidStore({headpats,setHeadpats}){
	const [heads, setHeads] = useState(0);
	const [weebData, setWeebData] = useState({num:0, cost:10, multiplier:1.2});
  const [cafeData, setCafeData] = useState({num:0, cost:100, multiplier:1.1, pats:1,headsPerNum:1});
  const [catData, setCatData] = useState({num:0, cost:500, multiplier:1.15, pats:1.25,headsPerNum:1});
  const [twinData, setTwinData] = useState({num:0, cost:1000, multiplier:1.3, pats:1.5,headsPerNum:2});

	let warning = weebData.num>=heads? <div></div> : <div className='warning-div'>Not enough weebs!  There {heads===1?'is':'are'} {heads-weebData.num} unpatted {heads===1?'head':'heads'} leading to sadness.</div> ;
	
	useEffect(()=>{
    const intervalId = setInterval(()=>{
      let unaccountedWeebs = weebData.num;
      let headpatsGained = 0;
      
      //Cafe maids get boops first
      headpatsGained += cafeData.pats*Math.min(unaccountedWeebs,cafeData.num*cafeData.headsPerNum);
      unaccountedWeebs-=Math.min(unaccountedWeebs,cafeData.num*cafeData.headsPerNum);

      //Cat maids get boops second
      headpatsGained += catData.pats*Math.min(unaccountedWeebs,catData.num*catData.headsPerNum);
      unaccountedWeebs-=Math.min(unaccountedWeebs,catData.num*catData.headsPerNum);

      //Twin maids get boops third
      headpatsGained += twinData.pats*Math.min(unaccountedWeebs,twinData.num*twinData.headsPerNum);
      unaccountedWeebs-=Math.min(unaccountedWeebs,twinData.num*twinData.headsPerNum);
      
      setHeadpats(headpats+headpatsGained);
    },1000);    
    return ()=>clearInterval(intervalId);
  },[weebData,cafeData,catData,twinData,headpats,setHeadpats]);

	//Code to buy weebs
	const buyWeeb = ()=>{
		setHeadpats(headpats-weebData.cost);
		setWeebData({num:weebData.num+1,cost:Math.floor(weebData.cost*weebData.multiplier),multiplier:weebData.multiplier})
	}
	
	//Code to buy cafe maids
	const buyCafeMaid=()=>{
		setHeadpats(headpats-cafeData.cost);
		setCafeData({num:cafeData.num+1, cost:Math.floor(cafeData.cost*cafeData.multiplier), multiplier:cafeData.multiplier, pats:cafeData.pats, headsPerNum:cafeData.headsPerNum});
		setHeads(heads+cafeData.headsPerNum);
	}
	
	//Code to buy cat maids
	const buyCatMaid=()=>{
		setHeadpats(headpats-catData.cost);
		setCatData({num:catData.num+1, cost:Math.floor(catData.cost*catData.multiplier), multiplier:catData.multiplier, pats:catData.pats, headsPerNum:catData.headsPerNum});
		setHeads(heads+catData.headsPerNum);
	}
	
	//Code to buy twin maids
		const buyTwinMaid=()=>{
		setHeadpats(headpats-twinData.cost);
		setTwinData({num:twinData.num+1, cost:Math.floor(twinData.cost*twinData.multiplier), multiplier:twinData.multiplier, pats:twinData.pats, headsPerNum:twinData.headsPerNum});
		setHeads(heads+twinData.headsPerNum);
	}

	return(
		<>
			<div className='store-div'>
        {warning}
        <p>Weebs: {weebData.num}</p>
        <p>Headpats until next weeb: {Math.max(weebData.cost-headpats,0)}</p>
        <button disabled={headpats >= weebData.cost ?false:true} onClick={buyWeeb}>Buy Weeb</button>
      </div>
			<StoreItem data={cafeData} label={"Cafe Maid"} description={"A simple maid making her way in life."} headpats={headpats} buyItem={buyCafeMaid}/>
			<StoreItem data={catData} label={"Cat Maid"} description={"Here for meowster's every need nyan!"} headpats={headpats} buyItem={buyCatMaid}/>
      <StoreItem data={twinData} label={"Twin Maid Pair"} description={"A pair of twins, be wary of double cuteness."} headpats={headpats} buyItem={buyTwinMaid}/>
		</>
	)
}

function StoreItem({data, label, description, headpats, buyItem}){
	return(
		<div className='store-div'>
			<p>{label}: {data.num}</p>
			<p>Headpats until next {label.toLowerCase()}: {Math.max(data.cost-headpats,0)}</p>
			<p>{description}  {data.pats} headpats per pat</p>
			<button disabled={headpats >= data.cost ?false:true} onClick={buyItem}>Buy {label}</button>
		</div>
	);
}

export default App;