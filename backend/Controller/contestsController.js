const Contest = require("../Models/Contests");

// Add Contest
exports.addContest = async (req, res) => {
  try {
    const { name, date, time, duration, type, contestLink, videoLink, isBookmarked } = req.body;
    // console.log(req.body);

    const existingContest = await Contest.findOne({ name });

    if (existingContest) {
      await Contest.deleteOne({ name }); // Delete if it exists
    }

    const newContest = new Contest({ name, date, time, duration, type, contestLink, videoLink, isBookmarked });

    await newContest.save();
    res.status(201).json({ message: "Contest added successfully!" });
  } catch (error) {
    console.error("Error adding contest:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// Get All Contests
exports.getContests = async (req, res) => {
  try {
    const { name, date, type, isBookmarked } = req.query;
    let filter = {};
    console.log(type)
    // if (name) {
    //   filter.name = { $regex: name, $options: "i" };
    // }
    // if /
    if (type) {
      filter.type = type;
    }
    if (isBookmarked !== undefined && isBookmarked!=="all") {
      filter.isBookmarked = isBookmarked === "true";
    }

    const contests = await Contest.find(filter);
    console.log(contests);
    res.json({ message: contests });
  } catch (error) {
    console.error("Error fetching contests:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// Toggle Bookmark
exports.toggleBookmark = async (req, res) => {
  try {
    const { contestId } = req.params;

    const contest = await Contest.findById(contestId);
    if (!contest) {
      return res.status(404).json({ message: "Contest not found" });
    }

    contest.isBookmarked = !contest.isBookmarked;
    await contest.save();

    res.json({ message: "Bookmark status updated", isBookmarked: contest.isBookmarked });
  } catch (error) {
    console.error("Error toggling bookmark:", error);
    res.status(500).json({ message: "Server error" });
  }
};
