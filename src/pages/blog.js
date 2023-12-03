import { Box, Pagination, Typography } from '@mui/material';
import Image from '../assets/img/image1.jpg';
import Thumbnail from '../assets/img/thumbnail_image1.jpg';

export default function Blog(props) {
  const { data } = props;
  const { label, id, title, body, image, handleOpenBlog } = data;

  return (
    <Box key={id} className="blog-block" sx={{ backgroundImage: `url(${image ? image : Image})` }} onClick={() => handleOpenBlog(title, body, `${image ? image : Image}`)}>
      {label === 'featured' ? (
        <Box className='blog-label'>
          Featured
        </Box>
      ) : null}
      <Box className='blog-details'>
        <Box className='blog-title'>
          {title}
        </Box>
        {body ? (
          <Box className='blog-body'>
            {body}
          </Box>
        ) : null}
        <Box className='blog-readmore'>
          Read More
        </Box>
      </Box>
    </Box>
  )
}