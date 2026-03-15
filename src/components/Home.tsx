import { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

//ICONS
import { VscColorMode } from 'react-icons/vsc';
import { FaUser } from 'react-icons/fa';

import { GiHamburgerMenu } from 'react-icons/gi';

//CONTEXT
import { Context } from '../context/ContextProvider';

//TYPE
import type { ReactNode } from 'react';

type Props = {
    user: Record<string, any> | null;
    children?: ReactNode;
};

const Home = ({ children }: Props) => {

    //CONTEXT
    const { theme, setTheme, user } = useContext(Context)!;

    //ROUTER
    const navigate = useNavigate()

    //STATE
    const [menu, setMenu] = useState<boolean>(false);
    const [config, setConfiig] = useState<boolean>(false);

    //////////////// FUNCTIONS /////////////////////////
    const clickMenu = (): void => {
        menu ? setMenu(false) : setMenu(true);
        setConfiig(false);
    };

    const clickConfig = (): void => {
        config ? setConfiig(false) : setConfiig(true);
        setMenu(false);
    };

    const alterTheme = (): void => {
        theme ? setTheme(false) : setTheme(true);
    };
    ////////////////////////////////////////////////////

    return (
        <>
            <header className="w-screen min-h-20 flex justify-between items-center bg-linear-to-br from-gray-700 to-gray-500 px-[10vw] z-50">
                <button data-element="Menu" className="p-3 hover:bg-blue-100/10 hover:border/5">
                    <GiHamburgerMenu
                        className="text-3xl text-white hover:pointer "
                        onClick={clickMenu}
                    ></GiHamburgerMenu>
                </button>

                <nav
                    className={`absolute top-20 left-0 w-3/5 min-h-screen bg-gray-700/90 z-50
                        border-r border-sky-300 shadow-[2px_0px_3px_#010100,2px_0px_10px_#000000,0_0px_5px_#FFFFFF]
                        transform transition-all duration-700 ease-in-out
                        md:w-100
                        ${!menu ? '-translate-x-full opacity-0' : ' translate-x-0 opacity-100'} `}
                >
                    <div className="w-full min-h-full flex flex-col justify-center items-center text-white font-mono [text-shadow:1px_1px_10px_black]]">
                        <Link className="w-full py-3 text-center" to={'/'} onClick={() => setMenu(false)}>
                            Home
                        </Link>
                        <Link className="w-full py-3 text-center" to={'/effect'} onClick={() => setMenu(false)}>
                            useEffect
                        </Link>
                        <Link className="w-full py-3 text-center" to={'/state'} onClick={() => setMenu(false)}>
                            useState
                        </Link>
                        <Link className="w-full py-3 text-center" to={'/ref'} onClick={() => setMenu(false)}>
                            useRef
                        </Link>
                        <Link className="w-full py-3 text-center" to={'/tarefas'} onClick={() => setMenu(false)}>
                            Tarefas
                        </Link>
                        <Link className="w-full py-3 text-center" to={'/treino'} onClick={() => setMenu(false)}>
                            Treino
                        </Link>
                    </div>
                </nav>

                <button data-element="Theme" className="flex gap-4">
                    <VscColorMode className="text-2xl text-white" onClick={alterTheme} />
                    <h1 className="font-black text-white">Theme</h1>
                </button>

                <div
                    data-element="User"
                    className="flex flex-row gap-4 items-center justify-center text-white font-black p-4 bg-gray-400/60 rounded-[100%] focus:bg-slate-600"
                    onClick={clickConfig}
                >
                    <div
                        className={`absolute top-20 right-0 w-1/2 max-h-1/3 bg-gray-700 z-50 text-center text-[0.7rem] p-4
                        border-r border-sky-300 shadow-[2px_0px_3px_#010100,2px_0px_10px_#000000,0_0px_5px_#FFFFFF]
                        transform transition-all duration-700 ease-in-out
                        md:w-100 md:text-[1.0rem]
                        ${!config ? 'hidden opacity-0' : ' translate-x-0 opacity-100'} `}
                    >
                        <h2>{user?.nome}</h2>
                        <h2>{user?.email}</h2>
                        <h2>{user?.cpf}</h2>
                        <button className='w-1/2 p-1 mt-2 bg-slate-400 rounded-lg' onClick={() => { navigate('/update-profile')}}>Editar</button>
                    </div>
                    <FaUser className="text-2xl" />
                </div>
            </header>

            <main
                className={`flex-1 w-screen min-h-screen h-full py-4 px-[5vw] flex flex-col justify-start items-center
                            transform transition-all delay-300 ease-in-out relative
-                           ${!theme ? 'bg-gray-400' : 'bg-gray-700'}

                            ${
                                menu || config
                                    ? "before:content-[''] before:absolute before:inset-0 before:bg-black/70 before:min-h-screen before:transition-opacity before:duration-500 before:delay-75 before:opacity-100"
                                    : 'before:opacity-0'
                            }
-                           md:px-[10vw]`}
                onClick={() => {
                    (setConfiig(false), setMenu(false));
                }}
            >
                {children}
            </main>

            <footer className="w-screen px-[10vw] py-4 bg-gray-600 text-[0.9rem] text-white text-center">
                <h1>By Leandro Brito</h1>
            </footer>
        </>
    );
};

export default Home;
