const express           = require('express');
const bodyParser        = require('body-parser');
const path              = require('path');
const adminRoutes       = require('./routes/admin');
const shopRoutes        = require('./routes/shop');
const app               = express();
const errorController   = require('./controllers/error');
const mongoConnect      = require('./util/database').mongoConnect;
const User              = require('./models/user');


app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static(path.join(__dirname, 'public')));

app.use((req, res, next) => {
    User.findById("616f51b4b778803db906a050")
        .then(user => {
            req.user = user;
            next();
        })
        .catch(err => console.log(err));
});

app.use('/admin', adminRoutes);
app.use(shopRoutes);
app.use(errorController.get404Page);

mongoConnect(() => {
    app.listen(3000);
});

