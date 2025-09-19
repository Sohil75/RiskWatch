import React, { useState } from 'react';
import {
  TextField,
  Button,
  Paper,
  Typography,
  Container,
  Box,
  AppBar,
  Toolbar,
  Alert,
  InputAdornment,
  IconButton,
  useTheme,
  useMediaQuery
} from '@mui/material';
import {
  Visibility,
  VisibilityOff,
  Email,
  Lock,
  Person,
  ArrowBack,
  CreditCard
} from '@mui/icons-material';
import { register } from '../services/api';
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: ''
  });
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const response = await register(
        formData.username,
        formData.email,
        formData.password
      );
      localStorage.setItem('token', response.token);
      navigate('/dashboard');
    } catch (error) {
      setError(error.response?.data?.message || 'Registration failed');
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

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <Box sx={{ flexGrow: 1, bgcolor: 'background.default', minHeight: '100vh' }}>
      {/* Navigation Bar */}
      <AppBar position="static" elevation={0} sx={{ bgcolor: 'background.paper', color: 'text.primary', borderBottom: '1px solid', borderColor: 'divider' }}>
        <Toolbar sx={{ px: { xs: 2, md: 3 } }}>
          <IconButton
            edge="start"
            color="inherit"
            onClick={() => navigate('/')}
            sx={{ mr: 2 }}
          >
            <ArrowBack />
          </IconButton>
          <CreditCard sx={{ mr: 2, color: 'primary.main' }} />
          <Typography
            variant="h6"
            component="div"
            sx={{
              flexGrow: 1,
              fontWeight: 'bold',
              fontSize: { xs: '1.1rem', md: '1.25rem' }
            }}
          >
            FraudGuard
          </Typography>
        </Toolbar>
      </AppBar>

      <Container component="main" maxWidth="sm" sx={{ py: { xs: 2, md: 4 }, px: { xs: 2, md: 3 } }}>
        <Box
          sx={{
            marginTop: { xs: 2, md: 4 },
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            minHeight: 'calc(100vh - 200px)',
            justifyContent: 'center',
          }}
        >
          <Paper
            elevation={6}
            sx={{
              p: { xs: 3, md: 4 },
              width: '100%',
              borderRadius: 3,
              bgcolor: 'background.paper'
            }}
          >
            <Box sx={{ textAlign: 'center', mb: 3 }}>
              <CreditCard sx={{
                fontSize: { xs: 50, md: 60 },
                color: 'primary.main',
                mb: 2
              }} />
              <Typography
                variant={isMobile ? "h5" : "h4"}
                component="h1"
                gutterBottom
                sx={{
                  fontWeight: 'bold',
                  fontSize: { xs: '1.5rem', md: '2rem' }
                }}
              >
                Create Account
              </Typography>
              <Typography
                variant="body1"
                color="text.secondary"
                sx={{ fontSize: { xs: '0.875rem', md: '1rem' } }}
              >
                Join FraudGuard and start protecting your transactions today
              </Typography>
            </Box>

            {error && (
              <Alert severity="error" sx={{ mb: 3 }}>
                {error}
              </Alert>
            )}

            <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
              <TextField
                margin="normal"
                required
                fullWidth
                label="Username"
                name="username"
                value={formData.username}
                onChange={handleChange}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Person color="action" />
                    </InputAdornment>
                  ),
                }}
                sx={{ mb: 2 }}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                label="Email Address"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Email color="action" />
                    </InputAdornment>
                  ),
                }}
                sx={{ mb: 2 }}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                label="Password"
                name="password"
                type={showPassword ? 'text' : 'password'}
                value={formData.password}
                onChange={handleChange}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Lock color="action" />
                    </InputAdornment>
                  ),
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowPassword}
                        edge="end"
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
                sx={{ mb: 3 }}
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                disabled={loading}
                size={isMobile ? "medium" : "large"}
                sx={{
                  mt: 3,
                  mb: 2,
                  py: { xs: 1.5, md: 1.5 },
                  fontSize: { xs: '1rem', md: '1.1rem' },
                  fontWeight: 'bold'
                }}
              >
                {loading ? 'Creating Account...' : 'Create Account'}
              </Button>
              <Button
                fullWidth
                variant="text"
                onClick={() => navigate('/login')}
                size={isMobile ? "small" : "medium"}
                sx={{
                  mt: 1,
                  mb: 2,
                  fontSize: { xs: '0.875rem', md: '1rem' }
                }}
              >
                Already have an account? Login here
              </Button>
            </Box>
          </Paper>
        </Box>
      </Container>
    </Box>
  );
};

export default Register;
