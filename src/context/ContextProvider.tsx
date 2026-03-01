import { useState, createContext } from 'react';
import type { PropsWithChildren } from 'react'; //TIPAGEM PARA PROP

export type ContextType = {
    theme: boolean;
    setTheme: React.Dispatch<React.SetStateAction<boolean>>;
    message: string;
    setMessage: React.Dispatch<React.SetStateAction<string>>;
    user: string;
    setUser: React.Dispatch<React.SetStateAction<string>>;
    cpf: string;
    setCpf: React.Dispatch<React.SetStateAction<string>>;
};

//function createContext<T>(defaultValue: T): React.Context<T>

//createContext() Deve receber um tipo e ser atribuido pelo mesmo tipo
export const Context: React.Context<ContextType | null> = createContext<ContextType | null>(null);

/************************************************************************************** */

export const ContextProvider = ({ children }: PropsWithChildren) => {

    const [theme, setTheme] = useState<boolean>(false);
    const [message, setMessage] = useState<string>('Hello Context');
    const [user, setUser] = useState<string>('Default');
    const [cpf, setCpf] = useState<string>('123456789');

    return (
        <Context.Provider value={{ theme, setTheme, message, setMessage, user, setUser, cpf, setCpf }}>
            {children}
        </Context.Provider>
    );
};

export default ContextProvider;
