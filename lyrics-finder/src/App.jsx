import React from "react";
import axios from "axios";
import "./index.css";  
import { useEffect,useState } from "react";

function App() {

    const [Artist,setArtist]= useState("");
    const [Lyrics,setLyrics]=useState("");
    const [song,setsong]=useState("");


    function SearchLyrics(){
        if(Artist==="" || song===""){
            alert("Please enter both song and artist");            return;
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






  return (
    <div className="app-container">
      {/* Header Section */}
      <div className="header-cont">
        <h1 className="heading">Lyrics Finder</h1>

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
