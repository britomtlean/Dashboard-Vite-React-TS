//Tipagem usando useRef com elementos HTML

import { useRef, useContext } from 'react';
import { Context } from '../context/ContextProvider';

const Ref = () => {

    //TESTE RENDER
    console.log('Componente Renderizou')

    const { setMessage, message } = useContext(Context)!;
    const inputRef = useRef<HTMLInputElement>(null);

    //useEffect(() => {setMessage('Sua Mensagem aqui');},[])

    const focarInput = () => {
        if (inputRef.current && inputRef.current.value){
            //inputRef.current.style.color = 'green'
            return (setMessage(inputRef.current.value), (inputRef.current.value = ''));
        }
        alert('Digite um valor!')
    };

    return (
        <>
            <h1>{message}</h1>
            <input
                type="text"
                name="text"
                className="bg-slate-300/35 my-4 rounded-xl border p-2 w-full
                md:w-1/4"
                ref={inputRef}
                placeholder='Digite sua mensagem'
            />
            <button onClick={focarInput}>Alterar Menssagem</button>
        </>
    );
};

export default Ref;
