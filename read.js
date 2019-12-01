const mongoose = require("mongoose");

mongoose
  .connect("mongodb://localhost/play", {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => console.log("Connected to database"))
  .catch(err => console.log("could not connect to the mongo db"));

const courseObj = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 255
  },
  category: {
    type: String,
    enum: ["web", "db", "Mobile", "Network"]
  },
  author: String,
  tags: {
    type: Array
  },
  date: { type: Date, default: Date.now },
  isPublished: Boolean
});

const Course = mongoose.model("Course", courseObj);

async function getCourses() {
  const courses = await Course
    //.find({price: {$gte: 10}})
    .find()
    .or([{ author: "madhav" }, { isPublished: true }])
    .limit(5)
    .select({ name: 1, tags: 1 });
  console.log(courses);
  //find method is used to query a document
}
getCourses();
