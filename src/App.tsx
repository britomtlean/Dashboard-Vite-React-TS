import { useContext, useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';

import Home from './components/Home';
import { Context } from './context/ContextProvider';
import { FetchLogin } from './data/FetchLogin';

function App() {

    const { setUser, user } = useContext(Context)!;
    const navigate = useNavigate();

    useEffect(() => {
        FetchLogin.getProfile()
            .then((data) => setUser(data))
            .catch((er) => console.log(er));
    }, []);

        useEffect(() => {

            if (user) return;

            const redirect = setTimeout(() => {navigate('/login')}, 5000);

            return () => clearInterval(redirect)

        },[user])



    return (
        <>
            {!user ? (
                <div className="bg-slate-400 h-screen w-full justify-center items-center flex self-center">
                    <h1 className="font-mono animate-pulse text-2xl">Carregando...</h1>
                </div>
            ) : (
                <Home user={user}>
                    <Outlet />
                </Home>
            )}
        </>
    );
}

export default App;
