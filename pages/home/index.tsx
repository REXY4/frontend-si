import { Card, Grid, Stack, Typography } from "@mui/material";
import IconButton from '@mui/material/IconButton';
import MenuOpenIcon from '@mui/icons-material/MenuOpen';

const Home = () => {
    return (
        <>
            <Grid xs={12} sx={{
                paddingTop: '10px',
            }}>
                <Typography>Welcome, User PDT!</Typography>
            </Grid>
            <Grid xs={12} sx={{
                paddingTop: '10px',
            }}>
                <Stack direction="row" alignItems="center" spacing={1}>
                    <Card sx={{
                        padding: '10px'
                    }}>
                        <IconButton aria-label="delete" size="large">
                            <MenuOpenIcon fontSize="inherit" />
                        </IconButton>
                    </Card>
                    <Card sx={{
                        padding: '10px'
                    }}>
                        <IconButton aria-label="delete" size="large">
                            <MenuOpenIcon fontSize="inherit" />
                        </IconButton>
                    </Card>
                    <Card sx={{
                        padding: '10px'
                    }}>
                        <IconButton aria-label="delete" size="large">
                            <MenuOpenIcon fontSize="inherit" />
                        </IconButton>
                    </Card>
                    <Card sx={{
                        padding: '10px'
                    }}>
                        <IconButton aria-label="delete" size="large">
                            <MenuOpenIcon fontSize="inherit" />
                        </IconButton>
                    </Card>
                </Stack>
            </Grid>
            <Grid xs={12} sx={{
                paddingTop: '10px',
            }}>
                <Stack direction="row" alignItems="center" spacing={1}>
                    <Card sx={{
                        padding: '10px'
                    }}>
                        <IconButton aria-label="delete" size="large">
                            <MenuOpenIcon fontSize="inherit" />
                        </IconButton>
                    </Card>
                    <Card sx={{
                        padding: '10px'
                    }}>
                        <IconButton aria-label="delete" size="large">
                            <MenuOpenIcon fontSize="inherit" />
                        </IconButton>
                    </Card>
                    <Card sx={{
                        padding: '10px'
                    }}>
                        <IconButton aria-label="delete" size="large">
                            <MenuOpenIcon fontSize="inherit" />
                        </IconButton>
                    </Card>
                    <Card sx={{
                        padding: '10px'
                    }}>
                        <IconButton aria-label="delete" size="large">
                            <MenuOpenIcon fontSize="inherit" />
                        </IconButton>
                    </Card>
                </Stack>
            </Grid>
        </>
    );
}

export default Home;