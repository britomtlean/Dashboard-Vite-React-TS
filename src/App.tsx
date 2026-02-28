//import Home from './components/Home';
import Home from './components/Home';
import { Outlet } from 'react-router-dom';
import { useContext } from 'react';
import { Context } from './context/ContextProvider';

function App() {

    const { user } = useContext(Context)!;

    return (
        <>
            <Home nome={user}>
                    <Outlet />
            </Home>
        </>
    );
}

export default App;
