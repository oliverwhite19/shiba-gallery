import React from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import ImageGallery from './ImageGallery';
const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            refetchOnWindowFocus: false,
            keepPreviousData: true,
            staleTime: Infinity,
            refetchOnMount: false,
        },
    },
});

function App() {
    return (
        <QueryClientProvider client={queryClient}>
            <ImageGallery />
        </QueryClientProvider>
    );
}

export default App;
