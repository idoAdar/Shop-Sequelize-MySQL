const express = require('express');
const path = require('path');

const sequelize = require('./utill/database');

const shopRoutes = require('./routes/shopRoutes/shopRoutes');
const adminRoutes = require('./routes/adminRoutes/adminRoutes');

const app = express();

const bodyParser = require('body-parser');  // body-parser for forms
app.use(bodyParser.urlencoded());

app.set('view engine', 'ejs');  // ejs
app.set('views', 'views');

app.use(express.static(path.join(__dirname, 'public'))); // css

app.use('/admin', adminRoutes); // routes
app.use('/', shopRoutes);

sequelize.sync()    // the sync method create our tables in case its not created - we can use sync.({force: true}) to force new creation of tables
.then(() => {
    app.listen(3000);
})
.catch(err => console.log(err))
