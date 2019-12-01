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

//create
async function createCourseObj() {
  const course = new Course({
    name: "mongodb",
    category: "db",
    author: "saket",
    // tags: ['Java', 'Backend'],
    isPublished: true,
    price: 15
  });
  try {
    const result = await course.save(); //save method is used to store a document
    console.log("result", result);
  } catch (err) {
    console.log(err);
  }
}
createCourseObj();

// async function deleteCourse(id) {
//   const course = await Course.findByIdAndRemove({ _id: id });
//   console.log(course);
// }
// deleteCourse("5dd548a743e9221315398c86");
