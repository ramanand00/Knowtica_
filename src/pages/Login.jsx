import { useState } from 'react';
import { useNavigate, Link as RouterLink } from 'react-router-dom';
import {
  Container,
  Paper,
  TextField,
  Button,
  Typography,
  Box,
  Divider,
  IconButton,
  InputAdornment,
  Alert,
  CircularProgress,
} from '@mui/material';
import { useAuth0 } from '@auth0/auth0-react';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import GitHubIcon from '@mui/icons-material/GitHub';
import GoogleIcon from '@mui/icons-material/Google';
import FacebookIcon from '@mui/icons-material/Facebook';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { loginWithRedirect, isLoading } = useAuth0();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      await loginWithRedirect({
        appState: { returnTo: '/dashboard' },
        authorizationParams: {
          connection: 'Username-Password-Authentication',
          username: email,
          password: password,
        },
      });
    } catch (err) {
      setError('Failed to login. Please try again.');
      setLoading(false);
    }
  };

  const handleSocialLogin = (connection) => {
    setLoading(true);
    setError('');
    loginWithRedirect({
      appState: { returnTo: '/dashboard' },
      authorizationParams: {
        connection,
      },
    });
  };

  if (isLoading || loading) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        minHeight="100vh"
      >
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Container maxWidth="sm">
      <Box sx={{ mt: 8, mb: 4 }}>
        <Paper elevation={3} sx={{ p: 4, borderRadius: 2 }}>
          <Typography variant="h4" component="h1" gutterBottom align="center" sx={{ fontWeight: 600 }}>
            Welcome Back
          </Typography>
          <Typography variant="body1" align="center" color="text.secondary" sx={{ mb: 4 }}>
            Sign in to continue to Knowtica
          </Typography>

          {error && (
            <Alert severity="error" sx={{ mb: 3 }}>
              {error}
            </Alert>
          )}

          <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2, mb: 3 }}>
            <IconButton
              onClick={() => handleSocialLogin('github')}
              sx={{
                backgroundColor: '#24292e',
                color: 'white',
                '&:hover': { backgroundColor: '#1b1f23' },
              }}
            >
              <GitHubIcon />
            </IconButton>
            <IconButton
              onClick={() => handleSocialLogin('google-oauth2')}
              sx={{
                backgroundColor: '#DB4437',
                color: 'white',
                '&:hover': { backgroundColor: '#c53929' },
              }}
            >
              <GoogleIcon />
            </IconButton>
            <IconButton
              onClick={() => handleSocialLogin('facebook')}
              sx={{
                backgroundColor: '#4267B2',
                color: 'white',
                '&:hover': { backgroundColor: '#365899' },
              }}
            >
              <FacebookIcon />
            </IconButton>
          </Box>

          <Divider sx={{ my: 3 }}>
            <Typography variant="body2" color="text.secondary">
              OR
            </Typography>
          </Divider>

          <form onSubmit={handleSubmit}>
            <TextField
              fullWidth
              label="Email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              margin="normal"
              required
              sx={{ mb: 2 }}
            />
            <TextField
              fullWidth
              label="Password"
              type={showPassword ? 'text' : 'password'}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              margin="normal"
              required
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={() => setShowPassword(!showPassword)}
                      edge="end"
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              size="large"
              sx={{ mt: 3, mb: 2, py: 1.5 }}
              disabled={loading}
            >
              Sign In
            </Button>
          </form>

          <Box sx={{ textAlign: 'center', mt: 2 }}>
            <Typography variant="body2" color="text.secondary">
              Don't have an account?{' '}
              <Button
                component={RouterLink}
                to="/register"
                color="primary"
                sx={{ textTransform: 'none' }}
              >
                Sign Up
              </Button>
            </Typography>
          </Box>
        </Paper>
      </Box>
    </Container>
  );
};

export default Login; 