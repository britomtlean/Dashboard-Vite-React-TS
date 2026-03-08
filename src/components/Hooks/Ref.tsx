//Tipagem usando useRef com elementos HTML

import { useRef, useContext } from 'react';
import { Context } from '../../context/ContextProvider';

const Ref = () => {
    //TESTE RENDER
    console.log('Componente Renderizou');

    const { setMessage, message } = useContext(Context)!;
    const inputRef = useRef<HTMLInputElement>(null);

    //useEffect(() => {setMessage('Sua Mensagem aqui');},[])

    const focarInput = () => {
        if (inputRef.current && inputRef.current.value) {
            //inputRef.current.style.color = 'green'
            return (setMessage(inputRef.current.value), (inputRef.current.value = ''));
        }
        alert('Digite um valor!');
    };

    return (
        <>
            <input
                type="text"
                name="text"
                className="bg-slate-300/35 my-4 rounded-xl border p-2 w-full
                md:w-1/4"
                ref={inputRef}
                placeholder="Digite sua mensagem"
            />
            <button
                className="w-full px-4 py-2 bg-blue-500 text text-white
                        border border-gray-300 rounded-lg shadow-sm
                        focus:outline-none
                        focus:ring-2 focus:ring-cyan-500
                        focus:border-white
                        transition
                        duration-200"
                onClick={focarInput}
            >
                Alterar Menssagem
            </button>
            <h1 className="font-mono text-3xl mt-8">{message}</h1>
        </>
    );
};

export default Ref;
