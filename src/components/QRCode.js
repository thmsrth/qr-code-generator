import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/styles';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Box from '@material-ui/core/Box';

import { generateQRCodeInCanvas } from '../utils/QrCodeHelpers';

import { updateQueryParams, getParamFromQueryString } from '../utils/URLHelpers';

const useStyles = makeStyles(theme => ({
  wrapper: {
    marginTop: theme.spacing(4),
  },
  qrCodeWrapper: {
    margin: theme.spacing(2),
  },
  inputWrapper: {
    margin: theme.spacing(2),
  },
  textField: {
    marginTop: theme.spacing(2),
  },
}));

const QRCode = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [title, setTitle] = useState(getParamFromQueryString('title') || 'Thomas Roth');
  const [path, setPath] = useState(getParamFromQueryString('path'));
  const classes = useStyles();

  useEffect(() => {
    if (path.length !== 0) {
      const generateQRCode = () => {
        generateQRCodeInCanvas(path, 'qrcanvas')
          .then((code) => {
            setError(null);
          })
          .catch((e) => {
            console.error(e);
            setError(e);
          })
          .then(() => {
            setLoading(false);
          });
      };
      generateQRCode();
    } else {
      setError('Bitte geben Sie einen Pfad ein, um einen QR Code zu generieren.');
      setLoading(false);
    }
    updateQueryParams({ path });
  }, [path]);

  useEffect(() => {
    updateQueryParams({ title });
  }, [title]);

  return (
    <div className={classes.wrapper}>
      {title && (<h1>{title}</h1>)}
      {loading && (<div>Loading QR Code</div>)}
      {error && (<p>{error}</p>)}
      {path && (
      <div className={classes.qrCodeWrapper}>
        <canvas id="qrcanvas" />
      </div>
      )}
      <Box display="block" displayPrint="none">
        {path && (
          <Button variant="contained" onClick={() => window.print()}>QR Code drucken</Button>
        )}
        <div className="inputWrapper">
          <TextField
            className={classes.textField}
            id="title"
            label="Titel"
            value={title}
            onChange={e => setTitle(e.target.value)}
            fullWidth
          />
          <TextField
            className={classes.textField}
            id="path"
            label="Pfad / URL"
            value={path}
            onChange={e => setPath(e.target.value)}
            multiline
            fullWidth
          />
        </div>
      </Box>
    </div>
  );
};

export default QRCode;
