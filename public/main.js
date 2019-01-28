// ----------------------------------
// ------------ construtos ----------
// ----------------------------------
let maquinaDeEstados = new EstadosJogo('#TelaComecarJogo', '#TelaJogarJogo', '#TelaPerdeuJogo', '#TelaEnviarResultado');

let logDeAcoes = new LogDeJogo(),
    vidaMonstro = new BarraDeHP(1, "#MonsterLifeBar"),
    vidaPlayer = new BarraDeHP(0, "#PlayerLifeBar"),
    playerDoJogo = new Personagem(),
    monstroDoJogo = new Personagem(),
    ataqueEspecialPlayer = false,
    numeroDeTurnos = new Round(),
    ultimoTurnoDoAtaqueEsp = 0,
    valorAcaoPlayer = 0,
    valorAcaoMonstro = 0,
    btnAtaque = document.querySelector('#btnAtaque'),
    btnCura = document.querySelector('#btnCura'),
    btnAtaqueEsp = document.querySelector('#btnAtaqueEsp'),
    btnDesistir = document.querySelector('#btnDesistir'),
    telaDeLog = document.querySelector('#log'),
    telaDeRound = document.querySelector('#roundAtual'),
    btnComecarJogo = document.querySelector('#btnComecarJogo');


// ----------------------------------
// ------- game controller  ---------
// ----------------------------------


function rodadaDeJogo() {
    inteligenciaMonstro();
    updateTelaDeLog();

    vidaMonstro.etiquetacao();
    vidaPlayer.etiquetacao();

    condicoesFimDeJogo();

    numeroDeTurnos.novoRound();
    telaDeRound.innerHTML = "Round Nº" + numeroDeTurnos.getNumeroDoRound();

}


function bemVindo() {
    logDeAcoes.addToLog('global', 'Player andava pela floresta quando encontra um monstro!');

    vidaMonstro.etiquetacao();
    vidaPlayer.etiquetacao();

    maquinaDeEstados.getTelaStart();
    console.log(logDeAcoes);
}

// ----------------------------------
// ------------ regrasDeJogo ---------
// ----------------------------------

function playerPodeUsarAtaqueEsp() {
    if (ataqueEspecialPlayer == true) {
        return false;
    } else {

        return true;
    }
}

function reativaAtaqueEspecial() {
    if (numeroDeTurnos != 0) {
        if ((numeroDeTurnos - ultimoTurnoDoAtaqueEsp) > 2) {
            ataqueEspecialPlayer = false;
        }
    }
}


function escolhaDeAtaqueMonstro() {

    if (vidaMonstro.vida < 100) {
        return Math.round(Math.random(0, 3) * 10);
    } else {
        return Math.round(Math.random(0, 4) * 10);
    }
}

function inteligenciaMonstro() {
    var acaoMonstro = escolhaDeAtaqueMonstro();
    if (vidaMonstro.vida < 100) {
        if (acaoMonstro < 8) {
            acaoDeAtaqueMonstro(acaoMonstro);
        } else {
            acaoDeCuraMonstro(acaoMonstro);
        }
    } else {
        acaoDeAtaqueMonstro(acaoMonstro);
    }
}

function acaoDeCuraMonstro(valor) {
    logDeAcoes.addToLog('monstro', 'Monstro se curou! +' + valorAcaoMonstro + " de vida ao Monstro!");
    vidaMonstro.calculoCura(valor);
}

function acaoDeAtaqueMonstro(valorDeAcao) {
    if (valorDeAcao < 6) {
        valorAcaoMonstro = monstroDoJogo.getNovoValorAcao(5, 8);
        logDeAcoes.addToLog('monstro', 'Monstro atacou o Player! +' + valorAcaoMonstro + " de dano ao Player!");
    } else {
        valorAcaoMonstro = monstroDoJogo.getNovoValorAcao(7, 11);
        logDeAcoes.addToLog('monstro', 'Monstro atacou o Player! +' + valorAcaoMonstro + " de dano ao Player!");
    }
    vidaPlayer.calculoDano(valorAcaoMonstro);

}


function updateTelaDeLog() {
    telaDeLog.innerHTML = logDeAcoes.jogo.join('');
}


// ----------------------------------
// ------------ controller  ---------
// ----------------------------------

window.onload = function() {
    bemVindo();
    updateTelaDeLog();
}


btnAtaque.onclick = function() {
    valorAcaoPlayer = playerDoJogo.getNovoValorAcao(5, 8);
    logDeAcoes.addToLog('player', 'Player atacou o monstro! +' + valorAcaoPlayer + " de dano ao Monstro!");
    vidaMonstro.calculoDano(valorAcaoPlayer);
    rodadaDeJogo();
}

btnAtaqueEsp.onclick = function() {
    if (playerPodeUsarAtaqueEsp()) {
        valorAcaoPlayer = playerDoJogo.getNovoValorAcao(7, 11);
        logDeAcoes.addToLog('player', 'Player usou um ataque especial no monstro! +' + valorAcaoPlayer + " de dano ao Monstro!");
        vidaMonstro.calculoDano(valorAcaoPlayer);
        rodadaDeJogo();
    } else {
        alert("Nessa rodada não é possível usar o ataque especial, selecione outra opção!");
    }

}

btnCura.onclick = function() {
    valorAcaoPlayer = playerDoJogo.getNovoValorAcao(5, 10);
    vidaPlayer.calculoCura(valorAcaoPlayer);
    logDeAcoes.addToLog('player', 'Player bebeu um estus flask! +' + valorAcaoPlayer + " de cura ao Player!");
    rodadaDeJogo();
}

btnDesistir.onclick = function() {
    logDeAcoes.addToLog('player', 'Player desistiu do jogo!');
    vidaPlayer.vida = 0;
    vidaPlayer.etiquetacao();
    condicoesFimDeJogo();
    maquinaDeEstados.getTelaOver();
}

btnComecarJogo.onclick = function() {
    maquinaDeEstados.getTelaJogo();
}

// ----------------------------------
// ------------ fim de jogo ---------
// ----------------------------------

function horaDeJogo() {
    let horario = new Date();
    return horario.getHours() + ":" + horario.getMinutes();
}


function condicoesFimDeJogo() {

    let atualVidaInimiga = vidaMonstro.getVida(),
        atualVidaJogador = vidaPlayer.getVida();

    if (atualVidaInimiga > 0 && atualVidaJogador <= 0) {
        jogadorPerdeu();
    } else if (atualVidaJogador > 0 && atualVidaInimiga <= 0) {
        jogadorVenceu();
    } else if (atualVidaJogador <= 0 && atualVidaInimiga <= 0) {
        jogadorPerdeu();
    }

}

function jogadorVenceu() {
    logDeAcoes.addToLog('global', 'O jogador matou o monstro!');
    fimDeJogo();
    maquinaDeEstados.getTelaWin();

}

function jogadorPerdeu() {
    logDeAcoes.addToLog('global', 'O Monstro matou o jogador!');
    fimDeJogo();
    maquinaDeEstados.getTelaOver();

}

function fimDeJogo() {

    updateTelaDeLog();


    let gameInputs = document.querySelector('#comandos');
    let gameResult = document.querySelector('#pontosNoJogo b');
    let gameInputsAlert = document.querySelector('#gameInputsAlert');

    telaDeRound.innerHTML = "";
    gameInputsAlert.innerHTML = 'O jogo acabou!';
    gameResult.innerHTML = numeroDeTurnos.getPontuacao(vidaPlayer.getVida()) + ' Pontos';

    gameInputs.classList.add("final");
    gameInputsAlert.classList.add("final");
}

// ----------------------------------
// ------------ ANGULARJS -----------
// ----------------------------------

angular.module('OsResultadoDoJogo').controller('EnvioDeResultados', function($scope, $http) {
    $scope.jogador = {};

    

    $scope.enviardados = function() {
        if ($scope.jogador.playerName == null) {
            alert("Preencha seu nome!");
        } else {

            $scope.jogador.data = horaDeJogo();
            $scope.jogador.score = numeroDeTurnos.getPontuacao(vidaPlayer.getVida());

            console.log($scope.jogador.playerName);
            console.log($scope.jogador.data);
            console.log($scope.jogador.score);

            $http.post('/results', 
                JSON.stringify({
                    playerName: $scope.jogador.playerName,
                    data: $scope.jogador.data, 
                    score: $scope.jogador.score
                })
            ).then(function() {
                console.log('enviado');
            }).catch (function(error){
                console.log("erro");
            });

        }
    };


});
