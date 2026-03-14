import { useEffect, useState } from 'react';
import { Treining } from '../data/Training';

const Treino = () => {
    const [dados, setDados] = useState<Array<Record<string, any>>>([]);
    useEffect(() => {
        Treining.treiningDay()
            .then((data) => {
                (console.log('componente treino', data), setDados(data));
            })
            .catch((er) => console.error(er));
    }, []);

    return (
        <div className="min-h-screen text-white p-6 flex justify-center w-full">
            <div className="w-full max-w-3xl space-y-6">

                {dados.length == 0 ? (
                    <div className="text-center text-gray-400 text-lg">
                        Não há dados disponíveis
                    </div>
                ) : (
                    <div className="space-y-6">
                        {dados.map((treino) => (
                            <div
                                key={treino.id}
                                className="treino bg-gray-800 rounded-2xl shadow-lg p-6 border border-gray-700"
                            >
                                <div className="flex justify-between items-center mb-4">
                                    <h2 className="text-2xl font-bold text-green-400">
                                        {treino.TipoTreino.nome}
                                    </h2>

                                    <span className="text-sm bg-gray-700 px-3 py-1 rounded-full">
                                        Dia {treino.diaSemana}
                                    </span>
                                </div>

                                <h3 className="text-lg font-semibold mb-3 text-gray-200">
                                    Exercícios
                                </h3>

                                <div className="space-y-4">
                                    {treino.Exercicio.map((exercicio: any) => (
                                        <div
                                            key={exercicio.id}
                                            className="exercicio bg-gray-700 rounded-xl p-4"
                                        >
                                            <h4 className="text-md font-semibold text-green-300 mb-2">
                                                {exercicio.SubTipoTreino.nome}
                                            </h4>

                                            <ul className="space-y-1 text-sm text-gray-200">
                                                {exercicio.serie.map((serie: any, index: number) => (
                                                    <li
                                                        key={index}
                                                        className="flex justify-between bg-gray-800 px-3 py-1 rounded"
                                                    >
                                                        <span>Reps: {serie.rep}</span>
                                                        <span>{serie.peso} kg</span>
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default Treino;
