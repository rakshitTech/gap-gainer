exports.getTestTable = getTestTable;

function getTestTable (req, res) {
    db.query('SELECT * FROM test_table', function(err, result) {
        if (err) {
            console.error(err); 
            res.send("Error " + err); 
        } else {
            res.render('pages/db', {results: result.rows} ); 
        }
    });
}
