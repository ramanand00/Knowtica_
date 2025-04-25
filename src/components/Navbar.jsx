import { AppBar, Toolbar, Typography, Button, Box, IconButton } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';
import GitHubIcon from '@mui/icons-material/GitHub';
import DashboardIcon from '@mui/icons-material/Dashboard';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';

const Navbar = () => {
  const { isAuthenticated, loginWithRedirect, logout } = useAuth0();

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          Knowtica
        </Typography>
        <Box>
          {isAuthenticated ? (
            <>
              <Button
                color="inherit"
                component={RouterLink}
                to="/dashboard"
                startIcon={<DashboardIcon />}
              >
                Dashboard
              </Button>
              <Button
                color="inherit"
                component={RouterLink}
                to="/github"
                startIcon={<GitHubIcon />}
              >
                GitHub Repos
              </Button>
              <Button
                color="inherit"
                component={RouterLink}
                to="/deployments"
                startIcon={<CloudUploadIcon />}
              >
                Deployments
              </Button>
              <Button color="inherit" onClick={() => logout()}>
                Logout
              </Button>
            </>
          ) : (
            <>
              <Button color="inherit" onClick={() => loginWithRedirect()}>
                Login
              </Button>
              <Button
                color="inherit"
                onClick={() => loginWithRedirect({ screen_hint: 'signup' })}
              >
                Register
              </Button>
            </>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar; 