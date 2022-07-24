import React from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import ImageGallery from './ImageGallery';
import { ThemeProvider } from '@emotion/react';
import { createTheme, CssBaseline } from '@mui/material';
import { MemoryRouter as Router, Routes, Route } from 'react-router-dom';

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

function Shiba() {
    return <ImageGallery />;
}

export default function App() {
    return (
        <ThemeProvider theme={darkTheme}>
            <CssBaseline />
            <QueryClientProvider client={queryClient}>
                <Router>
                    <Routes>
                        <Route path="/" element={<Shiba />} />
                    </Routes>
                </Router>
            </QueryClientProvider>
        </ThemeProvider>
    );
}
