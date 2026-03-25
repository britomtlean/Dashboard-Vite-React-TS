import { useEffect, useState } from 'react';

const Effect = () => {
    const [count, setCount] = useState<number>(1);

    useEffect(() => {

        const interval =  setInterval(() => {
            setCount(count + 1);
        }, 1000);

         return () => clearInterval(interval);
    }, [count]);


    return (
        <>
            <h2 className='text-7xl mt-4'>{count}</h2>
        </>
    );
};

export default Effect;
