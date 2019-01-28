class BarraDeHP {
    constructor(id, query) {
        this.vida = 100;
        this.identificador = id;
        this.queryObject = document.querySelector(query);
    }

    etiquetacao() {
        if (this.identificador == 0) {
            this.queryObject.innerHTML = "<span> Player " + this.vida + "% </span>";
        } else {
            this.queryObject.innerHTML = "<span> Monstro " + this.vida + "% </span>";
        }
        this.debugEstiloVida();

    }

    getVida(){
        return this.vida;
    }

    calculoDano(valor) {
        this.vida -= valor;
    }

    calculoCura(valor) {
        this.vida += valor;
        this.debugVida();
    }

    debugVida(){
        if (this.vida > 100) {
            this.vida = 100;
        }
    }

    debugEstiloVida(){
        if (this.vida < 20){
            this.queryObject.classList.add("final");
        } else {
            this.queryObject.classList.remove("final"); 
        }

        if (this.vida < 1){
            if (this.identificador == 0) {
                this.queryObject.innerHTML = "<span> Player está morto </span>";
            } else {
                this.queryObject.innerHTML = "<span> Monstro  está morto </span>";
            }
        }
    }

}