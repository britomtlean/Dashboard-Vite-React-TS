import { useContext, useEffect, useRef, useState } from 'react';
import { FaUser } from 'react-icons/fa6';
import { Context } from '../../context/ContextProvider';
import type { UpdateUser } from '../../types/AuthBody';
import { FetchLogin } from '../../data/FetchLogin';

//CONTEXT

const UpdateProfile = () => {
    //CONTEXT
    const { user, setUser } = useContext(Context)!;

    //REF
    const nameRef = useRef<HTMLInputElement>(null);
    const emailRef = useRef<HTMLInputElement>(null);
    const editRef = useRef<HTMLButtonElement>(null);
    const saveRef = useRef<HTMLInputElement>(null);

    const [render, setRender] = useState<boolean>(true);

    function handleEdit(e: any) {
        e.preventDefault();

        nameRef.current!.disabled = false;
        nameRef.current!.required = true;
        //nameRef.current!.style.background = '#bbf7d0';
        //nameRef.current!.style.borderColor = 'green';
        nameRef.current!.focus();

        emailRef.current!.disabled = false;
        emailRef.current!.required = true;
        //emailRef.current!.style.background = '#bbf7d0';
        //emailRef.current!.style.borderColor = 'green';

        editRef.current!.style.display = 'none';
        saveRef.current!.style.display = 'block';
    }

    function handleSave(e: any) {
        e.preventDefault();

        const userInput: UpdateUser = {
            nome: nameRef.current?.value!,
            email: emailRef.current?.value!,
        };

        console.log('Dados recebidos:', userInput);

        FetchLogin.updateProfile(userInput)
            .then(() => {
                (alert('Usuário Atualizado!'), setRender((prev) => !prev));
            })
            .catch((err) => alert(err));
    }

    useEffect(() => {
        FetchLogin.getProfile()
            .then((data) => setUser(data))
            .catch((er) => {
                console.error(er);
            });
    }, [render]);

    useEffect(() => {
        ((nameRef.current!.disabled = true),
            (nameRef.current!.value = ''),
            (emailRef.current!.disabled = true),
            (emailRef.current!.value = ''),
            (editRef.current!.style.display = 'block'),
            (saveRef.current!.style.display = 'none'),
            console.log('Componente UpdateProfile Renderizou'));
    }, [render]);

    return (
        <div className=" w-full mt-8 min-h-full bg-gray-300 flex flex-col justify-start items-center gap-4 rounded-[50px] py-20
        md:w-2/3">
            <div>
                <FaUser className="text-5xl" />
            </div>

            <form
                className="w-9/10 flex flex-col justify-center items-center gap-4 text-center text-2xl p-4 "
                onSubmit={(e) => {
                    handleEdit(e);
                }}
            >
                <input
                    className="border w-full border-white bg-sky-100 text-center rounded-[20px] p-4 focus:outline-blue-500 focus:outline-1
                    md:w-2/3"
                    type="text"
                    name="name"
                    placeholder={user?.nome}
                    disabled={true}
                    ref={nameRef}
                />
                <input
                    className="border w-full border-white bg-sky-100 text-center rounded-[20px] p-4 focus:outline-blue-500 focus:outline-1
                    md:w-2/3"
                    type="text"
                    name="email"
                    placeholder={user?.email}
                    disabled
                    ref={emailRef}
                />
                <input
                    className="border w-full border-white bg-sky-100 text-center rounded-[20px] p-4  focus:outline-blue-500 focus:outline-1
                    md:w-2/3"
                    type="text"
                    name="cpf"
                    placeholder={user?.cpf}
                    disabled
                />
                <button
                    className="border w-full border-white bg-sky-500 text-center rounded-[20px] p-4 text-white
                    md:w-2/3"
                    ref={editRef}
                    type="submit"
                >
                    Editar
                </button>
            </form>
            <form
                className="w-9/10 flex justify-center"
                onSubmit={(e) => {
                    handleSave(e);
                }}
            >
                <input
                    className="hidden border w-full border-white bg-sky-500 text-center rounded-[20px] p-4 text-white
                    md:w-2/3"
                    type="submit"
                    value={'Salvar'}
                    ref={saveRef}
                />
            </form>
        </div>
    );
};

export default UpdateProfile;
