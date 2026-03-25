import useTraining from '../../hooks/useTraining';
import { useNavigate } from 'react-router-dom';
import { DiaSemana } from '../../types/EnumDiaSemana';
import { useEffect, useRef, useState } from 'react';


const DiaTreino = () => {

    //************************* Data ********************************
    const date = new Date();
    const today: number = Number(date.getDay() + 1);
    console.log('hoje é:', today);

    const [day, setDay] = useState<number>(today);

    //************************** Alterar Data **************************/
    const refDia = useRef<HTMLSelectElement | null>(null);

    const handleAlterDay = ()  => {

        if(!refDia.current) return

        const diaSelect = Number(refDia.current.value);
        setDay(diaSelect)
    }

    //Router
    const navigate = useNavigate();

    //CustomHooks
    const { musculos, exercises, treinos } = useTraining();

    //*********************** Filtrar treinos por dia*********************** */
    const treinosFiltrados = treinos.filter((treino) => treino.diaSemana == day);

    /********************************* Renderização ***************************/
    useEffect(() => {
        console.log('DiaTreino renderizou');
        console.log('Dia selecionad: ' +day)
    }, [day]);

    return (
        <div className="min-h-screen p-6 flex justify-center w-full">
            <div className="w-full max-w-3xl space-y-6">
                {treinosFiltrados.length == 0 || !treinos ? (
                    <div className="text-center text-lg min-h-full w-full">
                        <h1 className="text-[1.2rem] text-black">Não há dados disponíveis</h1>
                        <div>
                            <button
                                className="bg-blue-500 flex-1 text-white py-2 p-6 rounded cursor-pointer border-gray-300 animate-bounce mt-6"
                                onClick={() => {
                                    navigate('/criar-treino');
                                }}
                            >
                                Montar treino
                            </button>
                        </div>
                    </div>
                ) : (
                    <div className="space-y-4">
                        <h1>Dia da semana</h1>

                        <select ref={refDia} className="bg-gray-200 p-2 w-full" onChange={handleAlterDay} required>
                            <option value="">Selecione um dia:</option>

                            <option value={DiaSemana.Domingo}>Domingo</option>
                            <option value={DiaSemana.Segunda}>Segunda-feira</option>
                            <option value={DiaSemana.Terca}>Terça-feira</option>
                            <option value={DiaSemana.Quarta}>Quarta-feira</option>
                            <option value={DiaSemana.Quinta}>Quinta-feira</option>
                            <option value={DiaSemana.Sexta}>Sexta-feira</option>
                            <option value={DiaSemana.Sabado}>Sábado</option>
                        </select>

                        {treinosFiltrados.map((treino) => (
                            <div
                                key={treino.id}
                                className="treino bg-gray-800 rounded-2xl shadow-lg p-6 border border-gray-700"
                            >
                                <div className="flex justify-between items-center mb-4">
                                    <h2 className="text-2xl font-bold text-green-400">{treino.TipoTreino.nome}</h2>

                                    <span className="text-sm bg-gray-700 px-3 py-1 rounded-full">
                                        Dia {treino.diaSemana}
                                    </span>
                                </div>

                                <h3 className="text-lg font-semibold mb-3 text-gray-200">Exercícios</h3>

                                <div className="space-y-4">
                                    {treino.Exercicio.map((exercicio: any) => (
                                        <div key={exercicio.id} className="exercicio bg-gray-700 rounded-xl p-4">
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
};;;;

export default DiaTreino;
