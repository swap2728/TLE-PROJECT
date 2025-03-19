import { useEffect, useState } from "react";
import axios from "axios";
import "./displayContest.css";
import { use } from "react";

export default function AddedContests() {
    const [contests, setContests] = useState([]);
    const [globalData, setglobalData] = useState([]);

    const [filters, setFilters] = useState({
        name: "",
        date: "",
        type: "",
        bookmarkFilter: "all" 
    });

    useEffect(() => {
        fetchContests();
    }, [filters]);

    const fetchContests = async () => {
        try {
            const response = await axios.get("http://localhost:3000/api/addedContest/Contest", {
                params: {
                    name: filters.name,
                    date: filters.date,
                    type: filters.type,
                    isBookmarked: filters.bookmarkFilter === "all" ? undefined : filters.bookmarkFilter === "bookmarked"
                }
            });
            setContests(response.data.message);
            setglobalData(response.data.message)
        } catch (error) {
            console.error("Error fetching contests:", error);
        }
    };

    const handleChange = (e) => {
        setFilters({ ...filters, [e.target.name]: e.target.value });
    };

    const toggleBookmark = async (contestId) => {
        try {
            await axios.patch(`http://localhost:3000/api/addedContest/toggleBookmark/${contestId}`);
            fetchContests(); 
        } catch (error) {
            console.error("Error toggling bookmark:", error);
        }
    };
    // useEffect()

    return (
        <div>
            <nav className="navbar">
                <div className="container">
                    <a href="#" className="navbar-title">TLE Eliminator</a>
                </div>
            </nav>

            <div className="container content">
                <h1 className="title">Added Contests</h1>

                {/* Filters */}
                <div className="filters">
                    {/* <input
                        type="text"
                        name="name"
                        placeholder="Search by Name"
                        value={filters.name}
                        onChange={handleChange}
                    /> */}
                    {/* <input
                        type="date"
                        name="date"
                        value={filters.date}
                        onChange={handleChange}
                    /> */}
                    <select name="type" value={filters.type} onChange={handleChange}>
                        <option value="">All Types</option>
                        <option value="Codeforces">Codeforces</option>
                        <option value="CodeChef">CodeChef</option>
                        <option value="Leetcode">Leetcode</option>
                        <option value="VideoSolution">Video Solution</option>
                    </select>

                    {/* Bookmark Filter Dropdown */}
                    <select name="bookmarkFilter" value={filters.bookmarkFilter} onChange={handleChange}>
                        <option value="all">All Contests</option>
                        <option value="bookmarked">Only Bookmarked</option>
                        <option value="unbookmarked">Only Unbookmarked</option>
                    </select>
                </div>

                {/* Display Contests */}
                <div className="contest-grid">
                    {contests.length > 0 ? (
                        contests.map((contest) => (
                            <div key={contest._id} className="contest-card">
                                <h2 className="contest-title">{contest.name}</h2>
                                <p className="contest-date">
                                    Date: {contest.date} | Time: {contest.time}
                                </p>
                                <p className="contest-duration">
                                    Duration: {contest.duration} minutes
                                </p>
                                <p className="contest-type">Type: {contest.type}</p>
                                
                                {contest.contestLink && (
                                    <a href={contest.contestLink} target="_blank" rel="noopener noreferrer" className="contest-link">
                                        View Contest
                                    </a>
                                )}

                                {contest.videoLink && (
                                    <a href={contest.videoLink} target="_blank" rel="noopener noreferrer" className="video-link">
                                        Watch Video
                                    </a>
                                )}

                                <button onClick={() => toggleBookmark(contest._id)} className="bookmark-btn">
                                    {contest.isBookmarked ? "★ Bookmarked" : "☆ Bookmark"}
                                </button>
                            </div>
                        ))
                    ) : (
                        <p>No contests found</p>
                    )}
                </div>
            </div>
        </div>
    );
}
