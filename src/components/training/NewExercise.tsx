import { useEffect, useRef, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import useTraining from "../../hooks/useTraining"
import SeriesInput from "./SeriesInput";
import type { ExerciseBody } from "../../types/Training";
import { Training } from "../../data/Training";

type Serie = {
    rep: number;
    peso: number;
};

const NewExercise = () => {

    const navigate = useNavigate()

    //Dados URL
    const params = useParams();

    //Hook
    const { exercises } = useTraining();

    //Ref
    const refDia = useRef<HTMLSelectElement | null>(null);

    //Filtra os exercicios baseado no musculo recebido na url
    const exercisesFiltred = exercises.filter((exercise) => exercise.TipoTreino.nome == params.musculo);

    //state para Arrays de series
    const [series, setSeries] = useState<Array<Serie>>([]);

    //Functions

    //Recebe as series do componente filho e armazena no state
    const handleSeriesChange = (series: Serie[]) => {
        console.log('Recebi do filho:', series);
        setSeries(series);
    };

    //Cria o objeto e faz a requisição para API
    const handleAddExercise = (idTreino: any, idExercise: any, serie: any) => {

        const exercise: ExerciseBody = {
            idTreino: Number(idTreino),
            idSubTipoTreino: Number(idExercise),
            serie: serie,
        };

        console.log('Objeto criado:',exercise);
        Training.addExercices(exercise).then(() => { (alert('Treino adicionado com sucesso!'), navigate('/treino-do-dia')); });
    };

    useEffect(() => {
        console.log('NewExercise renderizou', series);
    }, [series]);

    return (
        <div className="space-y-3.5">
            <h1 className="font-mono">
                Treino: <span className="font-extrabold text-white">{params.id}</span>
            </h1>
            <h1 className="font-mono">
                Dia: <span className="font-extrabold text-white">{params.dia}</span>
            </h1>
            <h1 className="font-mono">
                Musculo: <span className="font-extrabold text-white">{params.musculo}</span>
            </h1>
            <h1 className="font-mono">Exercicios:</h1>
            {exercises.length == 0 ? (
                'loading'
            ) : (
                <select
                    ref={refDia}
                    onChange={() => {
                        console.log(refDia.current?.value);
                    }}
                    className="bg-slate-800 p-2 w-full text-white font-bold border"
                >
                    {exercisesFiltred.map((exercises) => (
                        <option key={exercises.id} value={exercises.id}>
                            {exercises.nome}
                        </option>
                    ))}
                </select>
            )}
            <SeriesInput onChange={handleSeriesChange} />
            <button
                className="btn-primary w-full"
                onClick={() => {
                    handleAddExercise(params.id, refDia.current?.value, series);
                }}
            >
                Enviar
            </button>
        </div>
    );
}

export default NewExercise
