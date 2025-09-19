import React, { useState } from 'react';
import {
  Box,
  Typography,
  Container,
  Paper,
  TextField,
  Button,
  AppBar,
  Toolbar,
  IconButton,
  Card,
  CardContent,
  Chip,
  Alert,
  useTheme,
  useMediaQuery
} from '@mui/material';
import {
  CreditCard as CreditCardIcon,
  Home as HomeIcon,
  AccountCircle as AccountCircleIcon,
  Logout as LogoutIcon
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

const DashboardTest = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const [formData, setFormData] = useState({
    amount: '',
    merchantName: '',
    cardNumber: ''
  });
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    // Simulate API call
    setTimeout(() => {
      setResult({
        isFraudulent: Math.random() > 0.5,
        riskLevel: ['LOW', 'MEDIUM', 'HIGH'][Math.floor(Math.random() * 3)],
        reasons: ['Unusual transaction amount', 'New merchant location']
      });
      setLoading(false);
    }, 2000);
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
    navigate('/');
  };

  return (
    <Box sx={{ flexGrow: 1, minHeight: '100vh', bgcolor: 'background.default' }}>
      {/* Navigation Bar */}
      <AppBar position="static" elevation={0} sx={{ bgcolor: 'white', color: 'text.primary', borderBottom: '1px solid', borderColor: 'divider' }}>
        <Toolbar sx={{ px: { xs: 2, md: 3 } }}>
          <CreditCardIcon sx={{ mr: 2, color: 'primary.main' }} />
          <Typography
            variant="h6"
            component="div"
            sx={{
              flexGrow: 1,
              fontWeight: 'bold',
              fontSize: { xs: '1.1rem', md: '1.25rem' }
            }}
          >
            FraudGuard Dashboard
          </Typography>
          <IconButton
            color="inherit"
            onClick={() => navigate('/')}
            sx={{ mr: 1 }}
            title="Go to Home"
            size={isMobile ? "small" : "medium"}
          >
            <HomeIcon />
          </IconButton>
          <IconButton
            color="inherit"
            onClick={handleLogout}
            title="Logout"
            size={isMobile ? "small" : "medium"}
          >
            <LogoutIcon />
          </IconButton>
        </Toolbar>
      </AppBar>

      <Container maxWidth="lg" sx={{ py: { xs: 2, md: 4 }, px: { xs: 2, md: 3 } }}>
        {/* Welcome Section */}
        <Box sx={{ mb: { xs: 3, md: 4 }, textAlign: 'center' }}>
          <Typography
            variant={isMobile ? "h5" : "h4"}
            component="h1"
            gutterBottom
            sx={{
              fontWeight: 'bold',
              color: 'primary.main',
              fontSize: { xs: '1.5rem', md: '2rem' }
            }}
          >
            🎉 Dashboard is Working!
          </Typography>
          <Typography
            variant={isMobile ? "body1" : "h6"}
            color="text.secondary"
            sx={{
              maxWidth: 600,
              mx: 'auto',
              fontSize: { xs: '0.875rem', md: '1.25rem' }
            }}
          >
            This is a test dashboard to verify routing and component rendering
          </Typography>
        </Box>

        {/* Test Form */}
        <Paper elevation={4} sx={{ p: { xs: 3, md: 4 }, borderRadius: 3, mb: 3 }}>
          <Typography
            variant={isMobile ? "h6" : "h5"}
            gutterBottom
            sx={{
              fontWeight: 'bold',
              mb: 3,
              fontSize: { xs: '1.25rem', md: '1.5rem' }
            }}
          >
            Test Transaction Form
          </Typography>

          <Box component="form" onSubmit={handleSubmit}>
            <TextField
              margin="normal"
              required
              fullWidth
              label="Amount ($)"
              name="amount"
              type="number"
              value={formData.amount}
              onChange={handleChange}
              sx={{ mb: 2 }}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              label="Merchant Name"
              name="merchantName"
              value={formData.merchantName}
              onChange={handleChange}
              sx={{ mb: 2 }}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              label="Card Number"
              name="cardNumber"
              value={formData.cardNumber}
              onChange={handleChange}
              placeholder="XXXX-XXXX-XXXX-XXXX"
              sx={{ mb: 3 }}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              disabled={loading}
              size={isMobile ? "medium" : "large"}
              sx={{
                py: { xs: 1.5, md: 2 },
                fontSize: { xs: '1rem', md: '1.1rem' },
                fontWeight: 'bold'
              }}
            >
              {loading ? 'Testing...' : 'Test Transaction'}
            </Button>
          </Box>
        </Paper>

        {/* Test Result */}
        {result && (
          <Card elevation={4} sx={{ borderRadius: 3 }}>
            <CardContent sx={{ p: { xs: 3, md: 4 } }}>
              <Typography
                variant={isMobile ? "subtitle1" : "h6"}
                gutterBottom
                sx={{
                  fontWeight: 'bold',
                  fontSize: { xs: '1.1rem', md: '1.25rem' }
                }}
              >
                Test Result
              </Typography>
              <Box sx={{
                display: 'flex',
                gap: 1,
                mb: 2,
                flexWrap: 'wrap',
                justifyContent: { xs: 'center', md: 'flex-start' }
              }}>
                <Chip
                  label={result.isFraudulent ? "Fraudulent" : "Safe"}
                  color={result.isFraudulent ? "error" : "success"}
                  size={isMobile ? "medium" : "large"}
                />
                <Chip
                  label={`Risk Level: ${result.riskLevel}`}
                  color={result.riskLevel === 'LOW' ? 'success' : result.riskLevel === 'MEDIUM' ? 'warning' : 'error'}
                  size={isMobile ? "medium" : "large"}
                />
              </Box>
              <Alert severity={result.isFraudulent ? "error" : "success"}>
                {result.isFraudulent ? "This is a test fraudulent transaction!" : "This is a test safe transaction!"}
              </Alert>
            </CardContent>
          </Card>
        )}
      </Container>
    </Box>
  );
};

export default DashboardTest;
