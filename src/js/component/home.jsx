import React, {useState, useEffect, useRef} from "react";

//include images into your bundle
import rigoImage from "../../img/rigo-baby.jpg";



//create your first component
const Home = () => {
	
const [songs, setSongs] = useState([]);
const [currentIndex, setCurrentIndex] = useState(0);
const [Play, setPlay] = useState(false);
const audioRef = useRef(new Audio());

const audioUrl = "https://assets.breatheco.de/apis/sound/";

const fetchSongs = async () => {
  try {
    const response = await fetch('https://playground.4geeks.com/apis/fake/sound/songs');
    if (response.ok) {
      const data = await response.json();
      const songsURLs = data.map(song => ({
        ...song,
        url: audioUrl + song.url
      }));
      setSongs(songsURLs);
    } else {
      console.error("Error fetching songs data");
    }
  } catch (error) { 
    console.error("Error fetching songs data:", error);
  }
};

const playSong = (index) => {
  if (index >= 0 && index < songs.length) {
    setCurrentIndex(index);
    audioRef.current.src = songs[index].url;
    audioRef.current.play();
    setPlay(true);
  }
};

const pause = () => {
  audioRef.current.pause();
  setPlay(false);
};

const Next = () => {
  const nextIndex = (currentIndex + 1) % songs.length;
  playSong(nextIndex);
};

const Prev = () => {
  const prevIndex = (currentIndex - 1 + songs.length) % songs.length;
  playSong(prevIndex);
};

useEffect(() => {
  fetchSongs();
}, []);

return (
  <div className="container bg-secondary mb-3">
     <div className="marg p-3">
      <ol className="list-group bg-dark">
        
        {songs.map((item, index) => (
          <li
            key={item.id}
           
            onClick={() => playSong(index)}
            
            className={`list-group-item ${
              currentIndex === index ? "bg-dark text-white" : ""
            }`}
          >
          
            <span className="mr-2">{index + 1}.</span>
            {item.name}
          </li>
        ))}
      </ol>
    </div>
   
    <div className="container bg-dark bg-opacity-75" style={{ position: "fixed", bottom: 0, left: 0, right: 0, background: "#ffffff", textAlign: "center" }}>
      <button onClick={Prev}> 
      <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" class="bi bi-rewind-btn-fill" viewBox="0 0 16 16" >
<path d="M0 4v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2H2a2 2 0 0 0-2 2Zm7.729 1.055A.5.5 0 0 1 8 5.5v1.886l3.21-2.293A.5.5 0 0 1 12 5.5v5a.5.5 0 0 1-.79.407L8 8.614V10.5a.5.5 0 0 1-.79.407l-3.5-2.5a.5.5 0 0 1 0-.814l3.5-2.5a.5.5 0 0 1 .519-.038Z"/>
</svg> 
      </button>
      {Play ? (
        <button onClick={pause}> 
         <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" class="bi bi-pause-btn-fill" viewBox="0 0 16 16">
<path d="M0 12V4a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2zm6.25-7C5.56 5 5 5.56 5 6.25v3.5a1.25 1.25 0 1 0 2.5 0v-3.5C7.5 5.56 6.94 5 6.25 5zm3.5 0c-.69 0-1.25.56-1.25 1.25v3.5a1.25 1.25 0 1 0 2.5 0v-3.5C11 5.56 10.44 5 9.75 5z"/>
</svg>
        </button>
      ) : (
        <button onClick={() => playSong(currentIndex)}> 
         <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" class="bi bi-play-btn-fill" viewBox="0 0 16 16">
<path d="M0 12V4a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2zm6.79-6.907A.5.5 0 0 0 6 5.5v5a.5.5 0 0 0 .79.407l3.5-2.5a.5.5 0 0 0 0-.814l-3.5-2.5z"/>
</svg>
        </button>
      )}
      <button onClick={Next}> 
      <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" class="bi bi-fast-forward-btn-fill" viewBox="0 0 16 16">
<path d="M0 4v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2H2a2 2 0 0 0-2 2Zm4.271 1.055a.5.5 0 0 1 .52.038L8 7.386V5.5a.5.5 0 0 1 .79-.407l3.5 2.5a.5.5 0 0 1 0 .814l-3.5 2.5A.5.5 0 0 1 8 10.5V8.614l-3.21 2.293A.5.5 0 0 1 4 10.5v-5a.5.5 0 0 1 .271-.445Z"/>
</svg>
      </button>
    </div>
   
  </div>
);
};

export default Home;
