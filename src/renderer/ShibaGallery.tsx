import React from 'react';
import { useInfiniteQuery } from '@tanstack/react-query';
import { getShibas } from './api';
import { ImageGallery } from './components';

const ShibaGallery = () => {
    const { isLoading, data, fetchNextPage } = useInfiniteQuery(
        ['shibas'],
        getShibas,
        {
            getNextPageParam: () => '',
        }
    );
    return (
        <ImageGallery
            isLoading={isLoading}
            data={data}
            fetchNextPage={fetchNextPage}
        />
    );
};

export { ShibaGallery };
