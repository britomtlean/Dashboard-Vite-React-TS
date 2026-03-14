import { useState, useEffect } from "react";
import { Treining } from "../data/Training";

const useTraining = () => {

    const [dados, setDados] = useState<Array<Record<string, any>>>([]);

        useEffect(() => {
            Treining.treiningDay()
                .then((data) => setDados(data))
                .catch((er) => {
                    console.error(er);
                });
        }, []);


        return { dados, setDados}
}

export default useTraining
