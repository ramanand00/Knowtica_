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

const Register = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { loginWithRedirect, isLoading } = useAuth0();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      setLoading(false);
      return;
    }

    try {
      await loginWithRedirect({
        appState: { returnTo: '/dashboard' },
        authorizationParams: {
          connection: 'Username-Password-Authentication',
          screen_hint: 'signup',
          username: formData.email,
          password: formData.password,
          user_metadata: {
            name: formData.name,
          },
        },
      });
    } catch (err) {
      setError('Failed to register. Please try again.');
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
        screen_hint: 'signup',
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
            Create an Account
          </Typography>
          <Typography variant="body1" align="center" color="text.secondary" sx={{ mb: 4 }}>
            Join Knowtica to start hosting your websites
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
              label="Name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              margin="normal"
              required
              sx={{ mb: 2 }}
            />
            <TextField
              fullWidth
              label="Email"
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              margin="normal"
              required
              sx={{ mb: 2 }}
            />
            <TextField
              fullWidth
              label="Password"
              type={showPassword ? 'text' : 'password'}
              name="password"
              value={formData.password}
              onChange={handleChange}
              margin="normal"
              required
              sx={{ mb: 2 }}
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
            <TextField
              fullWidth
              label="Confirm Password"
              type={showPassword ? 'text' : 'password'}
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              margin="normal"
              required
              sx={{ mb: 2 }}
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
              Sign Up
            </Button>
          </form>

          <Box sx={{ textAlign: 'center', mt: 2 }}>
            <Typography variant="body2" color="text.secondary">
              Already have an account?{' '}
              <Button
                component={RouterLink}
                to="/login"
                color="primary"
                sx={{ textTransform: 'none' }}
              >
                Sign In
              </Button>
            </Typography>
          </Box>
        </Paper>
      </Box>
    </Container>
  );
};

export default Register; 