import { useContext, useEffect, useRef } from 'react';
import { FaUser } from 'react-icons/fa6';
import { Context } from '../../context/ContextProvider';
import type { UpdateUser } from '../../types/AuthBody';
import { FetchLogin } from '../../data/FetchLogin';

//CONTEXT

const UpdateProfile = () => {

    //CONTEXT *************************************************************
    const { user, setUser } = useContext(Context)!;

    //REFS ****************************************************************
    const nameRef = useRef<HTMLInputElement>(null);
    const emailRef = useRef<HTMLInputElement>(null);
    const editRef = useRef<HTMLButtonElement>(null);
    const saveRef = useRef<HTMLInputElement>(null);

    //FUNCTIONS ************************************************************

    function handleEdit() {

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

    function handleSave(e: React.FormEvent) {
        e.preventDefault();

        const userInput: UpdateUser = {
            nome: nameRef.current?.value!,
            email: emailRef.current?.value!,
        };

        console.log('Dados Enviados:', userInput, new Date());

        FetchLogin.updateProfile(userInput)
            .then(() => {
                (alert('Usuário Atualizado!'),
                    FetchLogin.getProfile()
                        .then((data) => setUser(data))
                        .catch((er) => {
                            console.error(er);
                        }));
            })
            .catch((err) => alert(err));
    }

    /******************************************************************** */

    //EFFECT **************************************************************/

    useEffect(() => {
        console.log('Componente UpdateProfile Renderizou');

        if (!nameRef.current || !emailRef.current) return;

        nameRef.current.disabled = true;
        nameRef.current.value = '';

        emailRef.current.disabled = true;
        emailRef.current.value =  '';

        if (editRef.current) editRef.current.style.display = 'block';
        if (saveRef.current) saveRef.current.style.display = 'none';
    }, [user]);

    /******************************************************************** */

    return (
        <div
            className=" w-full mt-8 min-h-full bg-gray-300 flex flex-col justify-start items-center gap-4 rounded-[50px] py-20
                md:w-2/3"
        >
            <div>
                <FaUser className="text-5xl" />
            </div>

            <form
                className="w-9/10 flex flex-col justify-center items-center gap-4 text-center text-2xl p-4 "
                onSubmit={handleSave}
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
                    type="button"
                    onClick={handleEdit}
                >
                    Editar
                </button>

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
