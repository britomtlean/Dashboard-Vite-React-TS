import { useContext, useState } from 'react';
import { Link } from 'react-router-dom';

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

const Home = ({ user, children }: Props) => {
    //CONTEXT
    const { theme, setTheme } = useContext(Context)!;

    //STATE
    const [menu, setMenu] = useState<boolean>(false);

    //////////////// FUNCTIONS /////////////////////////
    const clickMenu = (): void => {
        menu ? setMenu(false) : setMenu(true);
    };

    const alterTheme = (): void => {
        theme ? setTheme(false) : setTheme(true);
    };
    ////////////////////////////////////////////////////

    return (
        <>
            <header className="w-screen min-h-20 flex justify-between items-center bg-linear-to-br from-gray-700 to-gray-500 px-[10vw] z-50">

                <button data-element= "Menu"
                className="p-3 hover:bg-blue-100/10 hover:border/5">
                    <GiHamburgerMenu
                        className="text-3xl text-white hover:pointer "
                        onClick={clickMenu}
                    ></GiHamburgerMenu>
                </button>

                <nav
                    className={`absolute top-20 left-0 w-3/5 min-h-full bg-gray-700/90 z-50
                        border-r border-sky-300 shadow-[2px_10px_3px_#010100,2px_20px_10px_#000000,0_10px_5px_#FFFFFF]
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
                    </div>
                </nav>

                <button data-element="Theme"
                 className="flex gap-4">
                    <VscColorMode className="text-2xl text-white" onClick={alterTheme} />
                    <h1 className="font-black text-white">Theme</h1>
                </button>

                <div data-element="User"
                    className="flex flex-row gap-4 items-center justify-center text-white font-black">
                    <FaUser className="text-2xl" />
                    <h2 className="hidden md:block">{user?.nome ?? 'Default'}</h2>
                </div>
            </header>

            <div
                className={`transform transition-all duration-500 ease-out
                    ${menu ? 'absolute w-screen h-screen bg-black/60 ' : 'opacity-0 invisible'}`}
                onClick={() => setMenu(false)}
            ></div>

            <main
                className={`'w-screen h-screen py-4 px-[10vw] flex flex-col justify-start items-center transform transition-all delay-300 ease-in-out
                ${!theme ? 'bg-gray-400' : 'bg-gray-700'}`}
            >
                {children}
            </main>

            <footer className="w-screen px-[10vw] absolute bottom-0 py-4 bg-gray-600 text-[0.8rem] text-center z-50">
                <h1>Todos os direitos reservados.</h1>
            </footer>
        </>
    );
};

export default Home;
