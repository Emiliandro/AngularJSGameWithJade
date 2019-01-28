class Personagem {
    constructor() {
        this.valorAcao = 0;
    }

    getNovoValorAcao(min, max) {
        return Math.round(Math.random(min, max) * 10);
    }
}
