import React, { useState } from 'react';
import { Image } from './components';
import { Alert, CircularProgress, IconButton, Snackbar } from '@mui/material';
import ArrowLeftIcon from '@mui/icons-material/ArrowLeft';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import { useInfiniteQuery } from '@tanstack/react-query';
import { getShibas } from './api';

import { styled } from '@mui/material/styles';
import { useKeyPressEvent } from 'react-use';

const FullHeightIconButton = styled(IconButton)({
    height: '100%',
    borderRadius: 0,
    width: '4rem',
});

const Grid = styled('div')({
    display: 'grid',
    gridTemplateColumns: '4rem auto 4rem',
    columnGap: '2rem',
    height: '100vh',
});

const CenteredImage = styled('div')({
    width: '100%',
    height: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
});

function ImageGallery() {
    const [index, setIndex] = useState(0);
    const [page, setPage] = useState(0);
    const [snackbar, setSnackbar] = useState(false);

    const { isLoading, data, fetchNextPage } = useInfiniteQuery(
        ['shibas'],
        getShibas,
        {
            getNextPageParam: () => page + 1,
        }
    );
    const previousImage = () => {
        if (index === 0) {
            setPage(page - 1);
            setIndex(9);
        } else {
            setIndex(index - 1);
        }
    };
    const nextImage = () => {
        if (index === data?.pages[page]?.length - 1) {
            fetchNextPage().then(() => {
                setIndex(0);
                setPage(page + 1);
            });
        } else {
            setIndex(index + 1);
        }
    };

    const copyURL = () => {
        /* Copy the text inside the text field */
        navigator.clipboard.writeText(data?.pages[page]?.[index]);

        /* Alert the copied text */
        setSnackbar(true);
    };

    useKeyPressEvent('c', copyURL);

    useKeyPressEvent('ArrowLeft', () => {
        if (!isLoading && (index || page)) {
            previousImage();
        }
    });
    useKeyPressEvent('ArrowRight', () => {
        if (!isLoading) {
            nextImage();
        }
    });
    return (
        <>
            <Grid>
                <div>
                    <FullHeightIconButton
                        onClick={previousImage}
                        disabled={isLoading || (!index && !page)}
                        arial-label="previous image"
                    >
                        <ArrowLeftIcon />
                    </FullHeightIconButton>
                </div>
                <CenteredImage>
                    {isLoading ? (
                        <CircularProgress color="success" />
                    ) : (
                        <Image
                            src={data?.pages[page]?.[index]}
                            alt="a shiba pic"
                        />
                    )}
                </CenteredImage>
                <div>
                    <FullHeightIconButton
                        onClick={nextImage}
                        arial-label="next image"
                        disabled={isLoading}
                    >
                        <ArrowRightIcon />
                    </FullHeightIconButton>
                </div>
            </Grid>
            <Snackbar
                open={snackbar}
                autoHideDuration={2000}
                onClose={() => setSnackbar(false)}
            >
                <Alert
                    onClose={() => setSnackbar(false)}
                    severity="success"
                    sx={{ width: '100%' }}
                >
                    Copied source to clipboard!
                </Alert>
            </Snackbar>
        </>
    );
}

export default ImageGallery;
