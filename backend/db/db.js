const mongoose = require('mongoose');
const DB_URI = process.env.MONGODB_URI;
console.log(DB_URI);
const db = async () => {
  try {
    const { connection } = await mongoose.connect(DB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log(`server connected to database ${connection.host}`);
  } catch (error) {
    console.log('error occur on databate side ' + error);
    console.log('shutting down the server due to error');

    process.exit(1);
  }
};

module.exports = db;
