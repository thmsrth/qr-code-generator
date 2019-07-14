import React from 'react';
import Container from '@material-ui/core/Container';

import QRCode from '../components/QRCode';

const Main = props => (
  <Container maxWidth="sm">
    <QRCode {...props} />
  </Container>
);

export default Main;
