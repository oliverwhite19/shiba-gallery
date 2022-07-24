import React from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import ImageGallery from './ImageGallery';
import { ThemeProvider } from '@emotion/react';
import { createTheme, CssBaseline } from '@mui/material';
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
const darkTheme = createTheme({
    palette: {
        mode: 'dark',
    },
});

function App() {
    return (
        <ThemeProvider theme={darkTheme}>
            <CssBaseline />
            <QueryClientProvider client={queryClient}>
                <ImageGallery />
            </QueryClientProvider>
        </ThemeProvider>
    );
}

export default App;
