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

//update

async function updateCourse(id) {
  const course = await Course.findByIdAndUpdate(
    id,
    {
      $set: {
        author: "Krishna",
        isPublished: true
      }
    },
    { new: true }
  );
  console.log(course);
}
updateCourse("5dd54b5ae9f5ec14323c88f0");
