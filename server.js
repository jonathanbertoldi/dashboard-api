// ==============================
// pegando os pacotes necessários
// ==============================
var express    = require('express');
var app        = express();
var bodyParser = require('body-parser');
var morgan     = require('morgan');
var mongoose   = require('mongoose');

// gerenciador do jwt
var jwt = require('jsonwebtoken');

var config = require('./config');
var User   = require('./app/models/user');

// ==============================
// configuração
// ==============================
var port = process.env.PORT || 8080;
mongoose.connect(config.database);
app.set('superSecret', config.secret);

// usando o bodyParser para que possamos pegar a informação dos POST e/ou parâmetros da URL
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

// use morgan to log requests to the console
app.use(morgan('dev'));

// ==============================
// rotas da API
// ==============================

// pegando uma instância do router do express
var apiRoutes = express.Router();

// rota default [http://localhost:8080/api]
apiRoutes.get('/', function(req, res) {
    res.json({ message: 'Bem vindo a API de usuários!'});
});

// rota para retornar todos os usuários [GET - http://localhost:8080/api/users]
apiRoutes.get('/users', function(req, res) {
    User.find({}, function(err, users) {
        res.json(users);
    });
});

// aplicando as rotas na aplicação com o prefixo /api
app.use('/api', apiRoutes);

// ==============================
// iniciando o server
// ==============================
app.listen(port);
console.log("Olá! A API está rodando em http://localhost:" + port);