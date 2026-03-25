import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
//ROUTER
import { createBrowserRouter, RouterProvider } from 'react-router';
//CSS
import './index.css';
//COMPONENTS
import App from './App.tsx';

//Hooks
import Ref from './components/hooks/Ref.tsx';
import State from './components/hooks/State.tsx';
import Effect from './components/hooks/Effect.tsx';

//COMPONENTS
import ErrorPage from './components/ErrorPage.tsx';
import Sobre from './components/Sobre.tsx';
import UpdateProfile from './components/profile/UpdateProfile.tsx';
import Tarefas from './components/Tarefas.tsx';
import Login from './components/Login.tsx';
import Cadastro from './components/Cadastro.tsx';
//CONTEXT
import { ContextProvider } from './context/ContextProvider';

//TREINOS
import CreateTreino from './components/training/CreateTreino.tsx';
import MenuTreino from './components/training/MenuTreino.tsx';
import DiaTreino from './components/training/DiaTreino.tsx';
import SelectHook from './components/hooks/SelectHook.tsx';

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
        errorElement: <ErrorPage />,
        children: [
            {
                index: true,
                element: <Sobre />,
            },
            {
                path: '/hooks',
                element: <SelectHook />,
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
                element: <MenuTreino />,
            },
            {
                path: '/treino-do-dia',
                element: <DiaTreino />,
            },
            {
                path: '/criar-treino',
                element: <CreateTreino />,
            },
            {
                path: '/update-profile',
                element: <UpdateProfile />,
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
