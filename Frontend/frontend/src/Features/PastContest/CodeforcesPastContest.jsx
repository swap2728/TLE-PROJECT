import { useEffect, useState } from "react";
import "./PastContests.css";

export default function PastContests() {
  const [contests, setContests] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchContests() {
      try {
        const responses = await Promise.all([
          fetch("https://kontests.net/api/v1/codeforces"),
          fetch("https://kontests.net/api/v1/code_chef"),
          fetch("https://kontests.net/api/v1/leet_code"),
        ]);
        
        const data = await Promise.all(responses.map((res) => res.json()));
        
        const pastContests = data.flat().filter(
          (contest) => new Date(contest.end_time) < new Date()
        );
        
        pastContests.sort((a, b) => new Date(b.end_time) - new Date(a.end_time));
        
        setContests(pastContests);
      } catch (error) {
        console.error("Error fetching contests:", error);
      }
      setLoading(false);
    }

    fetchContests();
  }, []);

  return (
    <div>
      <nav className="navbar">
        <div className="container">
          <a href="#" className="navbar-title">
            TLE Eliminator
          </a>
        </div>
      </nav>
      <div className="container content">
        <h1 className="title">Past Contests</h1>
        {loading ? (
          <p>Loading...</p>
        ) : (
          <div className="contest-grid">
            {contests.map((contest) => (
              <a
                key={contest.name}
                href={contest.url}
                target="_blank"
                rel="noopener noreferrer"
                className="contest-card"
              >
                <h2 className="contest-title">{contest.name}</h2>
                <p className="contest-date">
                  Ended on: {new Date(contest.end_time).toLocaleString()}
                </p>
              </a>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
