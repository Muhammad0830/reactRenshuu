const mongoose = require("mongoose");

let personName;
let personNumber;
if (process.argv.length < 3) {
  console.log("give password as argument");
  process.exit(1);
} else if (process.argv.length === 5) {
  personName = process.argv[3];
  personNumber = process.argv[4];
}

const password = process.argv[2];
const url = `mongodb+srv://229453m:${password}@cluster0.bqvfd.mongodb.net/phoneBook?retryWrites=true&w=majority&appName=Cluster0`;

mongoose.connect(url);

const personSchema = new mongoose.Schema({
  name: String,
  number: String,
});

personSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

const Person = mongoose.model("Person", personSchema);

if (process.argv.length === 5) {
  const person = new Person({
    name: `${personName}`,
    number: `${personNumber}`,
  });
  // LzIMQOspIFvru7wF
  person.save().then((result) => {
    console.log(`added ${personName} number ${personNumber} to phonebook`);
    mongoose.connection.close();
  });
} else if(process.argv.length === 3){
    console.log('phoneBook')
    Person.find({}).then(result => {
        result.forEach(person => {
            console.log(person)
        })
        mongoose.connection.close()
    })
}
// Person.find({}).then(result => {
//     result.forEach(person => {
//         console.log(person)
//     })
//     mongoose.connection.close()
// })
