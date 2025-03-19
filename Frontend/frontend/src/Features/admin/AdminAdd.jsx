import { useState } from "react";
import axios from "axios";
import "./AdminAdd.css";

export default function AddContest() {
  const [contestData, setContestData] = useState({
    name: "",
    date: "",
    time: "",
    duration: "",
    type: "Codeforces",
    contestLink: "",
    videoLink: "",
  });

  const handleChange = (e) => {
    setContestData({ ...contestData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const finalContestData = {
        ...contestData,
        contestLink: contestData.contestLink.trim() === "" ? "" : contestData.contestLink,
        videoLink: contestData.videoLink.trim() === "" ? "" : contestData.videoLink,
      };

      await axios.post("http://localhost:3000/api/addedContest", finalContestData);

      setContestData({
        name: "",
        date: "",
        time: "",
        duration: "",
        type: "Codeforces",
        contestLink: "",
        videoLink: "",
      });

      alert("Contest added successfully!");
    } catch (error) {
      console.error("Error adding contest:", error);
      alert("Failed to add contest.");
    }
  };

  return (
    <div>
      <nav className="navbar">
        <div className="container">
          <a href="#" className="navbar-title">TLE Eliminator</a>
        </div>
      </nav>

      <div className="add-contest-page">
        <h1>Add Contest</h1>
        <form onSubmit={handleSubmit} className="contest-form">
          <label>Contest Name:</label>
          <input type="text" name="name" value={contestData.name} onChange={handleChange} required />

          <label>Date:</label>
          <input type="date" name="date" value={contestData.date} onChange={handleChange} required />

          <label>Time:</label>
          <input type="time" name="time" value={contestData.time} onChange={handleChange} required />

          <label>Duration (in minutes):</label>
          <input type="number" name="duration" value={contestData.duration} onChange={handleChange} required />

          <label>Type:</label>
          <select name="type" value={contestData.type} onChange={handleChange}>
            <option value="Codeforces">Codeforces</option>
            <option value="CodeChef">CodeChef</option>
            <option value="Leetcode">Leetcode</option>
            <option value="VideoSolution">Video Solution</option>
          </select>

          <label>Contest Link:</label>
          <input type="url" name="contestLink" value={contestData.contestLink} onChange={handleChange} />

          <label>Video Link:</label>
          <input type="url" name="videoLink" value={contestData.videoLink} onChange={handleChange} />

          <button type="submit">Submit</button>
        </form>
      </div>
    </div>
  );
}
