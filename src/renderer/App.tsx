import React from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ThemeProvider } from '@emotion/react';
import { createTheme, CssBaseline } from '@mui/material';
import { MemoryRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './Home';
import { KeyListener } from './components/KeyListener';
import { ShibaGallery } from './ShibaGallery';
import { AnimeGallery } from './AnimeGallery';

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
export default function App() {
    return (
        <ThemeProvider theme={darkTheme}>
            <CssBaseline />
            <QueryClientProvider client={queryClient}>
                <Router>
                    <KeyListener />
                    <Routes>
                        <Route path="/" element={<ShibaGallery />} />
                        <Route path="/home" element={<Home />} />
                        <Route path="/anime" element={<AnimeGallery />} />
                    </Routes>
                </Router>
            </QueryClientProvider>
        </ThemeProvider>
    );
}
