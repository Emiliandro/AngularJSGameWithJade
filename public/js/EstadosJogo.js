class EstadosJogo{
    constructor(telaStart, telaJogo, telaOver, telaWin){
        this._telaStart = document.querySelector(telaStart);
        this._telaJogo = document.querySelector(telaJogo);
        this._telaOver = document.querySelector(telaOver);
        this._telaWin = document.querySelector(telaWin);
    }

    getTelaJogo(){
        this.comandosTela(this._telaJogo, this.telaStart, this._telaOver, this._telaWin);
    }
    getTelaOver(){
        this.comandosTela(this._telaOver,this.telaStart, this._telaJogo,this._telaWin);
    }
    getTelaWin(){
        this.comandosTela(this._telaWin,this.telaStart, this._telaJogo,this._telaOver,);
    }
    getTelaStart(){
        this.comandosTela(this._telaStart, this._telaJogo, this._telaOver,this._telaWin);
    }
    comandosTela(tela1, tela2, tela3, tela4){
        this.ativaTela(tela1);
        this.desativaTela(tela2);
        this.desativaTela(tela3);
        this.desativaTela(tela4);
    }
    desativaTela(valor){
        if(!valor.classList.contains('desativo')){
            valor.classList.add('desativo');
        }
    }
    ativaTela(valor){
        if(valor.classList.contains('desativo')){
            valor.classList.remove('desativo');
        } 
    }
}