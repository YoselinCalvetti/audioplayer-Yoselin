import React, {useState, useEffect} from "react";

//include images into your bundle
import rigoImage from "../../img/rigo-baby.jpg";



//create your first component
const Home = () => {

const [sounds,setSounds]=useState([])


	function obtenerInfo() {
		fetch('https://playground.4geeks.com/apis/fake/sound/songs')
		.then((response)=>response.json())
		.then((data)=>setSounds(data))
		.catch((error)=>console.log(error))
	}

	console.log(sounds);

	useEffect(function () {
			obtenerInfo()
		 },[])

	return (
		<div className="container bg-secondary">
			<div className="row">
			<div className="col-12  mt-3">
			<ol className="list-group list-group-numbered bg-dark">
				{sounds.map(function(item){return <li className="list-group-item bg-dark text-light" key={item.id}>{item.name}</li>})}
			</ol>
			</div>
			</div>
			<nav class="footer bg-secondary">
  <div class="container-fluid">
    <a class="navbar-brand d-flex flex-row justify-content-center" href="#">
	<i class="fa fa-backward p-3" style={{color: "#ffffff"}}></i>
	<i class="fa fa-play p-3" style={{color: "#ffffff"}}></i>
	<i class="fa fa-forward p-3" style={{color: "#ffffff"}}></i>
    </a>
  </div>
</nav>
		</div>

	);
};

export default Home;
