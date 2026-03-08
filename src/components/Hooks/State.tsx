import { useState } from 'react';

const State = () => {
    const [count, setCount] = useState<number>(0);

    return (
        <>
            <h2 className="m-4 text-black text-7xl">{count}</h2>
            <button
                className="w-full px-4 py-2 bg-blue-500 text text-white
                        border border-gray-300 rounded-lg shadow-sm
                        focus:outline-none
                        focus:ring-2 focus:ring-cyan-500
                        focus:border-white
                        transition
                        duration-200
                        md:w-1/4"
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
