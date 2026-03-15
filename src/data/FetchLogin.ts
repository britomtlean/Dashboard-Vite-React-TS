import { getToken } from "../services/functions";
import type { UpdateUser } from "../types/AuthBody";
import type { LoggedUser } from "../types/LoggedUser";

export class FetchLogin {
    //////////////////////////////////////////////////////////////////////////////
    private static readonly httpLogin =
        window.location.hostname === 'localhost'
            ? 'http://localhost:3000/auth/login'
            : 'https://back-end-dashboard-production.up.railway.app/auth/login';

    private static readonly httpGetProfile =
        window.location.hostname === 'localhost'
            ? 'http://localhost:3000/auth/validate'
            : 'https://back-end-dashboard-production.up.railway.app/auth/validate';

    private static readonly httpUpdateProfile =
        window.location.hostname === 'localhost'
            ? 'http://localhost:3000/usuarios/update'
            : 'https://back-end-dashboard-production.up.railway.app/usuarios/update';

    private static readonly default = {
        cpf: 'Default',
        senha: '1234',
    };

    //////////////////////////////////////////////////////////////////////////////

    static async send(user: Record<string, string>): Promise<object> {
        const res = await fetch(this.httpLogin, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(user),
            credentials: 'include',
        });

        const data = await res.json();

        if (!res.ok) {
            throw Error(data.message);
        }

        localStorage.setItem('token', JSON.stringify(data?.token));
        console.log('Dados recebidos:', data?.token);
        return data;
    }

    static async sendDefault(): Promise<object> {
        const res = await fetch(this.httpLogin, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(this.default),
            credentials: 'include',
        });

        const data = await res.json();

        if (!res.ok) {
            throw Error(data.message);
        }

        localStorage.setItem('token', JSON.stringify(data?.token));
        console.log('Dados recebidos:', data?.token);
        return data;
    }

    static async getProfile(): Promise<LoggedUser> {
        const token: string = await getToken();

        const res = await fetch(this.httpGetProfile, {
            method: 'GET',
            credentials: 'include',
            headers: {
                Authorization: `Bearer ${JSON.parse(token)}`,
            },
        });
        const data = await res.json();

        if (!res.ok) {
            throw Error(data.message);
        }

        console.log('Usuário logado:', data);
        return data;
    }

    static async updateProfile(user: UpdateUser): Promise<Record<string, any>> {
        const token: string = await getToken();
        console.log('token recebido:', token);

        const res = await fetch(this.httpUpdateProfile, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${JSON.parse(token)}`,
            },
            credentials: 'include',
            body: JSON.stringify(user),
        });

        const data = await res.json();

        if (!res.ok) {
            throw new Error(data.message);
        }

        console.log('Dados recebidos:', data);
        return data;
    }
}
