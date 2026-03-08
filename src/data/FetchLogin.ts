import { getToken } from "../services/functions";

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

    private static readonly default = {
        cpf: 'Default',
        senha: '1234'
    }

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

    static async getProfile(): Promise<Record<string, any>> {
        const token: string | null = await getToken();

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
}
