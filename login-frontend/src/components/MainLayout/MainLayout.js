import React, { useState } from 'react';
import {
  Button, 
  Box, 
  CssBaseline, 
  Drawer, 
  List, 
  ListItem, 
  ListItemIcon, 
  ListItemText, 
  Toolbar, 
  Typography,
  IconButton,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle
} from '@mui/material';
import { 
  Home as HomeIcon, 
  ListAlt as CatalogIcon, 
  Assignment as TaskIcon, 
  Timeline as WavesIcon, 
  Map as TransitionIcon,
  ChevronLeft as ChevronLeftIcon,
  ChevronRight as ChevronRightIcon,
  Logout as LogoutIcon
} from '@mui/icons-material';
import { useNavigate, useLocation } from 'react-router-dom';
import Logo from '../../assets/logo.png';

const MainLayout = ({ children }) => {
  const [open, setOpen] = useState(true);
  const [logoutDialogOpen, setLogoutDialogOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const steps = [
    { 
      name: 'Home', 
      icon: <HomeIcon />, 
      route: '/home',
      step: 1 
    },
    { 
      name: 'Service Catalog', 
      icon: <CatalogIcon />, 
      route: '/service',
      step: 2 
    },
    { 
      name: 'Task Generation', 
      icon: <TaskIcon />, 
      // route: '/service-task',
      route: '/task',

      step: 3 
    },
    { 
      name: 'Waves and Tracks', 
      icon: <WavesIcon />, 
      // route: '/waves-tracks',
      route: '/waves',
      step: 4 
    },
    { 
      name: 'Transition Plan', 
      icon: <TransitionIcon />, 
      // route: '/transition-plan',
      route: '/plan',
      step: 5 
    }
  ];

  const getCompletedSteps = (currentRoute) => {
    const currentStepIndex = steps.findIndex(step => step.route === currentRoute);
    return steps.map((step, index) => ({
      ...step,
      completed: index < currentStepIndex
    }));
  };

  const currentSteps = getCompletedSteps(location.pathname);

  const handleDrawerToggle = () => {
    setOpen(!open);
  };

  const handleLogoutConfirm = () => {
    localStorage.removeItem('user');
    navigate('/');
  };

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <Drawer
        sx={{
          width: open ? 240 : 73,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: open ? 240 : 73,
            boxSizing: 'border-box',
            backgroundColor: '#1e293b',
            color: '#ffffff',
            transition: 'width 0.3s, background-color 0.3s',
            overflowX: 'hidden',
            display: 'flex',
            flexDirection: 'column'
          },
        }}
        variant="permanent"
        anchor="left"
      >
        <Toolbar 
          sx={{ 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: open ? 'space-between' : 'center',
            px: 1 
          }}
        >
          {open && (
            <img 
              src={Logo}
              alt="Logo"
              style={{
                maxWidth: '60%', 
                maxHeight: '50px',
                objectFit: 'contain'
              }} 
            />
          )}
          <IconButton 
            onClick={handleDrawerToggle} 
            sx={{ 
              color: '#ffffff', 
              '&:hover': { 
                backgroundColor: 'rgba(255,255,255,0.1)' 
              } 
            }}
          >
            {open ? <ChevronLeftIcon /> : <ChevronRightIcon />}
          </IconButton>
        </Toolbar>
        
        {open && (
          <Typography 
            variant="h6" 
            noWrap 
            component="div" 
            sx={{ 
              fontWeight: 'bold', 
              color: '#64748b',
              textAlign: 'center',
              mb: 2,
              mt: 2
            }}
          >
            Transition Workflow
          </Typography>
        )}
        
        <List sx={{ flexGrow: 1 }}>
          {currentSteps.map((step) => (
            <ListItem 
              key={step.name}
              button
              onClick={() => navigate(step.route)}
              sx={{
                justifyContent: open ? 'initial' : 'center',
                px: open ? 2 : 0,
                backgroundColor: location.pathname === step.route 
                  ? 'rgba(59,130,246,0.2)' 
                  : step.completed 
                  ? 'rgba(74,222,128,0.1)' 
                  : 'transparent',
                margin: '8px',
                borderRadius: '8px',
                transition: 'all 0.3s ease',
                '&:hover': {
                  backgroundColor: 'rgba(255,255,255,0.1)',
                }
              }}
            >
              <ListItemIcon 
                sx={{ 
                  minWidth: open ? 44 : 'auto',
                  mr: open ? 0 : 0,
                  color: location.pathname === step.route 
                    ? '#3b82f6' 
                    : step.completed 
                    ? '#4ade80' 
                    : '#94a3b8' 
                }}
              >
                {step.icon}
              </ListItemIcon>
              {open && (
                <ListItemText 
                  primary={`Step ${step.step}: ${step.name}`}
                  primaryTypographyProps={{
                    color: location.pathname === step.route 
                      ? '#3b82f6' 
                      : step.completed 
                      ? '#4ade80' 
                      : '#e2e8f0',
                    variant: 'body2'
                  }}
                />
              )}
            </ListItem>
          ))}
        </List>

        <Button
          variant="contained"
          startIcon={<LogoutIcon />}
          onClick={() => setLogoutDialogOpen(true)}
          sx={{
            m: 2,
            backgroundColor: '#ef4444', // Red color for logout
            '&:hover': {
              backgroundColor: '#dc2626'
            },
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: open ? 'calc(100% - 32px)' : 'auto',
            minWidth: open ? 'auto' : '56px',
            px: open ? 2 : 1
          }}
        >
          {open ? 'Logout' : null}
        </Button>
      </Drawer>

      {/* Logout Confirmation Dialog */}
      <Dialog
        open={logoutDialogOpen}
        onClose={() => setLogoutDialogOpen(false)}
        aria-labelledby="logout-dialog-title"
        aria-describedby="logout-dialog-description"
      >
        <DialogTitle id="logout-dialog-title">
          Confirm Logout
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="logout-dialog-description">
            Are you sure you want to log out of the application?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setLogoutDialogOpen(false)} color="primary">
            Cancel
          </Button>
          <Button 
            onClick={handleLogoutConfirm} 
            color="error" 
            variant="contained"
            autoFocus
          >
            Logout
          </Button>
        </DialogActions>
      </Dialog>

      <Box
        component="main"
        sx={{
          flexGrow: 1,
          bgcolor: '#f8fafc',
          p: 3,
          minHeight: '100vh',
          transition: 'margin 0.3s ease, width 0.3s ease',
          width: `calc(100% - ${open ? 240 : 73}px)`
        }}
      >
        {children}
      </Box>
    </Box>
  );
};

export default MainLayout;