function dbConnection() {
  const mongoose = require("mongoose");

  const url = "mongodb://localhost/comments";

  // mongoose.connect(
  //     url,
  //     {
  //         userNewUrlParser:true,
  //         useUnifiedTopology:true,
  //         useFindAndModify:true
  //     });

  mongoose.connect(url);

  const connection = mongoose.connection;

  // const connection = mongoose.connection

  try {
    connection.once("open", function () {
      console.log("connected");
    });
  } catch (error) {
    console.log(error);
  }

  // connection.once('open', )
}

module.exports = dbConnection;