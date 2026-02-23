import { useState } from 'react';
import { Financas } from '../services/Financas';

export default function CalculadoraFinancas() {
    const [precoCusto, setPrecoCusto] = useState<number>();
    const [porcentagemLucro, setPorcentagemLucro] = useState<number>();
    const [resultado, setResultado] = useState<number>(0);

    const calcular = () => {
        if (porcentagemLucro == null || precoCusto == null) {
            alert('Digite um valor válido');
            return;
        }

        if (porcentagemLucro > 70) {
            alert('A porcentagem de lucro não deve ser maior que 70%');
            return;
        }
        const total = Financas.calcularPrecoTotal(precoCusto, porcentagemLucro);

        setResultado(total);
    };

    const formatarMoeda = (valor: number) => {
        return valor.toLocaleString('pt-BR', {
            style: 'currency',
            currency: 'BRL',
        });
    };

    return (
        <div style={styles.container}>
            <h2 className="font-semibold text-[1.2rem] mb-3">Calculadora de Preço:</h2>

            <div style={styles.inputGroup}>
                <label>Preço de Custo:</label>
                <input
                    className="bg-teal-50/50 text-center rounded-[8px] outline-none p-1"
                    type="number"
                    onChange={(e) => setPrecoCusto(Number(e.target.value))}
                />
            </div>

            <div style={styles.inputGroup}>
                <label>Porcentagem de Lucro:</label>
                <input
                    className="bg-teal-50/50 text-center rounded-[8px] outline-none p-1"
                    type="number"
                    onChange={(e) => setPorcentagemLucro(Number(e.target.value))}
                />
            </div>

            <button className="w-[50%]" onClick={calcular} style={styles.button}>
                Calcular
            </button>

            <div style={styles.resultado}>
                <strong>Preço Final:</strong> {formatarMoeda(resultado)}
            </div>
        </div>
    );
}

const styles: { [x: string]: React.CSSProperties } = {
    container: {
        width: '400px',
        margin: '40px auto',
        padding: '20px',
        border: '1px solid #ccc',
        borderRadius: '8px',
        textAlign: 'center',
        fontFamily: 'Arial',
    },
    inputGroup: {
        marginBottom: '15px',
        display: 'flex',
        flexDirection: 'column',
        textAlign: 'left',
    },
    button: {
        padding: '8px 16px',
        cursor: 'pointer',
    },
    resultado: {
        marginTop: '20px',
        fontSize: '18px',
    },
};
