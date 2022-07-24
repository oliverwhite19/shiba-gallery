import React, { useState, useEffect } from 'react';
import useFetch from 'react-fetch-hook';
import useTrigger from 'react-use-trigger/useTrigger';
import createTrigger from 'react-use-trigger';
import { Image } from './components';
import { CircularProgress, Grid, IconButton } from '@mui/material';
import ArrowLeftIcon from '@mui/icons-material/ArrowLeft';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
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
            {isLoading ? (
                <CircularProgress color="success" />
            ) : (
                <Grid container spacing={2}>
                    <Grid item xs>
                        <IconButton
                            onClick={() => setIndex(index - 1)}
                            disabled={!index}
                            arial-label="previous image"
                        >
                            <ArrowLeftIcon />
                        </IconButton>
                    </Grid>
                    <Grid item xs={8}>
                        <Image src={data?.[index]} alt="a shiba pic" />
                    </Grid>
                    <Grid item xs>
                        <IconButton
                            onClick={() => {
                                if (index === shibas.length - 1) {
                                    requestTrigger();
                                }
                                setIndex(index + 1);
                            }}
                            arial-label="next image"
                        >
                            <ArrowRightIcon />
                        </IconButton>
                    </Grid>
                </Grid>
            )}
        </div>
    );
}

export default App;
