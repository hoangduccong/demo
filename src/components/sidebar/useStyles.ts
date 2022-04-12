import { makeStyles } from '@material-ui/core';

export const useStyles = makeStyles(() => ({
  navbar: {
    display: 'contents',
    justifyContent: 'start'
  },
  menuBars: {
    marginLeft: '2rem'
  },
  navMenu: {
    backgroundColor: '#0c9cd4',
    width: '250px',
    height: '100vh',
    display: 'flex',
    justifyContent: 'center',
    position: 'fixed',
    top: 0,
    left: '-100%',
    transition: ' 850ms',
  },
  navMenuActive: {
    backgroundColor: '#0c9cd4',
    width: '250px',
    height: '100vh',
    display: 'flex',
    justifyContent: 'center',
    position: 'fixed',
    top: 0,
    left: 0,
    transition: '350ms',
  },
  navText: {
    display: 'flex',
    justifyContent: 'start',
    alignItems: 'center',
    padding: '8px 0 8px 16px',
    listStyle: 'none',
    height: 60,
  },
  navTextA: {
    textDecoration: 'none',
    color: '#f5f5f5',
    fontSize: '18px',
    width: '95%',
    height: '100%',
    display: 'flex',
    alignItems: 'center',
    padding: '0 16px',
    borderRadius: '4px',
  },
  navMenuItems: {
    width: '100%',
    padding: 0,
  },
  navToggle: {
    backgroundColor: '#0c9cd4',
    width: '100%',
    height: '80px',
    display: 'flex',
    justifyContent: 'start',
    alignTtems: 'center',
  }
}));