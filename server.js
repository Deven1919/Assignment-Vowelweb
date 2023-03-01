const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config('./env');
const app = require('./app');
const port = process.env.PORT;
const DB = process.env.DATABASE.replace('<password>', process.env.PASSWORD);
//console.log(DB);
mongoose.set('strictQuery', true); // supress the notification show in console.
mongoose
  .connect(DB, {
    useNewUrlParser: true,
  })
  .then(() => {
    console.log('Connected to Database');
  })
  .catch((err) => {
    console.log('ERROR 💥', err);
  });

app.listen(port, () => {
  console.log(`App listening to port ${port}`);
});
