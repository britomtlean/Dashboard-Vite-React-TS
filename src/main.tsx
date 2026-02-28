import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
//ROUTER
import { createBrowserRouter, RouterProvider } from 'react-router';
//CSS
import './index.css';
//COMPONENTS
import App from './App.tsx';
import Ref from './components/Ref.tsx';
import State from './components/State.tsx';
import Effect from './components/Effect.tsx';
import Socket from './components/Socket.tsx';
import Tarefas from './components/Tarefas.tsx';
//CONTEXT
import { ContextProvider } from './context/ContextProvider';

let router = createBrowserRouter([
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
                path: '/socket/',
                element: <Socket />,
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
