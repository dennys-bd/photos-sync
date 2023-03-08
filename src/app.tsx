import { Box, CssBaseline } from '@mui/material';
import { createRoot } from 'react-dom/client';
import ApplicationController from './controllers/ApplicationController';

const container = document.getElementById('root');
// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
const root = createRoot(container!);
root.render(
<>
  <CssBaseline />
  <Box width="100%" height="100%">
    <ApplicationController />
  </Box>
</>
);
