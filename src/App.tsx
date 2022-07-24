import React, { useState, useEffect } from 'react';
import useFetch from 'react-fetch-hook';
import useTrigger from 'react-use-trigger/useTrigger';
import createTrigger from 'react-use-trigger';
import { Image } from './components';
const requestTrigger = createTrigger();
function App() {
    const requestTriggerValue = useTrigger(requestTrigger);
    const [index, setIndex] = useState(0);
    const [shibas, setShibas] = useState<Array<string>>([]);
    const { isLoading, data } = useFetch<Array<string>>(
        'http://shibe.online/api/shibes?count=10',
        {
            depends: [requestTriggerValue],
        }
    );

    return (
        <div>
            <header>
                <p>Let's go get some doges for you all</p>
            </header>
            {isLoading ? (
                <p>Loading images...</p>
            ) : (
                <>
                    <button
                        onClick={() => setIndex(index - 1)}
                        disabled={!index}
                    >
                        Previous
                    </button>
                    <Image src={data?.[index]} alt="a shiba pic" />
                    <button
                        onClick={() => {
                            if (index === shibas.length - 1) {
                                requestTrigger();
                            }
                            setIndex(index + 1);
                        }}
                    >
                        Next
                    </button>
                </>
            )}
        </div>
    );
}

export default App;
