export class Task {
    private static readonly httpGetTask = 'http://localhost:3000/task/get';
    private static readonly httpCreateTask = 'http://localhost:3000/task/create';

    static async getTask() {
        const res = await fetch(this.httpGetTask, {
            method: 'GET',
            credentials: 'include',
        });
        const data = await res.json();

        if (!res.ok) {
            throw Error(data.message);
        }

        console.log('Dados recebidos:', data);
        return data;
    }

    static async createTask(task: Record<string, string>){
        const res = await fetch(this.httpCreateTask, {
            method: "POST",
            headers:{ 'Content-Type': 'Application/json'},
            credentials: 'include',
            body: JSON.stringify(task)
        })
        const data = await res.json()

        if(!res.ok){
            throw Error(data.message)
        }

        console.log('Task criada:',data)
        return data

    }
}
