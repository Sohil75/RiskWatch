import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Container,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Chip,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  AppBar,
  Toolbar,
  IconButton,
  Menu,
  useTheme,
  useMediaQuery,
  CircularProgress,
  Alert
} from '@mui/material';
import {
  History as HistoryIcon,
  Home as HomeIcon,
  AccountCircle as AccountCircleIcon,
  Logout as LogoutIcon,
  FilterList as FilterIcon,
  Search as SearchIcon
} from '@mui/icons-material';
import { getTransactions } from '../services/api';
import { useNavigate } from 'react-router-dom';

const TransactionHistory = ({ darkMode }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [transactions, setTransactions] = useState([]);
  const [filteredTransactions, setFilteredTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [riskFilter, setRiskFilter] = useState('ALL');
  const [anchorEl, setAnchorEl] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetchTransactions();
  }, []);

  useEffect(() => {
    filterTransactions();
  }, [transactions, searchTerm, riskFilter]);

  const fetchTransactions = async () => {
    try {
      const userId = localStorage.getItem('userId');
      const token = localStorage.getItem('token');

      console.log('Fetching transactions for userId:', userId);
      console.log('Token exists:', !!token);

      if (!userId) {
        setError('User ID not found. Please log in again.');
        navigate('/login');
        return;
      }

      if (!token) {
        setError('Authentication token not found. Please log in again.');
        navigate('/login');
        return;
      }

      const response = await getTransactions(userId);
      console.log('Transactions response:', response);
      setTransactions(response);
    } catch (error) {
      console.error('Error fetching transactions:', error);
      if (error.response?.status === 401) {
        setError('Authentication failed. Please log in again.');
        navigate('/login');
      } else if (error.response?.status === 404) {
        setError('No transactions found. Try submitting some transactions first.');
      } else {
        setError(error.response?.data?.message || 'Failed to load transaction history');
      }
    } finally {
      setLoading(false);
    }
  };

  const filterTransactions = () => {
    let filtered = transactions;

    // Search filter
    if (searchTerm) {
      filtered = filtered.filter(transaction =>
        transaction.merchantName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        transaction.cardNumber.includes(searchTerm)
      );
    }

    // Risk level filter
    if (riskFilter !== 'ALL') {
      filtered = filtered.filter(transaction => transaction.riskLevel === riskFilter);
    }

    setFilteredTransactions(filtered);
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

  const getRiskColor = (riskLevel) => {
    switch (riskLevel) {
      case 'LOW': return 'success';
      case 'MEDIUM': return 'warning';
      case 'HIGH': return 'error';
      case 'CRITICAL': return 'error';
      default: return 'default';
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh' }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box sx={{ flexGrow: 1, minHeight: '100vh', bgcolor: 'background.default' }}>
      {/* Navigation Bar */}
      <AppBar position="static" elevation={0} sx={{ bgcolor: 'background.paper', color: 'text.primary', borderBottom: '1px solid', borderColor: 'divider' }}>
        <Toolbar sx={{ px: { xs: 2, md: 3 } }}>
          <HistoryIcon sx={{ mr: 2, color: 'primary.main' }} />
          <Typography
            variant="h6"
            component="div"
            sx={{
              flexGrow: 1,
              fontWeight: 'bold',
              fontSize: { xs: '1.1rem', md: '1.25rem' }
            }}
          >
            Transaction History
          </Typography>
          <IconButton
            color="inherit"
            onClick={() => navigate('/dashboard')}
            sx={{ mr: 1 }}
            title="Go to Dashboard"
            size={isMobile ? "small" : "medium"}
          >
            <HomeIcon />
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

      <Container maxWidth="xl" sx={{ py: { xs: 2, md: 4 }, px: { xs: 2, md: 3 } }}>
        {/* Header */}
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
            Your Transaction History
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
            View and analyze all your past transactions
          </Typography>
        </Box>

        {/* Filters */}
        <Paper elevation={2} sx={{ p: { xs: 2, md: 3 }, mb: 3, borderRadius: 2, bgcolor: 'background.paper' }}>
          <Box sx={{
            display: 'flex',
            gap: 2,
            flexWrap: 'wrap',
            alignItems: 'center',
            mb: 2
          }}>
            <FilterIcon color="action" />
            <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
              Filters
            </Typography>
          </Box>
          <Box sx={{
            display: 'flex',
            gap: 2,
            flexWrap: 'wrap',
            alignItems: 'center'
          }}>
            <TextField
              label="Search Merchant or Card"
              variant="outlined"
              size="small"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              InputProps={{
                startAdornment: <SearchIcon sx={{ mr: 1, color: 'action' }} />
              }}
              sx={{ minWidth: 200 }}
            />
            <FormControl size="small" sx={{ minWidth: 150 }}>
              <InputLabel>Risk Level</InputLabel>
              <Select
                value={riskFilter}
                label="Risk Level"
                onChange={(e) => setRiskFilter(e.target.value)}
              >
                <MenuItem value="ALL">All Risk Levels</MenuItem>
                <MenuItem value="LOW">Low</MenuItem>
                <MenuItem value="MEDIUM">Medium</MenuItem>
                <MenuItem value="HIGH">High</MenuItem>
                <MenuItem value="CRITICAL">Critical</MenuItem>
              </Select>
            </FormControl>
          </Box>
        </Paper>

        {/* Error Message */}
        {error && (
          <Alert severity="error" sx={{ mb: 3 }}>
            {error}
          </Alert>
        )}

        {/* Transactions Table */}
        <Paper elevation={3} sx={{ borderRadius: 3, overflow: 'hidden', bgcolor: 'background.paper' }}>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow sx={{ bgcolor: 'action.hover' }}>
                  <TableCell sx={{ fontWeight: 'bold' }}>Date</TableCell>
                  <TableCell sx={{ fontWeight: 'bold' }}>Merchant</TableCell>
                  <TableCell sx={{ fontWeight: 'bold' }}>Amount</TableCell>
                  <TableCell sx={{ fontWeight: 'bold' }}>Risk Level</TableCell>
                  <TableCell sx={{ fontWeight: 'bold' }}>Status</TableCell>
                  <TableCell sx={{ fontWeight: 'bold' }}>Card Number</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {filteredTransactions.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={6} sx={{ textAlign: 'center', py: 4 }}>
                      <Typography color="text.secondary">
                        No transactions found
                      </Typography>
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredTransactions.map((transaction) => (
                    <TableRow key={transaction._id} hover>
                      <TableCell>
                        {formatDate(transaction.transactionDate)}
                      </TableCell>
                      <TableCell>{transaction.merchantName}</TableCell>
                      <TableCell>${transaction.amount}</TableCell>
                      <TableCell>
                        <Chip
                          label={transaction.riskLevel}
                          color={getRiskColor(transaction.riskLevel)}
                          size="small"
                        />
                      </TableCell>
                      <TableCell>
                        <Chip
                          label={transaction.isFraudulent ? "Fraudulent" : "Safe"}
                          color={transaction.isFraudulent ? "error" : "success"}
                          size="small"
                        />
                      </TableCell>
                      <TableCell>
                        **** **** **** {transaction.cardNumber.slice(-4)}
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>

        {/* Summary */}
        <Box sx={{ mt: 3, p: 2, bgcolor: 'action.hover', borderRadius: 2 }}>
          <Typography variant="body2" color="text.secondary">
            <strong>Total Transactions:</strong> {filteredTransactions.length} |
            <strong> Safe:</strong> {filteredTransactions.filter(t => !t.isFraudulent).length} |
            <strong> Fraudulent:</strong> {filteredTransactions.filter(t => t.isFraudulent).length}
          </Typography>
        </Box>
      </Container>
    </Box>
  );
};

export default TransactionHistory;
