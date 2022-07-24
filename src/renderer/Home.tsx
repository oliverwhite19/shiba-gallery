import React from 'react';
import Paper from '@mui/material/Paper';
import MenuList from '@mui/material/MenuList';
import MenuItem from '@mui/material/MenuItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemIcon from '@mui/material/ListItemIcon';
import Typography from '@mui/material/Typography';
import ContentCopy from '@mui/icons-material/ContentCopy';
import ContentPaste from '@mui/icons-material/ContentPaste';
import PetsIcon from '@mui/icons-material/Pets';
import { styled } from '@mui/system';
import { useNavigate } from 'react-router-dom';

const CenteredMenu = styled('div')({
    width: '100vw',
    height: '100vh',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
});

export default function Home() {
    const navigate = useNavigate();
    return (
        <CenteredMenu>
            <Paper sx={{ width: 320, maxWidth: '100%' }}>
                <MenuList>
                    <MenuItem onClick={() => navigate('/')}>
                        <ListItemIcon>
                            <PetsIcon fontSize="small" />
                        </ListItemIcon>
                        <ListItemText>Shiba Gallery</ListItemText>
                        <Typography variant="body2" color="text.secondary">
                            Ctrl + S
                        </Typography>
                    </MenuItem>
                    <MenuItem>
                        <ListItemIcon>
                            <ContentCopy fontSize="small" />
                        </ListItemIcon>
                        <ListItemText>Copy</ListItemText>
                        <Typography variant="body2" color="text.secondary">
                            Ctrl + C
                        </Typography>
                    </MenuItem>
                    <MenuItem>
                        <ListItemIcon>
                            <ContentPaste fontSize="small" />
                        </ListItemIcon>
                        <ListItemText>Paste</ListItemText>
                        <Typography variant="body2" color="text.secondary">
                            Ctrl + V
                        </Typography>
                    </MenuItem>
                </MenuList>
            </Paper>
        </CenteredMenu>
    );
}
