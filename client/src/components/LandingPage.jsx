import React from 'react';
import {
  Box,
  Container,
  Typography,
  Button,
  Grid,
  Card,
  CardContent,
  AppBar,
  Toolbar,
  useTheme,
  useMediaQuery,
  Paper,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Chip
} from '@mui/material';
import {
  Security as SecurityIcon,
  Speed as SpeedIcon,
  Analytics as AnalyticsIcon,
  CreditCard as CreditCardIcon,
  Shield as ShieldIcon,
  CheckCircle as CheckCircleIcon,
  TrendingUp as TrendingUpIcon,
  Support as SupportIcon
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

const LandingPage = () => {
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const features = [
    {
      icon: <SecurityIcon sx={{ fontSize: 40, color: 'primary.main' }} />,
      title: 'Advanced AI Detection',
      description: 'Machine learning algorithms analyze transaction patterns in real-time to identify fraudulent activities.'
    },
    {
      icon: <SpeedIcon sx={{ fontSize: 40, color: 'primary.main' }} />,
      title: 'Real-time Processing',
      description: 'Get instant fraud detection results within milliseconds of transaction submission.'
    },
    {
      icon: <AnalyticsIcon sx={{ fontSize: 40, color: 'primary.main' }} />,
      title: 'Risk Assessment',
      description: 'Comprehensive risk scoring with detailed explanations for each transaction analysis.'
    },
    {
      icon: <ShieldIcon sx={{ fontSize: 40, color: 'primary.main' }} />,
      title: 'Secure & Compliant',
      description: 'Bank-grade security with full compliance to financial industry standards.'
    }
  ];

  const benefits = [
    'Reduce fraud losses by up to 95%',
    'Real-time transaction monitoring',
    'Machine learning-powered detection',
    'Easy integration with existing systems',
    '24/7 automated protection',
    'Detailed fraud analytics and reporting'
  ];

  return (
    <Box sx={{ flexGrow: 1 }}>
      {/* Navigation Bar */}
      <AppBar position="static" elevation={0} sx={{ bgcolor: 'white', color: 'text.primary', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
        <Toolbar sx={{ px: { xs: 2, md: 3 }, minHeight: { xs: 56, md: 64 } }}>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <CreditCardIcon sx={{ mr: 2, color: 'primary.main', fontSize: { xs: 24, md: 28 } }} />
            <Typography
              variant="h6"
              component="div"
              sx={{
                fontWeight: 'bold',
                fontSize: { xs: '1.2rem', md: '1.4rem' },
                color: 'primary.main'
              }}
            >
              FraudGuard
            </Typography>
          </Box>
          <Box sx={{ 
            display: 'flex', 
            gap: 1,
            ml: 'auto',
            alignItems: 'center'
          }}>
            <Button 
              color="primary" 
              variant="outlined" 
              onClick={() => navigate('/login')}
              size="medium"
              sx={{ 
                fontSize: '0.875rem',
                px: 3,
                py: 1,
                borderRadius: 2,
                textTransform: 'none',
                fontWeight: 600
              }}
            >
              Login
            </Button>
            <Button 
              color="primary" 
              variant="contained" 
              onClick={() => navigate('/register')}
              size="medium"
              sx={{ 
                fontSize: '0.875rem',
                px: 3,
                py: 1,
                borderRadius: 2,
                textTransform: 'none',
                fontWeight: 600,
                boxShadow: '0 2px 8px rgba(25, 118, 210, 0.3)'
              }}
            >
              Get Started
            </Button>
          </Box>
        </Toolbar>
      </AppBar>

      {/* Hero Section */}
      <Box
        sx={{
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          color: 'white',
          py: { xs: 6, md: 10 },
          position: 'relative',
          overflow: 'hidden',
          minHeight: { xs: '70vh', md: '80vh' },
          display: 'flex',
          alignItems: 'center'
        }}
      >
        <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 2 }}>
          <Grid container spacing={{ xs: 4, md: 6 }} alignItems="center">
            <Grid item xs={12} md={6}>
              <Box sx={{ pr: { md: 4 } }}>
                <Typography
                  variant={isMobile ? "h4" : "h2"}
                  component="h1"
                  gutterBottom
                  sx={{
                    fontWeight: 'bold',
                    mb: 3,
                    fontSize: { xs: '1.8rem', sm: '2.5rem', md: '3.2rem' },
                    lineHeight: 1.2,
                    textShadow: '0 2px 4px rgba(0,0,0,0.1)'
                  }}
                >
                  Protect Your Transactions with AI-Powered Fraud Detection
                </Typography>
                <Typography 
                  variant={isMobile ? "body1" : "h6"}
                  sx={{ 
                    mb: 4, 
                    opacity: 0.95, 
                    lineHeight: 1.7,
                    fontSize: { xs: '1.1rem', md: '1.3rem' },
                    textShadow: '0 1px 2px rgba(0,0,0,0.1)'
                  }}
                >
                  Advanced machine learning algorithms analyze every transaction in real-time, 
                  providing instant fraud detection and risk assessment to keep your finances secure.
                </Typography>
                <Box sx={{ 
                  display: 'flex', 
                  gap: 2, 
                  flexWrap: 'wrap',
                  flexDirection: { xs: 'column', sm: 'row' },
                  alignItems: { xs: 'stretch', sm: 'flex-start' },
                  mt: 4
                }}>
                  <Button
                    variant="contained"
                    size="large"
                    onClick={() => navigate('/register')}
                    sx={{
                      bgcolor: 'white',
                      color: 'primary.main',
                      px: 4,
                      py: 2,
                      fontSize: '1.1rem',
                      fontWeight: 600,
                      borderRadius: 3,
                      textTransform: 'none',
                      boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
                      '&:hover': {
                        bgcolor: 'grey.50',
                        transform: 'translateY(-2px)',
                        boxShadow: '0 6px 16px rgba(0,0,0,0.2)'
                      },
                      transition: 'all 0.3s ease'
                    }}
                  >
                    Start Free Trial
                  </Button>
                  <Button
                    variant="outlined"
                    size="large"
                    onClick={() => navigate('/login')}
                    sx={{
                      borderColor: 'white',
                      color: 'white',
                      px: 4,
                      py: 2,
                      fontSize: '1.1rem',
                      fontWeight: 600,
                      borderRadius: 3,
                      textTransform: 'none',
                      borderWidth: 2,
                      '&:hover': {
                        borderColor: 'white',
                        bgcolor: 'rgba(255,255,255,0.1)',
                        transform: 'translateY(-2px)'
                      },
                      transition: 'all 0.3s ease'
                    }}
                  >
                    Sign In
                  </Button>
                </Box>
              </Box>
            </Grid>
            <Grid item xs={12} md={6}>
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  height: { xs: 350, md: 450 },
                  position: 'relative',
                  mt: { xs: 4, md: 0 }
                }}
              >
                <Paper
                  elevation={15}
                  sx={{
                    p: { xs: 3, md: 4 },
                    borderRadius: 4,
                    bgcolor: 'rgba(255,255,255,0.98)',
                    color: 'text.primary',
                    maxWidth: { xs: 320, md: 350 },
                    width: '100%',
                    textAlign: 'center',
                    backdropFilter: 'blur(10px)',
                    border: '1px solid rgba(255,255,255,0.2)'
                  }}
                >
                  <CreditCardIcon sx={{ 
                    fontSize: { xs: 60, md: 70 }, 
                    color: 'primary.main', 
                    mb: 3 
                  }} />
                  <Typography 
                    variant={isMobile ? "h6" : "h5"} 
                    gutterBottom
                    sx={{ fontWeight: 'bold', mb: 2 }}
                  >
                    Transaction Analysis
                  </Typography>
                  <Chip
                    icon={<CheckCircleIcon />}
                    label="Safe Transaction"
                    color="success"
                    size="large"
                    sx={{ mb: 3, fontSize: '0.9rem' }}
                  />
                  <Typography 
                    variant="body2" 
                    color="text.secondary"
                    sx={{ fontSize: '0.9rem', lineHeight: 1.5 }}
                  >
                    Real-time fraud detection with 99.9% accuracy
                  </Typography>
                </Paper>
              </Box>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* Features Section */}
      <Container maxWidth="lg" sx={{ py: { xs: 6, md: 10 } }}>
        <Box sx={{ textAlign: 'center', mb: { xs: 6, md: 8 } }}>
          <Typography 
            variant={isMobile ? "h4" : "h3"}
            component="h2" 
            gutterBottom
            sx={{ 
              fontWeight: 'bold', 
              mb: 3,
              fontSize: { xs: '1.8rem', md: '2.8rem' },
              color: 'text.primary'
            }}
          >
            Why Choose FraudGuard?
          </Typography>
          <Typography 
            variant="h6" 
            color="text.secondary"
            sx={{ 
              maxWidth: 600, 
              mx: 'auto',
              fontSize: { xs: '1rem', md: '1.2rem' },
              lineHeight: 1.6
            }}
          >
            Advanced technology meets user-friendly design for comprehensive fraud protection
          </Typography>
        </Box>
        <Grid container spacing={{ xs: 3, md: 4 }}>
          {features.map((feature, index) => (
            <Grid item xs={12} sm={6} md={3} key={index}>
              <Card 
                elevation={3} 
                sx={{ 
                  height: '100%',
                  textAlign: 'center',
                  p: 0,
                  borderRadius: 3,
                  transition: 'all 0.3s ease',
                  border: '1px solid rgba(0,0,0,0.05)',
                  '&:hover': {
                    transform: 'translateY(-8px)',
                    boxShadow: '0 12px 24px rgba(0,0,0,0.15)',
                    border: '1px solid rgba(25, 118, 210, 0.2)'
                  }
                }}
              >
                <CardContent sx={{ p: { xs: 3, md: 4 } }}>
                  <Box sx={{ 
                    mb: 3,
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    height: 80
                  }}>
                    {React.cloneElement(feature.icon, {
                      sx: { 
                        fontSize: { xs: 40, md: 48 }, 
                        color: 'primary.main' 
                      }
                    })}
                  </Box>
                  <Typography 
                    variant={isMobile ? "h6" : "h5"} 
                    gutterBottom 
                    sx={{ 
                      fontWeight: 'bold',
                      mb: 2,
                      fontSize: { xs: '1.1rem', md: '1.25rem' }
                    }}
                  >
                    {feature.title}
                  </Typography>
                  <Typography 
                    variant="body2" 
                    color="text.secondary"
                    sx={{ 
                      fontSize: { xs: '0.9rem', md: '1rem' },
                      lineHeight: 1.6
                    }}
                  >
                    {feature.description}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* Benefits Section */}
      <Box sx={{ bgcolor: 'grey.50', py: { xs: 6, md: 10 } }}>
        <Container maxWidth="lg">
          <Grid container spacing={{ xs: 6, md: 8 }} alignItems="center">
            <Grid item xs={12} md={6}>
              <Box sx={{ pr: { md: 4 } }}>
                <Typography 
                  variant={isMobile ? "h4" : "h3"}
                  component="h2" 
                  gutterBottom
                  sx={{ 
                    fontWeight: 'bold', 
                    mb: 3,
                    fontSize: { xs: '1.8rem', md: '2.8rem' },
                    color: 'text.primary'
                  }}
                >
                  Comprehensive Fraud Protection
                </Typography>
                <Typography 
                  variant={isMobile ? "body1" : "h6"}
                  color="text.secondary" 
                  sx={{ 
                    mb: 4, 
                    lineHeight: 1.7,
                    fontSize: { xs: '1.1rem', md: '1.3rem' }
                  }}
                >
                  Our advanced fraud detection system provides multi-layered protection 
                  against various types of fraudulent activities.
                </Typography>
                <List sx={{ mt: 2 }}>
                  {benefits.map((benefit, index) => (
                    <ListItem key={index} sx={{ px: 0, py: 1 }}>
                      <ListItemIcon sx={{ minWidth: 40 }}>
                        <CheckCircleIcon color="success" sx={{ fontSize: 24 }} />
                      </ListItemIcon>
                      <ListItemText 
                        primary={benefit}
                        primaryTypographyProps={{ 
                          fontWeight: 'medium',
                          fontSize: { xs: '0.95rem', md: '1.1rem' },
                          lineHeight: 1.5
                        }}
                      />
                    </ListItem>
                  ))}
                </List>
              </Box>
            </Grid>
            <Grid item xs={12} md={6}>
              <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                <Paper
                  elevation={6}
                  sx={{
                    p: { xs: 4, md: 6 },
                    borderRadius: 4,
                    textAlign: 'center',
                    bgcolor: 'white',
                    maxWidth: 400,
                    width: '100%',
                    border: '1px solid rgba(0,0,0,0.05)'
                  }}
                >
                  <TrendingUpIcon sx={{ 
                    fontSize: { xs: 70, md: 90 }, 
                    color: 'success.main', 
                    mb: 3 
                  }} />
                  <Typography 
                    variant={isMobile ? "h2" : "h1"} 
                    gutterBottom 
                    sx={{ 
                      fontWeight: 'bold',
                      fontSize: { xs: '2.5rem', md: '3.5rem' },
                      color: 'success.main'
                    }}
                  >
                    99.9%
                  </Typography>
                  <Typography 
                    variant={isMobile ? "h6" : "h5"} 
                    color="text.primary" 
                    gutterBottom
                    sx={{ 
                      fontWeight: 'bold',
                      mb: 2,
                      fontSize: { xs: '1.1rem', md: '1.3rem' }
                    }}
                  >
                    Detection Accuracy
                  </Typography>
                  <Typography 
                    variant="body1" 
                    color="text.secondary"
                    sx={{ 
                      fontSize: { xs: '0.9rem', md: '1rem' },
                      lineHeight: 1.6
                    }}
                  >
                    Industry-leading fraud detection with minimal false positives
                  </Typography>
                </Paper>
              </Box>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* CTA Section */}
      <Box
        sx={{
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          color: 'white',
          py: { xs: 8, md: 12 },
          textAlign: 'center',
          position: 'relative',
          overflow: 'hidden'
        }}
      >
        <Container maxWidth="md">
          <Typography 
            variant={isMobile ? "h4" : "h3"}
            component="h2" 
            gutterBottom
            sx={{ 
              fontWeight: 'bold', 
              mb: 4,
              fontSize: { xs: '1.8rem', md: '2.8rem' },
              textShadow: '0 2px 4px rgba(0,0,0,0.1)'
            }}
          >
            Ready to Secure Your Transactions?
          </Typography>
          <Typography 
            variant={isMobile ? "body1" : "h6"}
            sx={{ 
              mb: 6, 
              opacity: 0.95,
              fontSize: { xs: '1.1rem', md: '1.3rem' },
              lineHeight: 1.7,
              textShadow: '0 1px 2px rgba(0,0,0,0.1)',
              maxWidth: 600,
              mx: 'auto'
            }}
          >
            Join thousands of businesses already protected by FraudGuard's 
            advanced fraud detection technology.
          </Typography>
          <Box sx={{ 
            display: 'flex', 
            gap: 3, 
            justifyContent: 'center', 
            flexWrap: 'wrap',
            flexDirection: { xs: 'column', sm: 'row' },
            alignItems: { xs: 'stretch', sm: 'center' },
            maxWidth: 500,
            mx: 'auto'
          }}>
            <Button
              variant="contained"
              size="large"
              onClick={() => navigate('/register')}
              sx={{
                bgcolor: 'white',
                color: 'primary.main',
                px: 6,
                py: 2.5,
                fontSize: '1.1rem',
                fontWeight: 600,
                borderRadius: 3,
                textTransform: 'none',
                boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
                '&:hover': {
                  bgcolor: 'grey.50',
                  transform: 'translateY(-2px)',
                  boxShadow: '0 6px 16px rgba(0,0,0,0.2)'
                },
                transition: 'all 0.3s ease'
              }}
            >
              Get Started Free
            </Button>
            <Button
              variant="outlined"
              size="large"
              sx={{
                borderColor: 'white',
                color: 'white',
                px: 6,
                py: 2.5,
                fontSize: '1.1rem',
                fontWeight: 600,
                borderRadius: 3,
                textTransform: 'none',
                borderWidth: 2,
                '&:hover': {
                  borderColor: 'white',
                  bgcolor: 'rgba(255,255,255,0.1)',
                  transform: 'translateY(-2px)'
                },
                transition: 'all 0.3s ease'
              }}
            >
              Learn More
            </Button>
          </Box>
        </Container>
      </Box>

      {/* Footer */}
      <Box sx={{ bgcolor: 'grey.900', color: 'white', py: { xs: 6, md: 8 } }}>
        <Container maxWidth="lg">
          <Grid container spacing={{ xs: 4, md: 6 }}>
            <Grid item xs={12} md={4}>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                <CreditCardIcon sx={{ mr: 2, color: 'primary.main', fontSize: 28 }} />
                <Typography variant="h6" sx={{ fontWeight: 'bold', fontSize: '1.3rem' }}>
                  FraudGuard
                </Typography>
              </Box>
              <Typography variant="body1" color="grey.300" sx={{ lineHeight: 1.6 }}>
                Advanced AI-powered fraud detection for secure transactions. 
                Protecting businesses worldwide with cutting-edge technology.
              </Typography>
            </Grid>
            <Grid item xs={12} md={4}>
              <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold', mb: 3 }}>
                Support
              </Typography>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                <Typography variant="body1" color="grey.300">
                  24/7 Customer Support
                </Typography>
                <Typography variant="body1" color="grey.300">
                  support@fraudguard.com
                </Typography>
                <Typography variant="body1" color="grey.300">
                  +1 (555) 123-4567
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={12} md={4}>
              <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold', mb: 3 }}>
                Security
              </Typography>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                <Typography variant="body1" color="grey.300">
                  Bank-grade encryption
                </Typography>
                <Typography variant="body1" color="grey.300">
                  SOC 2 Compliant
                </Typography>
                <Typography variant="body1" color="grey.300">
                  GDPR Compliant
                </Typography>
              </Box>
            </Grid>
          </Grid>
          <Box sx={{ 
            borderTop: '1px solid', 
            borderColor: 'grey.700', 
            mt: { xs: 6, md: 8 }, 
            pt: 4,
            textAlign: 'center'
          }}>
            <Typography variant="body1" color="grey.400">
              © 2024 FraudGuard. All rights reserved. | Privacy Policy | Terms of Service
            </Typography>
          </Box>
        </Container>
      </Box>
    </Box>
  );
};

export default LandingPage;
