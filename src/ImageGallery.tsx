import React, { useState } from 'react';
import { Image } from './components';
import { CircularProgress, IconButton } from '@mui/material';
import ArrowLeftIcon from '@mui/icons-material/ArrowLeft';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import { useInfiniteQuery } from '@tanstack/react-query';
import { getShibas } from './api';

import { styled } from '@mui/material/styles';

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

    const { isLoading, data, fetchNextPage } = useInfiniteQuery(
        ['shibas'],
        getShibas,
        {
            getNextPageParam: () => page + 1,
        }
    );
    return (
        <Grid>
            <div>
                <FullHeightIconButton
                    onClick={() => {
                        if (index === 0) {
                            setPage(page - 1);
                            setIndex(9);
                        } else {
                            setIndex(index - 1);
                        }
                    }}
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
                    <Image src={data?.pages[page]?.[index]} alt="a shiba pic" />
                )}
            </CenteredImage>
            <div>
                <FullHeightIconButton
                    onClick={() => {
                        if (index === data?.pages[page]?.length - 1) {
                            fetchNextPage().then(() => {
                                setIndex(0);
                                setPage(page + 1);
                            });
                        } else {
                            setIndex(index + 1);
                        }
                    }}
                    arial-label="next image"
                    disabled={isLoading}
                >
                    <ArrowRightIcon />
                </FullHeightIconButton>
            </div>
        </Grid>
    );
}

export default ImageGallery;
