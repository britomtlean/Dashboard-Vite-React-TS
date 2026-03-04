import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
//ROUTER
import { createBrowserRouter, RouterProvider } from 'react-router';
//CSS
import './index.css';
//COMPONENTS
import App from './App.tsx';

//Hooks
import Ref from './components/Hooks/Ref.tsx';
import State from './components/Hooks/State.tsx';
import Effect from './components/Hooks/Effect.tsx';

import Tarefas from './components/Tarefas.tsx';
import Login from './components/Login.tsx';
import Cadastro from './components/Cadastro.tsx';
//CONTEXT
import { ContextProvider } from './context/ContextProvider';

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
        children: [
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
