import React, { useState } from 'react';
import { styled } from '@mui/material/styles';
import { Alert, CircularProgress, IconButton, Snackbar } from '@mui/material';
import ArrowLeftIcon from '@mui/icons-material/ArrowLeft';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import {
    InfiniteData,
    InfiniteQueryObserverResult,
} from '@tanstack/react-query';
import { useKey } from 'rooks';
import { Image } from './Image';
import { SpeedDialTooltipOpen as SpeedDial } from './SpeedDial';

const FullHeightIconButton = styled(IconButton)({
    height: '100%',
    borderRadius: 0,
    width: '4rem',
});

const Grid = styled('div')({
    display: 'grid',
    gridTemplateColumns: '4rem auto 4rem',
    columnGap: '1rem',
    height: '100vh',
});

const CenteredImage = styled('div')({
    width: '100%',
    height: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
});

type ImageGalleryProps = {
    isLoading: boolean;
    data: InfiniteData<string> | undefined;
    fetchNextPage: () => Promise<InfiniteQueryObserverResult<any, unknown>>;
};

const ImageGallery = ({
    isLoading,
    data,
    fetchNextPage,
}: ImageGalleryProps) => {
    const [index, setIndex] = useState(0);
    const [page, setPage] = useState(0);
    const [snackbar, setSnackbar] = useState(false);
    const previousImage = () => {
        if (index === 0) {
            setPage(page - 1);
            setIndex(29);
        } else {
            setIndex(index - 1);
        }
    };
    const nextImage = () => {
        if (data && index === data?.pages[page]?.length - 1) {
            fetchNextPage().then(() => {
                setIndex(0);
                setPage(page + 1);
            });
        } else {
            setIndex(index + 1);
        }
    };

    const copyURL = () => {
        navigator.clipboard.writeText(data ? data?.pages[page]?.[index] : '');
        setSnackbar(true);
    };

    useKey('c', copyURL);

    useKey('ArrowLeft', () => {
        if (!isLoading && (index || page)) {
            previousImage();
        }
    });
    useKey('ArrowRight', () => {
        if (!isLoading) {
            nextImage();
        }
    });
    return (
        <>
            <SpeedDial onCopy={copyURL} />
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
                        <Image src={data?.pages[page]?.[index]} />
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
};

export { ImageGallery };
