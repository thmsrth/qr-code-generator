import React from 'react';
import { makeStyles } from '@material-ui/styles';

const useStyles = makeStyles(theme => ({
  header: {
    display: 'flex',
  },
}));

const Header = () => {
  const classes = useStyles();
  return (
    <header className={classes.header}>
    </header>
  );
};

export default Header;
