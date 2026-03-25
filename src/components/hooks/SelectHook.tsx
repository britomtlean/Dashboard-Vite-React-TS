import { useRef, useState, type ReactNode } from 'react';
import Effect from './Effect';
import Ref from './Ref';
import State from './State';

const SelectHook = () => {
    const [component, setComponent] = useState(1);
    const refDia = useRef<HTMLSelectElement | null>(null);

    const alterComponent = (): ReactNode => {
        switch (component) {
            case 1:
                return <Effect />;

            case 2:
                return <Ref />;

            case 3:
                return <State />;

            default:
                return <Effect />;
        }
    };

    return (
        <div className="w-full text-center space-y-4">
            <h1 className="font-bold text-[1.2rem]">Selecione um componente</h1>
            <select
                className="w-full bg-gray-300 py-2 text-center"
                ref={refDia}
                onChange={() => {
                    setComponent(Number(refDia.current?.value));
                }}
            >
                <option value="1">Effect</option>
                <option value="2">Ref</option>
                <option value="3">State</option>
            </select>

            <div>{alterComponent()}</div>
        </div>
    );
};

export default SelectHook;
