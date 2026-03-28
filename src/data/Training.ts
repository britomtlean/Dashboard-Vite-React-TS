import { getToken } from '../services/functions';
import type { ExerciseBody, TrainingBody } from '../types/Training';

export class Training {
    private static readonly urlGetAllTrainings: string = `${import.meta.env.VITE_API_URL}training/get-alltrainings`;

    private static readonly urlGetMusculos: string = `${import.meta.env.VITE_API_URL}training/get-muscles`;

    private static readonly urlGetExercises: string = `${import.meta.env.VITE_API_URL}training/get-exercises`;

    private static readonly urlAddTraining: string = `${import.meta.env.VITE_API_URL}training/post-training`;

    private static readonly urlAddExercise: string = `${import.meta.env.VITE_API_URL}training/post-exercise`;

    private static readonly urlADeleteTraining: string = `${import.meta.env.VITE_API_URL}training/delete-training`

    static async getAllTrainings() {
        const token = await getToken();

        const res = await fetch(this.urlGetAllTrainings, {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${JSON.parse(token)}`,
            },
        });

        const data = await res.json();

        if (!res.ok) {
            throw new Error(data.message);
        }

        console.log('Treinos recebidos:', data);
        return data;
    }

    static async getMusculos() {
        const token = await getToken();

        const res = await fetch(this.urlGetMusculos, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${JSON.parse(token)}`,
            },
        });

        const data = await res.json();

        if (!res.ok) {
            throw new Error(data.message || 'Erro ao buscar músculos');
        }

        console.log('response getMuscuslos:', data);
        return data;
    }

    static async getExercices() {
        const token = await getToken();

        const res = await fetch(this.urlGetExercises, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${JSON.parse(token)}`,
            },
        });

        const data = await res.json();

        if (!res.ok) {
            throw new Error(data.message || 'Erro ao buscar músculos');
        }

        console.log('response getExercices:', data);
        return data;
    }

    static async addTraining(training: TrainingBody) {
        const req = JSON.stringify(training);
        console.log('Dados enviados:', req);

        if (!req) {
            throw new Error('Dados de requisição inválidos!');
        }

        const token = await getToken();

        const res = await fetch(this.urlAddTraining, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${JSON.parse(token)}`,
            },
            body: req,
        });

        const data = await res.json();

        if (!res.ok) {
            throw new Error(data.message);
        }

        console.log('Response addTraining:', data);
        return data;
    }

    static async addExercices(exercise: ExerciseBody) {
        const req = JSON.stringify(exercise);
        console.log('Dados enviados:', req);

        if (!req) {
            throw new Error('Dados de requisição inválidos!');
        }

        const token = await getToken();

        const res = await fetch(this.urlAddExercise, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${JSON.parse(token)}`,
            },
            body: req,
        });

        const data = await res.json();

        if (!res.ok) {
            throw new Error(data.message || 'Erro de serviço');
        }

        console.log('Response addExercices:', data);
        return data;
    }

    static async removeTraining(body: number) {
        const req = JSON.stringify({id: body});
        console.log('Dados enviados:', req);

        if (!req) {
            throw new Error('Dados de requisição inválidos!');
        }

        const token = await getToken();

        const res = await fetch(this.urlADeleteTraining, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${JSON.parse(token)}`,
            },
            body: req,
        });

        const data = await res.json();

        if (!res.ok) {
            throw new Error(data.message || 'Erro de serviço');
        }

        console.log('Response removeTraining:', data);
        return data;
    }
}
