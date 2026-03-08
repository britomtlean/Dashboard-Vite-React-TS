import { useState, useRef, useEffect} from 'react';
import { Task } from '../data/Task';
import { FaCircleCheck } from 'react-icons/fa6';

type TaskModel = {
    id?: number,
    desc: string
    status?: boolean
}

const Tarefas = () => {

    //REF -- input
    const refTask = useRef<HTMLInputElement | null>(null);

    //STATE -- Tarefas armazenadas
    const [tasks, setTasks] = useState<Array<TaskModel>>([]);

    /////////////////////////////////////////////////////////////////////////

    //FUNCTIONS
    const addTask = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const refTaskClean = refTask.current?.value.trim();

        if (!refTask.current?.value || !refTaskClean) {
            return alert('Inseira um valor');
        }

            console.log('Task inserida:', refTask.current?.value);

                const newTask: TaskModel = {
                    desc: refTask.current?.value!,
                };

                Task.createTask(newTask).then(()=>{
                    Task.getTask()
                        .then(data => setTasks(data))
                        .catch(er => console.error(er));
                })

        refTask.current.value = ''
    }

    const handleDelete =  (id: number) => {
        Task.deleteTask(id)
        .then(() => {Task.getTask().then(data => setTasks(data))})
        .catch(er => console.error(er))
    }

    const handleUpdate = (id: number) => {
        Task.updateTask(id)
            .then(() => {
                Task.getTask().then((data) => setTasks(data));
            })
            .catch((er) => console.error(er));
    };
    //////////////////////////////////////////////////////////////////////////

    //EFFECT
    useEffect(()=>{
        Task.getTask()
        .then(data => {setTasks(data)})
        .catch(er => console.error(er))
    },[])
    ///////////////////////////////////////////////////

    return (
        <div className="w-full h-full flex flex-col gap-6 justify-start items-center">
            <h1 className="font-semibold text-black text-4xl">Tarefas</h1>
            <form
                className="w-full flex justify-center items-center gap-4
                md:w-1/2"
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
                        focus:border-2 focus:border-cyan-300
                        transition
                        duration-200"
                    placeholder="Digite aqui sua tarefa"
                />
                <input
                    type="submit"
                    className="bg-blue-500 text-white py-2 p-6 rounded cursor-pointer border-gray-300"
                    value="Salvar"
                />
            </form>

            <ul className="w-full h-full md:w-1/2">
                <div className="w-full max-h-2/3 overflow-y-scroll!">
                    {tasks.length === 0 ? (
                        <h1 className="text-center mt-10">Nenhuma tarefa disponível</h1>
                    ) : (
                        tasks.map((task) => (
                            <div
                                className="flex m-0.5 flex-col mb-4
                                            md:flex-row md:mb-0"
                                key={task.id}
                            >
                                <li
                                    className={`
                                        flex justify-between items-center w-full
                                        px-4 py-3
                                        border border-gray-200
                                        hover:bg-gray-100
                                        transition
                                        duration-200
                                        ${task.status ? 'bg-teal-200' : 'bg-amber-100'}
                                    `}
                                >
                                    {task.desc}
                                    <FaCircleCheck className={`${task.status ? 'block text-purple-700' : 'hidden'}`} />
                                </li>
                                <div className='w-full flex justify-center'>
                                    <input
                                        type="submit"
                                        className="bg-[#a50d38] flex-1 text-white py-2 p-4 rounded cursor-pointer border-gray-300 mr-0.5"
                                        onClick={() => handleDelete(task.id!)}
                                        value="Remover"
                                    />
                                    <input
                                        type="submit"
                                        className="bg-[#07815f] flex-1 text-white py-2 p-4 rounded cursor-pointer border-gray-300"
                                        onClick={() => handleUpdate(task.id!)}
                                        value="Concluir"
                                    />
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </ul>
        </div>
    );
};

export default Tarefas;
