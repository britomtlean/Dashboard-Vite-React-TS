import { useState, useRef , useContext} from 'react';
import { Context } from '../context/ContextProvider';

type Task = {
    id?: number,
    user: string,
    desc: string
}

const Tarefas = () => {

////////////////////CONTEXT////////////////
    const { user } = useContext(Context)!;
//////////////////////////////////////////

    //ref
    const refTask = useRef<HTMLInputElement | null>(null);

    //state
    const [tasks, setTasks] = useState<Array<Task> | null>(null);

    //functions
    const addTask = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!refTask.current?.value){
            return alert('Inseira um valor')
        }
        setTasks((prev) => {
            console.log('Task inserida:', refTask.current?.value);

            if(!prev){
                const newTask: Task = {
                    user: user,
                    desc: refTask.current?.value!,
                };
                return [newTask]
            }
            const newTask: Task = {
                user: user,
                desc: refTask.current?.value!,
            };
            const newTasks : Array<Task> = [...prev, newTask!];
            console.log('Todas as tarefas:', newTasks);
            return newTasks;
        });
    };

    return (
        <div className="w-full h-full flex flex-col gap-6 justify-start items-center">
            <h1 className="font-semibold text-black text-4xl">Tarefas</h1>
            <form
                className="flex justify-center items-center gap-4 "
                onSubmit={(e) => {
                    addTask(e);
                }}
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
                                rounded-xl
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
