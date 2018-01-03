const express = require("express")
const pg = require("pg")
const path = require('path')
const PORT = process.env.PORT || 5000

const app = express()

app.use(express.static(path.join(__dirname, 'public')))
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')
db = null;
app.listen(PORT, () => {
    console.log(`GAP-GAINER Listening on ${ PORT }`)
    pg.connect(process.env.DATABASE_URL, function(err, client, done) {
        if (err) {
            console.error(err); response.send("Error " + err);
        } else {
            db = client;
        }
    })
})

var postgre = require("./routes/postgre");
var crypto  = require("./routes/cryptocurrency");

app.get('/', (req, res) => res.send("cool"))
app.get('/db', postgre.getTestTable)
app.get('/get_current_rate', crypto.getCurrentRate)