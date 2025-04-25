import { useState } from 'react';
import {
  Container,
  Typography,
  Button,
  Grid,
  Card,
  CardContent,
  CardActions,
  TextField,
  Box,
} from '@mui/material';

const Dashboard = () => {
  const [websites, setWebsites] = useState([]);
  const [newWebsite, setNewWebsite] = useState({
    name: '',
    domain: '',
    description: '',
  });

  const handleInputChange = (e) => {
    setNewWebsite({ ...newWebsite, [e.target.name]: e.target.value });
  };

  const handleAddWebsite = () => {
    if (newWebsite.name && newWebsite.domain) {
      setWebsites([...websites, { ...newWebsite, id: Date.now() }]);
      setNewWebsite({ name: '', domain: '', description: '' });
    }
  };

  const handleDeployWebsite = (websiteId) => {
    // TODO: Implement deployment logic
    console.log('Deploying website:', websiteId);
  };

  return (
    <Container maxWidth="lg">
      <Box sx={{ mt: 4, mb: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          My Websites
        </Typography>
        
        <Card sx={{ mb: 4, p: 2 }}>
          <Typography variant="h6" gutterBottom>
            Add New Website
          </Typography>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={4}>
              <TextField
                fullWidth
                label="Website Name"
                name="name"
                value={newWebsite.name}
                onChange={handleInputChange}
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField
                fullWidth
                label="Domain"
                name="domain"
                value={newWebsite.domain}
                onChange={handleInputChange}
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField
                fullWidth
                label="Description"
                name="description"
                value={newWebsite.description}
                onChange={handleInputChange}
              />
            </Grid>
          </Grid>
          <Button
            variant="contained"
            color="primary"
            onClick={handleAddWebsite}
            sx={{ mt: 2 }}
          >
            Add Website
          </Button>
        </Card>

        <Grid container spacing={3}>
          {websites.map((website) => (
            <Grid item xs={12} sm={6} md={4} key={website.id}>
              <Card>
                <CardContent>
                  <Typography variant="h6" component="div">
                    {website.name}
                  </Typography>
                  <Typography color="text.secondary" gutterBottom>
                    {website.domain}
                  </Typography>
                  <Typography variant="body2">
                    {website.description}
                  </Typography>
                </CardContent>
                <CardActions>
                  <Button
                    size="small"
                    variant="contained"
                    onClick={() => handleDeployWebsite(website.id)}
                  >
                    Deploy
                  </Button>
                  <Button size="small" color="error">
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

export default Dashboard; 