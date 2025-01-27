import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';

// Material-UI
import { useTheme } from '@mui/material/styles';
import {
  Avatar,
  Box,
  Chip,
  ClickAwayListener,
  Divider,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Paper,
  Popper,
  Stack,
  Switch,
  Typography
} from '@mui/material';

// Project imports
import MainCard from 'ui-component/cards/MainCard';
import Transitions from 'ui-component/extended/Transitions';
import UpgradePlanCard from './UpgradePlanCard';
// import User1 from 'assets/images/logo.png';
// Assets
import { IconLogout, IconSettings } from '@tabler/icons-react';

// ==============================|| PROFILE MENU ||============================== //

const ProfileSection = () => {
  const { t, i18n } = useTranslation();
  const theme = useTheme();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('user-info') || '{}');

  const [open, setOpen] = useState(false);
  const [isArabic, setIsArabic] = useState(i18n.language === 'ar');
  const anchorRef = useRef(null);

  const handleLogout = async () => {
    localStorage.removeItem('infinity_identity');
    navigate('/login');
  };

  const handleThemeChange = (themeType) => {
    dispatch({ type: 'SET_THEME', theme: themeType });
  };

  const handleLanguageChange = () => {
    const newLanguage = isArabic ? 'en' : 'ar';
    i18n.changeLanguage(newLanguage);
    setIsArabic(!isArabic);
    const newDirection = newLanguage === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.setAttribute('lang', newLanguage);
    document.documentElement.setAttribute('dir', newDirection);
  };

  const handleClose = (event) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }
    setOpen(false);
  };

  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const prevOpen = useRef(open);
  useEffect(() => {
    if (prevOpen.current === true && open === false) {
      anchorRef.current.focus();
    }
    prevOpen.current = open;
  }, [open]);

  return (
    <>
      <Chip
        sx={{
          height: '48px',
          alignItems: 'center',
          borderRadius: '27px',
          transition: 'all .2s ease-in-out',
          borderColor: theme.palette.primary.light,
          backgroundColor: theme.palette.primary.light,
          '&[aria-controls="menu-list-grow"], &:hover': {
            borderColor: theme.palette.primary.main,
            background: `${theme.palette.primary.main}!important`,
            color: theme.palette.primary.light,
            '& svg': {
              stroke: theme.palette.primary.light
            }
          },
          '& .MuiChip-label': {
            lineHeight: 0
          }
        }}
        icon={
          <Avatar
            sx={{
              ...theme.typography.mediumAvatar,
              margin: '8px 0 8px 8px !important',
              cursor: 'pointer'
            }}
            ref={anchorRef}
            aria-controls={open ? 'menu-list-grow' : undefined}
            aria-haspopup="true"
            color="inherit"
          />
        }
        label={<IconSettings stroke={1.5} size="1.5rem" color={theme.palette.primary.main} />}
        variant="outlined"
        ref={anchorRef}
        aria-controls={open ? 'menu-list-grow' : undefined}
        aria-haspopup="true"
        onClick={handleToggle}
        color="primary"
      />
      <Popper
        placement="bottom-end"
        open={open}
        anchorEl={anchorRef.current}
        role={undefined}
        transition
        disablePortal
        popperOptions={{
          modifiers: [
            {
              name: 'offset',
              options: {
                offset: [0, 14]
              }
            }
          ]
        }}
      >
        {({ TransitionProps }) => (
          <Transitions in={open} {...TransitionProps}>
            <Paper>
              <ClickAwayListener onClickAway={handleClose}>
                <MainCard border={false} elevation={16} content={false} boxShadow shadow={theme.shadows[16]}>
                  <Box sx={{ p: 2 }}>
                    <Stack>
                      <Stack direction="row" spacing={0.5} alignItems="center">
                        <Typography variant="h4">{t('goodMorning')},</Typography>
                        <Typography component="span" variant="h4" sx={{ fontWeight: 400 }}>
                          {user.name}
                        </Typography>
                      </Stack>
                      <Typography variant="subtitle2">{t('role')}</Typography>
                    </Stack>
                  </Box>
                  <Box sx={{ p: 2 }}>
                    <UpgradePlanCard />
                    <Divider />

                    <List
                      component="nav"
                      sx={{
                        width: '100%',
                        maxWidth: 350,
                        minWidth: 300,
                        backgroundColor: theme.palette.background.paper,
                        borderRadius: '10px',
                        [theme.breakpoints.down('md')]: {
                          minWidth: '100%'
                        },
                        '& .MuiListItemButton-root': {
                          mt: 0.5
                        }
                      }}
                    >
                      <ListItemButton onClick={handleThemeChange('light')}>
                        <ListItemText primary={<Typography variant="body2">Light Theme</Typography>} />
                      </ListItemButton>
                      <ListItemButton onClick={handleThemeChange('dark')}>
                        <ListItemText primary={<Typography variant="body2">Dark Theme</Typography>} />
                      </ListItemButton>
                      <ListItemButton>
                        <ListItemIcon>
                          <Switch checked={isArabic} onChange={handleLanguageChange} />
                        </ListItemIcon>
                        <ListItemText primary={<Typography variant="body2">{isArabic ? 'العربية' : 'English'}</Typography>} />
                      </ListItemButton>
                      <ListItemButton onClick={handleLogout}>
                        <ListItemIcon>
                          <IconLogout stroke={1.5} size="1.3rem" />
                        </ListItemIcon>
                        <ListItemText primary={<Typography variant="body2">{t('logout')}</Typography>} />
                      </ListItemButton>
                    </List>
                  </Box>
                </MainCard>
              </ClickAwayListener>
            </Paper>
          </Transitions>
        )}
      </Popper>
    </>
  );
};

export default ProfileSection;
