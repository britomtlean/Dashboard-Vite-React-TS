import { useEffect, useState , useContext} from 'react';
import { useSearchParams } from 'react-router-dom';
import { Context } from '../context/ContextProvider';
import WebSocket from '../services/Socket';

type User = {
    user: string,
    send: string
}

const Socket = () => {
    const [searchParams] = useSearchParams();
    const user = searchParams.get('user');

    const { setMessage } = useContext(Context)!;

    const [SendMessage, setSendMessage] = useState<string>('');
    const [sendUser, setSendUser] = useState<string>('');

    const [privChat, setPrivChat] = useState<Array<object> | null>(null);

    useEffect(() => {

        setMessage("Socket.IO")

        console.log(privChat);
        WebSocket.connection(user!); //REALIZA CONEXÃO

        WebSocket.getSocket(
            (msg) => {
                console.log('Mensagem recebida: ', msg);

                const users: Array<User> = msg.map((array: any) => ({
                    user: array.user,
                    send: array.send,
                }));

                const isPrivate = users[0]?.send === user || users[0]?.user === user;

                // =====================
                // 🌎 GLOBAL
                // =====================
                if (!users.some((item) => item.send)) {
                    if (!privChat) {
                        setPrivChat((prev) => [...prev!, msg]);
                        console.log('Mensagem global');
                        console.log(privChat);
                    } else {
                        setPrivChat((prev) => [...prev!, msg]);
                        console.log('Mensagem global');
                        console.log(privChat);
                    }
                }

                // =====================
                // 🔒 PRIVATE
                // =====================
                if (isPrivate) {
                    if (!privChat) {
                        setPrivChat(msg);
                        console.log('privChat null');
                    } else {
                        setPrivChat((prev) => [...prev!, msg]);
                        console.log('privChat Ok');
                    }
                }

                console.log(privChat);
            }
        );
    }, []);

    return (
        <>
            <form
                className="flex flex-col gap-4 justify-center items-center w-[30vw]"
                onSubmit={(e) => {
                    e.preventDefault();
                    WebSocket.sendMessage(user!, SendMessage, sendUser);
                    setSendMessage('');
                }}
            >
                <label className="mb-2">
                    <h1 className="font-semibold text-black!">Chat</h1>
                </label>

                <input
                    type="text"
                    placeholder="Digite para quem você quer enviar a mensagem"
                    value={sendUser}
                    className="bg-gray-300 border rounded-[10px] p-2 w-full"
                    required
                    onChange={(e) => setSendUser(e.target.value)}
                />

                <input
                    type="text"
                    value={SendMessage}
                    placeholder="Digite sua mensagem"
                    className="bg-gray-300 border rounded-[10px] p-2 w-full"
                    required
                    onChange={(e) => setSendMessage(e.target.value)}
                />

                <button className="bg-slate-500 w-[200px] p-2">Enviar</button>
            </form>

            <h1 className="text-[2rem]! text-black! my-3">Mensagens</h1>

            <div className="flex flex-col items-center w-[40vw] max-h-[300px] overflow-y-scroll">
                {!privChat
                    ? 'Não há mensagens disponíveis'
                    : privChat?.map((msg: any, index: number) => (
                          <ul
                              className="w-full flex flex-col justify-center items-center bg-slate-400/60 border-b p-4 rounded-[12px]"
                              key={index}
                          >
                              <li className="font-semibold">{msg.user}</li>
                              <li>{msg.message}</li>
                          </ul>
                      ))}
            </div>
        </>
    );
};

export default Socket;
