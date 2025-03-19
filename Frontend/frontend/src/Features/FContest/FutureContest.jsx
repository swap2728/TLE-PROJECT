import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import "./FutureContest.css";

export default function FutureContest() {
  const location = useLocation();
  const contest = location.state?.contest;
  const url = location.state?.selectedPlatform=="codeforces"?"https://codeforces.com/contests":"https://codechef.com";
  const [timeLeft, setTimeLeft] = useState("");
  const [bookmarked, setBookmarked] = useState(false);

  useEffect(() => {
    if (!contest) return;

    const updateCountdown = () => {
      const now = new Date().getTime();
      const startTime = contest.startTimeSeconds * 1000;
      const diff = startTime - now;

      if (diff <= 0) {
        setTimeLeft("Contest has started!");
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

  useEffect(() => {
    if (contest) {
      const savedBookmarks = JSON.parse(localStorage.getItem("bookmarkedContests")) || [];
      setBookmarked(savedBookmarks.some((c) => c.id === contest.id));
    }
  }, [contest]);

  const toggleBookmark = () => {
    if (!contest) return;

    let savedBookmarks = JSON.parse(localStorage.getItem("bookmarkedContests")) || [];

    if (bookmarked) {
      savedBookmarks = savedBookmarks.filter((c) => c.id !== contest.id);
    } else {
      savedBookmarks.push(contest);
    }

    localStorage.setItem("bookmarkedContests", JSON.stringify(savedBookmarks));
    setBookmarked(!bookmarked);
  };

  if (!contest) {
    return <h2>No contest data available.</h2>;
  }

  return (
    <div className="future-contest-page">
      <nav className="navbar">
        <div className="container">
          <a href="#" className="navbar-title">Upcoming Contest</a>
        </div>
      </nav>

      <div className="contest-details">
        <h2 className="contest-title">{contest.name}</h2>
        <p className="contest-time-left">Starts in: {timeLeft}</p>
        <p className="contest-duration">Duration: {contest.durationSeconds / 60} minutes</p>

        <a href={`${url}/${contest.id}`} target="_blank" rel="noopener noreferrer" className="contest-link">
          Register ...
        </a>
      </div>
    </div>
  );
}
