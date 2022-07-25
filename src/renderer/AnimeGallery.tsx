import React from 'react';
import { useInfiniteQuery } from '@tanstack/react-query';
import { getWaifus } from './api';
import { ImageGallery } from './components';

const AnimeGallery = () => {
    const { isLoading, data, fetchNextPage } = useInfiniteQuery(
        ['waifus'],
        getWaifus,
        {
            getNextPageParam: () => '',
        }
    );
    console.log('data', data);
    return (
        <ImageGallery
            isLoading={isLoading}
            data={data}
            fetchNextPage={fetchNextPage}
        />
    );
};

export { AnimeGallery };
