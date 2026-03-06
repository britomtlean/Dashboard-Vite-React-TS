import { useEffect, useState } from 'react';
import type { ChangeEvent, FormEvent  } from 'react'
import { FetchLogin } from '../data/FetchLogin';
import { useNavigate, Link } from 'react-router-dom';

type LoginPayload = {
    cpf: string;
    senha: string;
};

const Login = () => {

    const navigate = useNavigate()

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
        .then(()=>navigate('/'))
        .catch((er)=>alert(er))
    };

    const handleCPFChange = (e: ChangeEvent<HTMLInputElement>) => {
        setCPF(e.target.value);
    };

    const handlePasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
        setPassword(e.target.value);
    };

    useEffect(() => {
        console.log('Login montado');
    }, []);

    return (
        <div className="w-screen h-screen flex items-center justify-center bg-linear-to-br from-gray-700 to-gray-500 px-[10vw]">
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
                        className="p-3 rounded-lg border border-gray-300 focus:outline-none focus:bg-white/40 transition"
                    />

                    <input
                        type="password"
                        placeholder="Insira a senha"
                        value={password}
                        onChange={handlePasswordChange}
                        className="p-3 rounded-lg border border-gray-300 focus:ring-2 focus:bg-white/40 transition"
                    />

                    <button
                        type="submit"
                        className="mt-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg transition duration-200"
                    >
                        Entrar
                    </button>

                    <Link to={'/cadastro'} className='text-white font-light decoration-zinc-400 underline'>Não possui cadastro?</Link>
                </form>
            </div>
        </div>
    );
};

export default Login;
