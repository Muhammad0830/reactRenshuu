const mongoose = require("mongoose");

mongoose.set("strictQuery", false);

const url = process.env.MONGODB_URI;

console.log("connecting to", url);
mongoose
  .connect(`${url}`)
  .then((result) => {
    console.log("connected to MongoDB");
  })
  .catch((error) => {
    console.log("error connecting to MongoDB:", error.message);
  });

const personSchema = new mongoose.Schema({
  name: {
    type: String,
    minLength: [3, 'the name should include at least 3 characters'],
    required: true,
  },
  number: {
    type: String,
    minLength: [8, 'the phone number should inlclude at least 8 characters'],
    required: true,
    validate: {
      validator: function (v) {
        return /^\d{2,3}-\d+$/.test(v); // Ensures 2-3 digits, a dash, and more digits
      },
      message: (props) => `${props.value} is not a valid phone number! It should be in the format XX-XXXXXXX or XXX-XXXXXXXX.`,
    },
  },
});

personSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

module.exports = mongoose.model("Person", personSchema);
