export class Task {
    private static readonly urlGet = 'http://localhost:3000/task/get';

    static async getTask(user: any){
        const res = await fetch(this.urlGet, {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(user)
        });

        if(!res.ok){
            const data = await res.json()
            throw Error(data.message)
        }
        const data = await res.json();
        console.log('Dados recebidos:',data)

        return data
    }
}
