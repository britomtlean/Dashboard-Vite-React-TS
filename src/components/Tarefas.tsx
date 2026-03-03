import { useState, useRef, useEffect} from 'react';
import { Task } from '../data/Task';

type TaskModel = {
    desc: string
}

const Tarefas = () => {

    //REF -- input
    const refTask = useRef<HTMLInputElement | null>(null);

    //STATE -- Tarefas armazenadas
    const [tasks, setTasks] = useState<Array<TaskModel>>([]);

    ////////////////////////////////////////////////////////////////

    //FUNCTIONS
    const addTask = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (!refTask.current?.value){
            return alert('Inseira um valor')
        }

            console.log('Task inserida:', refTask.current?.value);

                const newTask: TaskModel = {
                    desc: refTask.current?.value!,
                };

                Task.createTask(newTask).then(()=>{
                    Task.getTask()
                        .then((data) => {
                            setTasks(data);
                        })
                        .catch((er) => console.error(er));
                })

            /*
            if(!prev){
                const newTask: TaskModel = {
                    desc: refTask.current?.value!,
                };
                return [newTask]
            }
            const newTask: TaskModel = {
                desc: refTask.current?.value!,
            };
            const newTasks : Array<TaskModel> = [...prev, newTask!];
            console.log('Todas as tarefas:', newTasks);
            return newTasks;
            */
    };
    //////////////////////////////////////////////////

    //EFFECT
    useEffect(()=>{
        Task.getTask()
        .then((data)=> { setTasks(data)})
        .catch((er)=>console.error(er))
    },[])
    ///////////////////////////////////////////////////

    return (
        <div className="w-full h-full flex flex-col gap-6 justify-start items-center">
            <h1 className="font-semibold text-black text-4xl">Tarefas</h1>
            <form
                className="flex justify-center items-center gap-4 "
                onSubmit={(e) => {addTask(e)}}
            >
                <input
                    type="text"
                    ref={refTask}
                    className="
                        w-full px-4 py-2 bg-gray-200
                        border border-gray-300 rounded-lg shadow-sm
                        focus:outline-none
                        focus:ring-2 focus:ring-blue-500
                        focus:border-blue-500
                        transition
                        duration-200
                        "
                        placeholder='Digite aqui sua tarefa'
                />
                <input
                    type="submit"
                    className="bg-blue-500 text-white py-2 p-6 rounded cursor-pointer border-gray-300"
                    value="Salvar"
                />
            </form>

            <ul className="w-full md:w-1/2">
                <div className="w-full">
                    {!tasks ? (
                        <h1>Nenhuma tarefa disponível</h1>
                    ) : (
                        tasks.map((task, index) => (
                            <li
                                key={index}
                                className="
                                flex justify-between items-center w-full
                                bg-gray-50
                                px-4 py-3
                                border border-gray-200
                                hover:bg-gray-100
                                transition
                                duration-200
                            "
                            >
                                {task.desc}
                            </li>
                        ))
                    )}
                </div>
            </ul>
        </div>
    );
};

export default Tarefas;
