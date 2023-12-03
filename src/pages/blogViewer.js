import { Box, Typography } from '@mui/material';

export default function BlogViewer(props) {
  const { openBlogContent, handleBackButton } = props;
  const content = openBlogContent;

  return (
    <Box>
      <Box className='blog-viewer'>
        <Box sx={{ display: 'flex', justifyContent: 'flex-start' }}>
          <Box className='back-button' onClick={() => handleBackButton()}>{'< Back'}</Box>
        </Box>
        <Typography variant='h3'>{content.title}</Typography>
        <img src={content.image} alt="Image" width="100%" />
        <Box className='blog-content'>
          {content.body}
        </Box>
      </Box>
    </Box>
  )
}