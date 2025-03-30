import React from "react";
import axios from "axios";
import "./index.css";  
import { useEffect,useState } from "react";

function App() {

    const [Artist,setArtist]= useState("");
    const [Lyrics,setLyrics]=useState("");
    const [song,setsong]=useState("");
    const [theme, setTheme] = useState((localStorage.getItem("theme")||"dark"));


    useEffect(()=>{
      localStorage.setItem("theme",theme);
    },[theme]);

    function SearchLyrics(){
        if(Artist==="" || song===""){
            alert("Please enter both song and artist"); 
            return;
        } 
        axios
        .get(`https://api.lyrics.ovh/v1/${Artist.toLowerCase()}/${song.toLowerCase()}`)
        .then((res)=>{

            setLyrics(res.data.lyrics)
           document.getElementById("songInput").blur()  // Remove focus from Song input
           document.getElementById("artistInput").blur()
        })
        .catch((err) => {
            setLyrics("Lyrics not found. Try a different song!"); 
            console.error("Error fetching lyrics:", err);
        });

    }

    function Handlesong (e){
        setsong(e.target.value);
    }

    function HandleArtist (e){
        setArtist(e.target.value);
    }

    function handleRefresh(){
        setsong("");
        setArtist("");
        setLyrics("");
    }

    function Toggletheme(){
        setTheme(prevtheme=>{
          return prevtheme==="dark"?"light":"dark"
        })

    }





  return (
    <div className={`app-container ${theme}`}>
      {/* Header Section */}
      <div className="header-cont">
        <div className="heading-theme">
          <h1 className="heading">Lyrics Finder</h1>
          <button className="Toggle" onClick={Toggletheme}></button>
          </div>

        <div className="header">
          <input id="songInput" type="text" placeholder="Song" value={song} onChange={Handlesong}/>
          <input  id="artistInput" type="text" placeholder="Artist" value={Artist} onChange={HandleArtist} />
          <button type="button" onClick={SearchLyrics}>Search</button>
        </div>
      </div>

      {/* Main Section */}
      <div className="main">
        <pre>{Lyrics}</pre>
    </div>

    {/*footer*/}
    {(song!=="" || Artist!=="" ) && <div className="foot">
        < button type="button" onClick={handleRefresh}>Refresh</button>
    </div>}
     

    </div>
  );
}

export default App;
