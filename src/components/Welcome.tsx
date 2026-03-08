import { useContext, useRef, useState, useEffect } from 'react';
import { Context } from '../context/ContextProvider';

const Welcome = () => {
    //CONTEXT
    const { message, user } = useContext(Context)!;

    //REF
    const refMessage = useRef<HTMLHeadingElement | null>(null);

    //STATE
    const [active, setActive] = useState<boolean>(false);

    useEffect(() => {
        if (!refMessage.current) return;

        let contador = 100;

        const interval = setInterval(() => {
            contador += 3;

            if (refMessage.current) {
                refMessage.current.style.top = `${contador}px`;
            }

            setActive((active ? false : true));

            if (contador >= 230) {
                clearInterval(interval);
            }
        }, 15);

        return () => clearInterval(interval);
    }, []);


    return (
        <div className="w-full h-full flex flex-col justify-start items-center gap-5 pt-20 text-center">
            <h1 className={`font-extrabold text-4xl absolute transition-all top-25 ease-out`} ref={refMessage}>
                {message}
            </h1>
            <h1 className="font-bold text-3xl">{user?.nome}</h1>
        </div>
    );
};

export default Welcome;
