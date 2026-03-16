import { useState } from 'react';

export default function Sobre() {
    const [index, setIndex] = useState(0);

    const sections = [
        {
            title: 'Back-end',
            color: 'text-green-400',
            content: (
                <>
                    <p className="text-gray-300 mb-4 text-sm sm:text-base">
                        O back-end foi desenvolvido utilizando Node.js com NestJS.
                    </p>

                    <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-gray-300 list-disc list-inside text-sm sm:text-base">
                        <li>Node.js</li>
                        <li>NestJS</li>
                        <li>Prisma ORM</li>
                        <li>MySQL</li>
                        <li>JWT</li>
                        <li>Criptografia de senha</li>
                        <li>CRUD</li>
                        <li>Middlewares</li>
                        <li>Insomnia</li>
                        <li>Docker</li>
                    </ul>
                </>
            ),
        },

        {
            title: 'Front-end',
            color: 'text-purple-400',
            content: (
                <>
                    <p className="text-gray-300 mb-4 text-sm sm:text-base">
                        Interface desenvolvida com React + TypeScript.
                    </p>

                    <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-gray-300 list-disc list-inside text-sm sm:text-base">
                        <li>Vite</li>
                        <li>React</li>
                        <li>TypeScript</li>
                        <li>TailwindCSS</li>
                        <li>React Router</li>
                        <li>Fetch API</li>
                    </ul>
                </>
            ),
        },

        {
            title: 'Banco de Dados',
            color: 'text-yellow-400',
            content: (
                <ul className="text-gray-300 list-disc list-inside text-sm sm:text-base">
                    <li>MySQL</li>
                    <li>Prisma ORM</li>
                    <li>Migrations</li>
                    <li>Relacionamentos</li>
                </ul>
            ),
        },

        {
            title: 'Deploy',
            color: 'text-blue-400',
            content: (
                <>
                    <p className="text-gray-300 mb-3 text-sm sm:text-base">Deploy realizado via GitHub + Railway.</p>

                    <ul className="text-gray-300 list-disc list-inside text-sm sm:text-base">
                        <li>Git</li>
                        <li>CI/CD</li>
                        <li>Build automático</li>
                    </ul>
                </>
            ),
        },
    ];

    const current = sections[index];

    function next() {
        setIndex((prev) => (prev + 1) % sections.length);
    }

    function prev() {
        setIndex((prev) => (prev - 1 + sections.length) % sections.length);
    }

    return (
        <section className="w-full max-w-4xl">
            <h1 className="text-2xl sm:text-4xl font-bold text-center mb-8 text-green-700">Especificações do Projeto</h1>

            <div className="bg-slate-900 rounded-xl p-4 sm:p-8 shadow-lg border border-slate-800">
                <h2 className={`text-xl sm:text-2xl font-semibold mb-4 ${current.color}`}>{current.title}</h2>

                {current.content}
            </div>

            {/* CONTROLES */}

            <div className="flex justify-center gap-4 mt-6">
                <button
                    onClick={prev}
                    className="bg-slate-800 px-3 sm:px-5 py-2 rounded hover:bg-slate-700 text-sm sm:text-base"
                >
                    ⬅
                </button>

                <button
                    onClick={next}
                    className="bg-slate-800 px-3 sm:px-5 py-2 rounded hover:bg-slate-700 text-sm sm:text-base"
                >
                    ➡
                </button>
            </div>

            {/* INDICADORES */}

            <div className="flex justify-center gap-2 mt-4">
                {sections.map((_, i) => (
                    <div
                        key={i}
                        className={`h-2 rounded-full transition-all ${
                            i === index ? 'bg-sky-400 w-6' : 'bg-gray-600 w-2'
                        }`}
                    />
                ))}
            </div>
        </section>
    );
}
