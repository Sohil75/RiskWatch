import React, { useState } from 'react';
import {
  TextField,
  Button,
  Paper,
  Typography,
  Container,
  Box,
  Alert,
  CircularProgress,
  Chip,
  Divider,
  Card,
  CardContent,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  AppBar,
  Toolbar,
  IconButton,
  Menu,
  MenuItem,
  useTheme,
  useMediaQuery
} from '@mui/material';
import {
  Warning as WarningIcon,
  CheckCircle as CheckCircleIcon,
  Error as ErrorIcon,
  Info as InfoIcon,
  CreditCard as CreditCardIcon,
  Logout as LogoutIcon,
  AccountCircle as AccountCircleIcon,
  Home as HomeIcon,
  History as HistoryIcon
} from '@mui/icons-material';
import { checkTransaction } from '../services/api';
import { useNavigate } from 'react-router-dom';

const TransactionCheck = ({ darkMode }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const [formData, setFormData] = useState({
    amount: '',
    merchantName: '',
    cardNumber: ''
  });
  const [result, setResult] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const response = await checkTransaction({
        ...formData,
        amount: parseFloat(formData.amount)
      });
      setResult(response);
      setError('');
    } catch (error) {
      if (error.message === 'Authentication required') {
        setError('Please log in to check transactions');
        navigate('/login');
      } else {
        setError(error.response?.data?.message || 'Transaction check failed');
      }
      setResult(null);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
    navigate('/');
    handleMenuClose();
  };

  return (
    <Box sx={{ flexGrow: 1, minHeight: '100vh', bgcolor: 'background.default' }}>
      {/* Navigation Bar */}
      <AppBar position="static" elevation={0} sx={{ bgcolor: 'background.paper', color: 'text.primary', borderBottom: '1px solid', borderColor: 'divider' }}>
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
            onClick={() => navigate('/history')}
            sx={{ mr: 1 }}
            title="View History"
            size={isMobile ? "small" : "medium"}
          >
            <HistoryIcon />
          </IconButton>
          <IconButton
            color="inherit"
            onClick={handleMenuOpen}
            title="Account Menu"
            size={isMobile ? "small" : "medium"}
          >
            <AccountCircleIcon />
          </IconButton>
          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleMenuClose}
          >
            <MenuItem onClick={handleLogout}>
              <LogoutIcon sx={{ mr: 1 }} />
              Logout
            </MenuItem>
          </Menu>
        </Toolbar>
      </AppBar>

      <Container component="main" maxWidth="lg" sx={{ py: { xs: 2, md: 4 }, px: { xs: 2, md: 3 } }}>
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
            Welcome to FraudGuard Dashboard
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
            Protect your transactions with our advanced AI-powered fraud detection system
          </Typography>
        </Box>

        {/* Main Content Grid */}
        <Box sx={{
          display: 'grid',
          gridTemplateColumns: { xs: '1fr', lg: '1fr 1fr' },
          gap: { xs: 2, md: 3 },
          alignItems: 'start'
        }}>
          {/* Transaction Form */}
          <Paper
            elevation={4}
            sx={{
              p: { xs: 3, md: 4 },
              borderRadius: 3,
              bgcolor: 'background.paper',
              minHeight: { xs: 400, md: 500 }
            }}
          >
            <Box sx={{ textAlign: 'center', mb: 3 }}>
              <CreditCardIcon sx={{
                fontSize: { xs: 50, md: 60 },
                color: 'primary.main',
                mb: 2
              }} />
              <Typography
                variant={isMobile ? "h6" : "h5"}
                component="h2"
                gutterBottom
                sx={{
                  fontWeight: 'bold',
                  fontSize: { xs: '1.25rem', md: '1.5rem' }
                }}
              >
                Transaction Analysis
              </Typography>
              <Typography
                variant="body1"
                color="text.secondary"
                sx={{ fontSize: { xs: '0.875rem', md: '1rem' } }}
              >
                Enter transaction details to analyze for potential fraud
              </Typography>
            </Box>

            {error && (
              <Alert severity="error" sx={{ mb: 3 }}>
                {error}
              </Alert>
            )}

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
                InputProps={{
                  startAdornment: '$'
                }}
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
                  fontWeight: 'bold',
                  borderRadius: 2
                }}
                startIcon={loading ? <CircularProgress size={20} /> : <CreditCardIcon />}
              >
                {loading ? 'Analyzing Transaction...' : 'Analyze Transaction'}
              </Button>
            </Box>
          </Paper>

          {/* Results Section */}
          <Box sx={{ minHeight: { xs: 400, md: 500 } }}>
            {result ? (
              <Card
                elevation={4}
                sx={{
                  height: '100%',
                  borderRadius: 3,
                  bgcolor: 'background.paper'
                }}
              >
                <CardContent sx={{ p: { xs: 3, md: 4 } }}>
                  <Box sx={{ textAlign: 'center', mb: 3 }}>
                    <Typography
                      variant={isMobile ? "h6" : "h5"}
                      component="h2"
                      gutterBottom
                      sx={{
                        fontWeight: 'bold',
                        fontSize: { xs: '1.25rem', md: '1.5rem' }
                      }}
                    >
                      Analysis Result
                    </Typography>
                  </Box>

                  <Box sx={{
                    display: 'flex',
                    gap: 1,
                    flexWrap: 'wrap',
                    mb: 3,
                    justifyContent: 'center'
                  }}>
                    <Chip
                      icon={result.isFraudulent ? <WarningIcon /> : <CheckCircleIcon />}
                      label={result.isFraudulent ? "Fraudulent" : "Safe"}
                      color={result.isFraudulent ? "error" : "success"}
                      size={isMobile ? "medium" : "large"}
                      sx={{ mb: 1 }}
                    />
                    <Chip
                      icon={
                        result.riskLevel === 'LOW' ? <CheckCircleIcon /> :
                        result.riskLevel === 'MEDIUM' ? <InfoIcon /> :
                        result.riskLevel === 'HIGH' ? <WarningIcon /> :
                        <ErrorIcon />
                      }
                      label={`Risk Level: ${result.riskLevel}`}
                      color={
                        result.riskLevel === 'LOW' ? 'success' :
                        result.riskLevel === 'MEDIUM' ? 'warning' :
                        result.riskLevel === 'HIGH' ? 'error' : 'error'
                      }
                      size={isMobile ? "medium" : "large"}
                      sx={{ mb: 1 }}
                    />
                  </Box>

                  <Divider sx={{ my: 3 }} />

                  <Typography
                    variant={isMobile ? "subtitle1" : "h6"}
                    gutterBottom
                    sx={{
                      fontWeight: 'bold',
                      mb: 2,
                      fontSize: { xs: '1.1rem', md: '1.25rem' }
                    }}
                  >
                    Detection Results:
                  </Typography>

                  {result.reasons && result.reasons.length > 0 ? (
                    <>
                      <Alert
                        severity={result.isFraudulent ? "error" : "warning"}
                        sx={{ mb: 3 }}
                      >
                        {result.isFraudulent ?
                          "This transaction has been flagged as fraudulent!" :
                          "This transaction requires additional verification."
                        }
                      </Alert>
                      <List>
                        {result.reasons.map((reason, index) => (
                          <ListItem key={index} sx={{ px: 0 }}>
                            <ListItemIcon>
                              <ErrorIcon color="error" />
                            </ListItemIcon>
                            <ListItemText
                              primary={reason}
                              secondary={result.isFraudulent ? "High Risk Indicator" : "Warning Indicator"}
                            />
                          </ListItem>
                        ))}
                      </List>
                    </>
                  ) : (
                    <Alert severity="success" sx={{ mb: 3 }}>
                      No suspicious activity detected
                    </Alert>
                  )}

                  <Box sx={{ mt: 3, p: 2, bgcolor: 'action.hover', borderRadius: 2 }}>
                    <Typography variant="body2" color="text.secondary" gutterBottom>
                      <strong>Transaction ID:</strong> {Math.random().toString(36).substr(2, 9).toUpperCase()}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      <strong>Verification Time:</strong> {new Date().toLocaleString()}
                    </Typography>
                  </Box>
                </CardContent>
              </Card>
            ) : (
              <Card
                elevation={2}
                sx={{
                  height: '100%',
                  borderRadius: 3,
                  bgcolor: 'background.paper',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
              >
                <CardContent sx={{ textAlign: 'center', p: 4 }}>
                  <CreditCardIcon sx={{ fontSize: 80, color: 'grey.400', mb: 2 }} />
                  <Typography variant="h6" color="text.secondary" gutterBottom>
                    No Analysis Yet
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Submit a transaction to see fraud detection results here
                  </Typography>
                </CardContent>
              </Card>
            )}
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default TransactionCheck;
