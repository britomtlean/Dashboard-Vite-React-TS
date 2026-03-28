import imageTrainner from '../../assets/Treino-de-Hipertrofia.jpg';
import { useNavigate } from 'react-router-dom';

const MenuTreino = () => {

    const navigate = useNavigate();

    return (
        <div className="w-full h-full flex flex-col justify-center items-center gap-4">
            <div className="w-full h-full">
                <img src={imageTrainner} alt="Descrição da imagem"
                className="opacity-90 w-full h-full rounded-md
                    md:w-1/2 md:mx-auto" />
            </div>
            <div className="flex flex-col gap-1">
                <h1
                className="text-[1.2rem] font-bold text-center">Bem vindo a seção de treinos</h1>
                <h2 className="text-[1.rem] font-mono text-center">
                    Aqui você define e confere sua lista de treinos do dia a dia.
                </h2>
            </div>
            <div className="flex flex-col gap-4 w-full h-full
                md:w-1/2">
                <button
                    className="btn-primary"
                    onClick={() => {
                        navigate('/treino-do-dia');
                    }}
                >
                    Meus treinos
                </button>
                <button
                    className="btn-primary"
                    onClick={() => {
                        navigate('/criar-treino');
                    }}
                >
                    Montar treino
                </button>
            </div>
        </div>
    );
};

export default MenuTreino;
