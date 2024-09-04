import * as React from 'react';
import Box from '@mui/material/Box';
import Fade from '@mui/material/Fade';
import CircularProgress from '@mui/material/CircularProgress';

interface LoaderProps {
    loading: boolean;
}

const Loader: React.FC<LoaderProps> = ({ loading }) => {
    return (
        <Fade in={loading}>
            <Box
                sx={{
                    position: 'fixed',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    backgroundColor: 'rgba(0, 0, 0, 0.5)',
                    backdropFilter: 'blur(10px)',
                    zIndex: 1300,
                }}
            >
                <CircularProgress />
            </Box>
        </Fade>
    );
};

export default Loader;
