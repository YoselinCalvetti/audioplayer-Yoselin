import React, {useState, useEffect, useRef} from "react";

//include images into your bundle
import rigoImage from "../../img/rigo-baby.jpg";



//create your first component
const Home = () => {
	
	const audio= useRef();

const [sounds,setSounds]=useState([])
const [url,setUrl]=useState("")


	function obtenerInfo() {
		fetch('https://playground.4geeks.com/apis/fake/sound/songs')
		.then((response)=>response.json())
		.then((data)=>setSounds(data))
		.catch((error)=>console.log(error))
	}

	console.log(sounds);

	function reproducir(url) {
		audio.current.play()
		console.log(url);
		console.log("Funciona el play");
	}

	useEffect(function () {
			obtenerInfo()
		 },[])

	return (
		<div className="container bg-secondary">
			<div className="row">
			<div className="col-12  mt-3">
			<ol className="list-group list-group-numbered bg-dark">
				{sounds.map(function(item){return <li className="list-group-item bg-dark text-light" 
				key={item.id}
				 onClick={function(){setUrl(item.url)}}>
					{item.name}
					</li>})}
			</ol>
			</div>
			</div>
			<footer class="container footer bg-secondary fixed-bottom">
  <div class="container-fluid">
    <a class="navbar-brand d-flex flex-row justify-content-center" href="#">
	<i class="fa fa-backward p-3" style={{color: "#ffffff"}}></i>
	<i onClick={()=>reproducir()} class="fa fa-play p-3" style={{color: "#ffffff"}}></i>
	<i class="fa fa-pause p-3" style={{color: "#ffffff"}}></i>
	<i class="fa fa-forward p-3" style={{color: "#ffffff"}}></i>
    </a>
  </div>
  <audio ref={audio} src={"https://assets.breatheco.de/apis/sound/" + url}>
  </audio>
</footer>
		</div>

	);
};

export default Home;
