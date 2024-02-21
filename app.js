const path = require('path');
const express = require("express");
const bodyParser = require("body-parser");

const app = express();

const adminRouter = require('./routes/admin');
const shopRoutes = require('./routes/shop');
const contactUs = require('./routes/contact-us');
const success = require('./routes/success');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/admin', adminRouter);
app.use(shopRoutes);
app.use(contactUs);
app.use(success);

app.use((req, res, next) => {
  res.status(404).sendFile(path.join(__dirname, 'views', '404.html'))
})

app.listen(4000, () => {
  console.log("Server is running on port 4000");
});
