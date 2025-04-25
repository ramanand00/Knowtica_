import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material';
import { Auth0Provider } from '@auth0/auth0-react';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import Navbar from './components/Navbar';
import ProtectedRoute from './components/ProtectedRoute';
import GitHubRepos from './pages/GitHubRepos';
import Deployments from './pages/Deployments';

const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2',
    },
    secondary: {
      main: '#dc004e',
    },
    background: {
      default: '#f5f5f5',
      paper: '#ffffff',
    },
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    h1: {
      fontWeight: 500,
    },
    h2: {
      fontWeight: 500,
    },
    h3: {
      fontWeight: 500,
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          textTransform: 'none',
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
        },
      },
    },
  },
});

function App() {
  return (
    <Auth0Provider
      domain="dev-m8z7s6kfvemxsyc3.us.auth0.com"
      clientId="TvLRsgEpn66eHAJSyJtkwMEzfjr8aOYg"
      authorizationParams={{
        redirect_uri: window.location.origin,
        audience: "https://dev-m8z7s6kfvemxsyc3.us.auth0.com/api/v2/",
        scope: "openid profile email read:current_user update:current_user_metadata",
        response_type: "code",
        prompt: "login",
      }}
      cacheLocation="localstorage"
      useRefreshTokens={true}
    >
      <ThemeProvider theme={theme}>
        <Router>
          <Navbar />
          <Routes>
            <Route path="/" element={<Navigate to="/login" replace />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route
              path="/dashboard"
              element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              }
            />
            <Route
              path="/github"
              element={
                <ProtectedRoute>
                  <GitHubRepos />
                </ProtectedRoute>
              }
            />
            <Route
              path="/deployments"
              element={
                <ProtectedRoute>
                  <Deployments />
                </ProtectedRoute>
              }
            />
          </Routes>
        </Router>
      </ThemeProvider>
    </Auth0Provider>
  );
}

export default App; 