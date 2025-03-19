import { useLocation, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import "./Detail.css"
export default function Detail() {
  const location = useLocation();
  const contest = location.state?.contest;
  const url = (location.state?.selectedPlatform==="codeforces")?"https://codeforces.com/contests":"https://codechef.com";
  const link = (location.state?.selectedPlatform==="codeforces")?"https://www.youtube.com/playlist?list=PLcXpkI9A-RZLUfBSNp-YQBCOezZKbDSgB":"https://www.youtube.com/playlist?list=PLcXpkI9A-RZIZ6lsE0KCcLWeKNoG45fYr";
  const id = useParams()
  const [timeLeft, setTimeLeft] = useState("");
  
//   useEffect( ()=>{

//     async function getLink(){
//         try {
//             const str = location.state.contest.name.replace(/\s*\(.*?\)\s*/g, "").trim();
//             console.log(str)
//             const response = await fetch(`http://localhost:3000/api/getYtLink/${str}`);
//             const result = await response.json();
//             setLink(result.message);
//           } catch (error) {
//             console.error("Error fetching contests:", error);
//           }
//     }
//     getLink();

//   },[])

  useEffect(() => {
    if (!contest) return;

    const updateCountdown = () => {
      const now = new Date().getTime();
      const startTime = contest.startTimeSeconds * 1000;
      const diff = startTime - now;

      if (diff <= 0) {
        setTimeLeft("Finish contest!");
        return;
      }

      const hours = Math.floor(diff / (1000 * 60 * 60));
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((diff % (1000 * 60)) / 1000);

      setTimeLeft(`${hours}h ${minutes}m ${seconds}s`);
    };

    updateCountdown();
    const interval = setInterval(updateCountdown, 1000);
    return () => clearInterval(interval);
  }, [contest]);

  const getYTLink=()=>{
    try{
        alert("success")
    }
    catch(error){

    }
  }

  if (!contest) {
    return <h2>No contest data available.</h2>;
  }

  return (
    <div className="future-contest-page">
      {/* <button
        onClick={getYTLink()}
      > */}
      <nav className="navbar">
        <div className="container">
          <a href="#" className="navbar-title"
          >
          Past Contest
          </a>
        </div>
      </nav>
      <div className="contest-details">
        <h2 className="contest-title">{contest.name}</h2>
        <p className="contest-time-left">Finish in: {timeLeft}</p>
        <p className="contest-duration">Duration: {contest.durationSeconds / 60} minutes</p>
        <a href={`${url}/${contest.id}`} target="_blank" rel="noopener noreferrer" className="contest-link">
          Visit Contest
        </a>
        <a href={link} target="_blank" rel="noopener noreferrer" className="contest-link">
          video (working on automation)
        </a>
      </div>
    </div>
  );
}
