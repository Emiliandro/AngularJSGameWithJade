var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');

// ----------------------------------
// ------------ VIEWS     -----------
// ----------------------------------
var app = express();

app.set('views', path.join(__dirname,'views'));
app.set('view engine', 'jade'); 
// jade é usado para reutlização de código do head e do menu

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}));

app.use(express.static(path.join(__dirname, 'public')));

// ----------------------------------
// ------------ URLS      -----------
// ----------------------------------

app.get('/', function(req, res){
     res.render('index');
});

app.get('/sobre', function(req, res){
    res.render('sobre');
});

app.get('/jogo', function(req, res){
    res.render('jogo');
});


app.get('/results', function(req,res){
        var resultados = [
            {playerName: 'Fulano', data: '18:51', score: '227'},
            {playerName: 'Ciclano', data: '08:41', score: '481'},
            {playerName: 'Beltrano', data: '20:54', score: '150'},
            {playerName: 'Altrano', data: '00:21', score: '900'},
        ];
        res.json(resultados); 
    }  

);

app.post('/results', function(req,res){
    var resultados = req.body;
    resultados.push(resultado);
    res.json(resultado);
});

app.get('/rank', function(req, res){
    res.render('rank');
});

// ----------------------------------
// ------------ SERVER   -----------
// ----------------------------------

app.listen (3000, function(err){
    if (err){
        console.log(err);
    } else {
        console.log("Listening on port 3000");
    }
})