import { useState, useContext } from 'react';
import { Context } from '../../context/ContextProvider';

const State = () => {
    const [count, setCount] = useState<number>(0);
    const { setMessage } = useContext(Context)!;

    setMessage('useState')

    return (
        <>
            <h2 className="m-4 text-black text-7xl">{count}</h2>
            <button
                onClick={() => {
                    setCount(count + 1);
                }}
            >
                Click para adicionar
            </button>
        </>
    );
};

export default State;
