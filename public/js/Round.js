class Round {
    constructor() {
        this.duracao = 0;
    }

    novoRound(){
        this.duracao++;
    }

    getNumeroDoRound(){
        return this.duracao;
    }
    calculaPontuacao(vidaDoJogador){
        if (vidaDoJogador > 0){
            return (vidaDoJogador * 1000) / this.duracao;
        } else{
            return 0;
        }
    }
    getPontuacao(vidaDoJogador){
        var pontuacaoAtual = this.calculaPontuacao(vidaDoJogador);
        
        if (isFinite(pontuacaoAtual)){
            return 0;
        } else {
            return pontuacaoAtual;
        }
    }
}