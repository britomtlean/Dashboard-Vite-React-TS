export class Financas {
    private static precoCusto: number;
    private static porcentagemLucro: number;
    private static porcentagemTotal: number = 100;

    private static porcentagemCusto: number;
    private static precoTotal: number;

    static calcularPrecoTotal: (x: number, y: number) => number = (x, y) => {
        this.precoCusto = x;
        this.porcentagemLucro = y;
        this.porcentagemCusto = this.porcentagemTotal - this.porcentagemLucro;

        this.precoTotal = this.precoCusto * (this.porcentagemTotal / this.porcentagemCusto);
        console.log(this.precoTotal);
        return this.precoTotal;
    };
}
