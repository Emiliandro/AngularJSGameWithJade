
class LogDeJogo {
    constructor() {
        this.jogo = [];
    }

    addToLog(tipoAcao, acaoOcorrida) {
        if (tipoAcao == 'global') {
            this.jogo.unshift('<div class="action border '+ tipoAcao + ' text-center p-3">' + acaoOcorrida + '</div>');
        } else if (tipoAcao == 'player') {
            this.jogo.unshift('<div class="action border '+ tipoAcao + '  text-right p-3">' + acaoOcorrida + '</div>');

        } else if (tipoAcao == 'monstro') {
            this.jogo.unshift('<div class="action border '+ tipoAcao + '  text-left p-3">' + acaoOcorrida + '</div>');
        }
    }
}
