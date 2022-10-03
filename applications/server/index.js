const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const { MongoClient } = require('mongodb');
//const routes = require('./routes/api');
const cors = require('cors');
require('dotenv').config();
const path = require('path');

var app = express();
//const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Connect to the database
const uri = "mongodb+srv://brarharry:csc648team03@cluster0.h2yyv.mongodb.net/test?retryWrites=true&w=majority";
mongoose.connect(uri, {useNewUrlParser: true, useUnifiedTopology: true });
const connection = mongoose.connection;
connection.once('open', () => {
  console.log("DB connected Successfully!");
})

// mongoose
//   .connect("mongodb://127.0.0.1:27017/mongodb", { useNewUrlParser: true })
//   .then(() => console.log(`Database connected successfully`))
//   .catch((err) => console.log(err));

// Since mongoose's Promise is deprecated, we override it with Node's Promise
mongoose.Promise = global.Promise;

// app.use((req, res, next) => {
//   res.header('Access-Control-Allow-Origin', '*');
//   res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
//   next();
// });

// app.use(bodyParser.json());

// app.use('/api', routes);

// app.use((err, req, res, next) => {
//   console.log(err);
//   next();
// });

// Have Node serve the files for our built React app
app.use(express.static(path.resolve(__dirname, '../client/build')));
const recipeRouter = require('./routes/recipe');
const foodRouter = require('./routes/food');
const usersRouter = require('./routes/users');
const shoppingListRouter = require('./routes/shoppingList');


app.use('/recipe', recipeRouter);
app.use('/food', foodRouter);
app.use('/users', usersRouter);
app.use('/shoppingList', shoppingListRouter);

require("./routes/tutorial.routes")(app);
// Handle GET requests to /food route
app.get("/food", (req, res) => {
  res.json({ message: "Hello from server!" });
});

app.get("/api", (req, res) => {
  res.json({ message: "Hello from server!" });
});
// All other GET requests not handled before will return our React app
app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, '../client/build', 'index.html'));
});

// app.listen(port, () => {
//   console.log(`Server running on port ${port}`);
// });

module.exports = app; //remove this line if uncommenting the app.listen to bring it back to the Express 3 way
