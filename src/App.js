import logo from './logo.svg';
import './App.css';
import Blogs from './pages/blogs';
import { Box, Typography } from '@mui/material';

function App() {
  return (
    <div className="App">
      <Box className='header'>
        <Typography sx={{ fontSize: '20px', fontWeight: '600', lineHeight: '1em' }}>THE BLOGS</Typography>
      </Box>
      <Blogs />
    </div>
  );
}

export default App;
