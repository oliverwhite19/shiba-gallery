import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useKeys } from 'rooks';

const KeyListener = () => {
    const containerRef = React.useRef(document);
    const navigate = useNavigate();
    useKeys(
        ['ControlLeft', 'KeyS'],
        () => {
            navigate('/');
        },
        {
            target: containerRef,
            when: true,
        }
    );
    useKeys(
        ['ControlLeft', 'KeyM'],
        () => {
            navigate('/home');
        },
        {
            target: containerRef,
            when: true,
        }
    );
    useKeys(
        ['ControlLeft', 'KeyA'],
        () => {
            navigate('/anime');
        },
        {
            target: containerRef,
            when: true,
        }
    );
    return <></>;
};

export { KeyListener };
