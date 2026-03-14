import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
//ROUTER
import { createBrowserRouter, RouterProvider } from 'react-router';
//CSS
import './index.css';
//COMPONENTS
import App from './App.tsx';

//Hooks
import Ref from './components/React-Hooks/Ref.tsx';
import State from './components/React-Hooks/State.tsx';
import Effect from './components/React-Hooks/Effect.tsx';

import Tarefas from './components/Tarefas.tsx';
import Login from './components/Login.tsx';
import Cadastro from './components/Cadastro.tsx';
//CONTEXT
import { ContextProvider } from './context/ContextProvider';
//import Welcome from './components/Welcome.tsx';
import ErrorPage from './components/ErrorPage.tsx';
import Sobre from './components/Sobre.tsx';
import Treino from './components/Treino.tsx';

let router = createBrowserRouter([
    {
        path: '/Login',
        element: <Login />,
    },
    {
        path: '/Cadastro',
        element: <Cadastro />,
    },
    {
        path: '/',
        element: <App />,
        errorElement: <ErrorPage/>,
        children: [
            {
                index: true,
                element: <Sobre/>
            },
            {
                path: '/state',
                element: <State />,
            },
            {
                path: '/ref',
                element: <Ref />,
            },
            {
                path: '/effect',
                element: <Effect />,
            },
            {
                path: '/tarefas/',
                element: <Tarefas />,
            },
            {
                path: '/treino',
                element: <Treino/>
            }
        ],
    },
]);

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <ContextProvider>
            <RouterProvider router={router} />
        </ContextProvider>
    </StrictMode>
);
