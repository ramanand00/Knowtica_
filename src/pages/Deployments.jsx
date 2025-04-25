import { useState, useEffect } from 'react';
import {
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  CardActions,
  Button,
  Box,
  Chip,
  CircularProgress,
  Alert,
} from '@mui/material';
import { useAuth0 } from '@auth0/auth0-react';
import axios from 'axios';

const Deployments = () => {
  const [deployments, setDeployments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { getAccessTokenSilently } = useAuth0();

  useEffect(() => {
    const fetchDeployments = async () => {
      try {
        const token = await getAccessTokenSilently();
        // TODO: Replace with your backend API endpoint
        const response = await axios.get('/api/deployments', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setDeployments(response.data);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch deployments');
        setLoading(false);
      }
    };

    fetchDeployments();
  }, [getAccessTokenSilently]);

  const getStatusColor = (status) => {
    switch (status) {
      case 'success':
        return 'success';
      case 'failed':
        return 'error';
      case 'pending':
        return 'warning';
      default:
        return 'default';
    }
  };

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="60vh">
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Container>
        <Alert severity="error" sx={{ mt: 2 }}>
          {error}
        </Alert>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg">
      <Box sx={{ mt: 4, mb: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Your Deployments
        </Typography>
        <Grid container spacing={3}>
          {deployments.map((deployment) => (
            <Grid item xs={12} key={deployment.id}>
              <Card>
                <CardContent>
                  <Box display="flex" justifyContent="space-between" alignItems="center">
                    <Typography variant="h6" component="div">
                      {deployment.repoName}
                    </Typography>
                    <Chip
                      label={deployment.status}
                      color={getStatusColor(deployment.status)}
                    />
                  </Box>
                  <Typography color="text.secondary" gutterBottom>
                    Branch: {deployment.branch}
                  </Typography>
                  <Typography variant="body2">
                    Deployed at: {new Date(deployment.deployedAt).toLocaleString()}
                  </Typography>
                  <Typography variant="body2">
                    URL: {deployment.url}
                  </Typography>
                </CardContent>
                <CardActions>
                  <Button
                    size="small"
                    href={deployment.url}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Visit Site
                  </Button>
                  <Button
                    size="small"
                    color="error"
                    onClick={() => {
                      // TODO: Implement delete deployment
                    }}
                  >
                    Delete
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Container>
  );
};

export default Deployments; 