import { getToken } from '../services/functions';

export class Treining {
    private static readonly urlGetTarefa: string =
        window.location.hostname === 'localhost'
            ? 'http://localhost:3000/training/getday'
            : 'https://back-end-dashboard-production.up.railway.app/training/getday';

    static async treiningDay() {
        const token = await getToken();

        const res = await fetch(this.urlGetTarefa, {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${JSON.parse(token)}`,
            },
        });

        const data = await res.json();

        if (!res.ok) {
            throw Error(data.message);
        }

        console.log('dados recebidos:', data);
        return data;
    }
}
