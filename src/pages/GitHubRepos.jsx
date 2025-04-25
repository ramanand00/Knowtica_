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
  CircularProgress,
  Alert,
} from '@mui/material';
import { useAuth0 } from '@auth0/auth0-react';
import axios from 'axios';

const GitHubRepos = () => {
  const [repos, setRepos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { getAccessTokenSilently } = useAuth0();

  useEffect(() => {
    const fetchRepos = async () => {
      try {
        const token = await getAccessTokenSilently();
        const response = await axios.get('https://api.github.com/user/repos', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setRepos(response.data);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch repositories');
        setLoading(false);
      }
    };

    fetchRepos();
  }, [getAccessTokenSilently]);

  const handleDeploy = async (repo) => {
    try {
      const token = await getAccessTokenSilently();
      // TODO: Implement deployment logic with your backend
      console.log('Deploying repository:', repo.name);
    } catch (err) {
      setError('Failed to deploy repository');
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
          Your GitHub Repositories
        </Typography>
        <Grid container spacing={3}>
          {repos.map((repo) => (
            <Grid item xs={12} sm={6} md={4} key={repo.id}>
              <Card>
                <CardContent>
                  <Typography variant="h6" component="div">
                    {repo.name}
                  </Typography>
                  <Typography color="text.secondary" gutterBottom>
                    {repo.description || 'No description'}
                  </Typography>
                  <Typography variant="body2">
                    Language: {repo.language || 'Not specified'}
                  </Typography>
                  <Typography variant="body2">
                    Stars: {repo.stargazers_count}
                  </Typography>
                </CardContent>
                <CardActions>
                  <Button
                    size="small"
                    variant="contained"
                    onClick={() => handleDeploy(repo)}
                  >
                    Deploy
                  </Button>
                  <Button
                    size="small"
                    href={repo.html_url}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    View on GitHub
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

export default GitHubRepos; 