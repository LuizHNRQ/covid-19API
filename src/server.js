const app = require('./app');

app.listen(process.env.PORT || 3333, () => {
  console.log(`Server is listening on Port: ${process.env.PORT}`);
});
