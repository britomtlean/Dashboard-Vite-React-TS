import { useState } from 'react';
import type { ChangeEvent, FormEvent } from 'react';
import { FetchLogin } from '../data/FetchLogin';
import { useNavigate, Link } from 'react-router-dom';

type LoginPayload = {
    cpf: string;
    senha: string;
};

const Login = () => {
    const navigate = useNavigate();

    const [cpf, setCPF] = useState<string>('');
    const [password, setPassword] = useState<string>('');

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const login: LoginPayload = {
            cpf,
            senha: password,
        };

        console.log(login);

        FetchLogin.send(login)
            .then(() => {
                navigate('/');
            })
            .catch((er) => alert(er));
    };

    const handleDefault = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        FetchLogin.sendDefault().then(() => {
            navigate('/');
        })
        .catch((er) => alert(er));

    };

    const handleCPFChange = (e: ChangeEvent<HTMLInputElement>) => {
        setCPF(e.target.value);
    };

    const handlePasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
        setPassword(e.target.value);
    };


    return (
        <div className="w-screen h-screen flex flex-col gap-8 items-center justify-center bg-linear-to-br from-gray-700 to-gray-500 px-[10vw]">
            <div
                className="w-full max-w-md p-8 rounded-2xl shadow-lg
                 bg-white/10 backdrop-blur-md"
            >
                <h1 className="text-3xl font-bold text-center text-gray-800 mb-8">Login</h1>

                <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                    <input
                        type="text"
                        placeholder="Insira o CPF"
                        value={cpf}
                        onChange={handleCPFChange}
                        className="p-3 rounded-lg border border-gray-300
                        focus:outline-none
                        focus:border-2 focus:border-cyan-300
                        transition
                        duration-200"
                    />

                    <input
                        type="password"
                        placeholder="Insira a senha"
                        value={password}
                        onChange={handlePasswordChange}
                        className="p-3 rounded-lg border border-gray-300
                        focus:outline-none
                        focus:border-2 focus:border-cyan-300
                        transition
                        duration-200"
                    />

                    <button
                        type="submit"
                        className="mt-2 bg-blue-600 text-white font-semibold py-3 rounded-lg
                        hover:bg-blue-700
                        transition duration-200
                        focus:outline-none
                        focus:ring-2 focus:ring-cyan-500
                        focus:border-white"
                    >
                        Entrar
                    </button>

                    <Link to={'/cadastro'} className="text-gray-900 font-sans decoration-black underline">
                        Cadastre-se
                    </Link>
                </form>
            </div>

            <form onSubmit={(e) => handleDefault(e)} className="p-4">
                <input
                    value={'Entre como convidado'}
                    type="submit"
                    className="min-w-1/2 mt-2 bg-blue-600 text-white font-semibold py-3 rounded-lg animate-bounce px-4
                        hover:bg-blue-700
                        transition duration-200
                        focus:outline-none
                        focus:ring-2 focus:ring-cyan-500
                        focus:border-white
                        md:min-w-1/6"
                ></input>
            </form>
        </div>
    );
};

export default Login;
