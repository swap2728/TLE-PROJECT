import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./PastContests.css";
import axios from "axios"; // Import Axios

export default function PastContests() {
  const [contests, setContests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const contestsPerPage = 5;
  const navigate = useNavigate();
  const [selectedPlatform, setSelectedPlatform] = useState("codeforces");


  const [darkMode, setDarkMode] = useState(() => {
    return localStorage.getItem("theme") === "dark";
  });

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [darkMode]);

  useEffect(() => {
    async function fetchContests() {
      setLoading(true);
      try {
        console.log("swapnil")
        let url = "";
        // if (selectedPlatform === "codeforces") {
          url = `http://localhost:3000/api/pastContest/${selectedPlatform}`;
        // } else if (selec/tedPlatform === "codechef") {
          // url = "https://www.codechef.com/api/list/contests/all";
        // }

        const response = await fetch(url); 
        const x = await response.json();
        const result = x.message
        // console.log(x.message)
        if (selectedPlatform === "codechef") {
          setContests([
            ...result.past_contests.map((contest) => ({
              id: contest.contest_code,
              name: contest.contest_name,
              phase: "FINISHED",
              startTimeSeconds: new Date(contest.contest_start_date_iso).getTime() / 1000,
              endTimeSeconds: new Date(contest.contest_end_date_iso).getTime() / 1000,
            })),
            ...result.future_contests.map((contest) => ({
              id: contest.contest_code,
              name: contest.contest_name,
              phase: "BEFORE",
              startTimeSeconds: new Date(contest.contest_start_date_iso).getTime() / 1000,
              endTimeSeconds: new Date(contest.contest_end_date_iso).getTime() / 1000,
            })),
          ]);
        } else {
          // console.log(result.message[0]  )
          setContests(result);
        }
      } catch (error) {
        console.error("Error fetching contests:", error);
      }
      setLoading(false);
    }

    fetchContests();
  }, [selectedPlatform]);

  const pastContests = contests.filter((contest) => contest.phase === "FINISHED");
  const futureContests = contests.filter((contest) => contest.phase === "BEFORE");

  const indexOfLastContest = currentPage * contestsPerPage;
  const indexOfFirstContest = indexOfLastContest - contestsPerPage;
  const currentPastContests = pastContests.slice(indexOfFirstContest, indexOfLastContest);
  const currentFutureContests = futureContests.slice(indexOfFirstContest, indexOfLastContest);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div>
      <nav className="navbar">
        <div className="container">
          <a href="#" className="navbar-title">TLE Eliminator</a>
          <button onClick={() => setSelectedPlatform("codeforces")} className={`platform-btn ${selectedPlatform === "codeforces" ? "active" : ""}`}>Codeforces</button>
          <button onClick={() => setSelectedPlatform("codechef")} className={`platform-btn ${selectedPlatform === "codechef" ? "active" : ""}`}>CodeChef</button>
          <button onClick={() => setSelectedPlatform("leetcode")} className={`platform-btn ${selectedPlatform === "leetcode" ? "active" : ""}`}>LeetCode</button>
          <button className="admin-contests" onClick={() => navigate("/contestsAndLink")}>Other Contests and Link</button>
          <div className="toggle">
      <button onClick={() => setDarkMode(!darkMode)} className="p-3 bg-gray-300 dark:bg-gray-600 rounded">
        Toggle Mode
      </button>
    </div>
          <button className="admin-btn" onClick={() => navigate("/admin")}>Admin</button> 
            
        </div>
      </nav>

      <div className="container content">
        {loading ? (
          <p>Loading...</p>
        ) : (
          <>
            <h2>Past Contests</h2>
            <div className="contest-grid">
              {currentPastContests.map((contest) => (
                <div key={contest.id} className="contest-card" onClick={() => navigate(`/pastContest/${contest.id}`, { state: { contest,selectedPlatform } })}>
                  <h2 className="contest-title">{contest.name}</h2>
                  <p className="contest-date">Ended on: {new Date(contest.endTimeSeconds * 1000).toLocaleString()}</p>
                </div>
              ))}
            </div>

            <h2>Future Contests</h2>
            <div className="contest-grid">
              {currentFutureContests.map((contest) => (
                <div key={contest.id} className="contest-card" onClick={() => navigate(`/futureContest/${contest.id}`, { state: { contest,selectedPlatform } })}>
                  <h2 className="contest-title">{contest.name}</h2>
                  <p className="contest-date">Starts on: {new Date(contest.startTimeSeconds * 1000).toLocaleString()}</p>
                </div>
              ))}
            </div>

            <div className="pagination">
              <button className="pagination-btn" onClick={() => paginate(currentPage - 1)} disabled={currentPage === 1}>
                &lt;
              </button>

              {Array.from({ length: Math.min(3, Math.ceil(contests.length / contestsPerPage)) }, (_, i) => {
                const pageNum = Math.max(1, currentPage - 1) + i;
                return pageNum <= Math.ceil(contests.length / contestsPerPage) ? (
                  <button key={pageNum} className={`pagination-btn ${currentPage === pageNum ? "active" : ""}`} onClick={() => paginate(pageNum)}>
                    {pageNum}
                  </button>
                ) : null;
              })}

              <button className="pagination-btn" onClick={() => paginate(currentPage + 1)} disabled={currentPage === Math.ceil(contests.length / contestsPerPage)}>
                &gt;
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
