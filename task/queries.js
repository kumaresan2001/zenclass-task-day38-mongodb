// 1.Find all the topics and tasks which are thought in the month of October (Using lookup and match)

db.topics.aggregate([
  {
    $lookup: {
      from: "tasks",
      localField: "userId",
      foreignField: "userId",
      as: "October Month Data",
    },
  },
  {
    $match: {
      month: "October",
    },
  },
]);

// 2.Find all the company drives which appeared between 15 oct-2020 and 31-oct-2020 (Using Greater than and Less than )

db.company_drives.find({
  $or: [
    { Date: { $gte: ISODate("2020-08-15") } },
    { Date: { $lte: ISODate("2020-08-31") } },
  ],
});

// 3.Find all the company drives and students who are appeared for the placement (Using Lookup and match)

db.users.aggregate([
  {
    $lookup: {
      from: "company_drives",
      localField: "id",
      foreignField: "userId",
      as: "Placement Data",
    },
  },
  {
    $match: {
      placement: true,
    },
  },
]);

// 4.Find the number of problems solved by the user in codekata (Using Find)

db.users.aggregate([
  {
    $lookup: {
      from: "codekata",
      localField: "id",
      foreignField: "userId",
      as: "Problem Solving Data",
    },
  },
  {
    $match: {
      codekataProbs: { $ne: 0 },
    },
  },
]);

// 5.Find all the mentors with who has the mentee's count more than 15 (Using lookup and match)

db.mentor.aggregate([
  {
    $lookup: {
      from: "users",
      localField: "id",
      foreignField: "mentorId",
      as: "Mentees Count Data",
    },
  },
  {
    $match: {
      menteeCount: { $gt: 15 },
    },
  },
]);

// 6.Find the number of users who are absent and task is not submitted  between 15 oct-2020 and 31-oct-2020 (Using lookup)

db.users.aggregate([
  {
    $lookup: {
      from: "tasks",
      localField: "id",
      foreignField: "userId",
      as: "Absent and Task not Submitted Data",
    },
  },
  {
    $match: {
      $and: [{ attendenceId: 2 }, { taskSubmission: false }],
    },
  },
]);
