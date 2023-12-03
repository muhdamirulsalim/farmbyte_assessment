import axios from "axios";
import { useState, useEffect } from "react";
import { getPosts } from "../resources";
import { Box, Pagination, Typography } from '@mui/material';
import Image1 from '../assets/img/image2.jpg';
import Image2 from '../assets/img/image3.jpg';
import Image3 from '../assets/img/image4.jpg';
import Image4 from '../assets/img/image1.jpg';
import Blog from "./blog";
import BlogViewer from "./blogViewer";


export default function Blogs() {
  const [allPosts, setAllPosts] = useState([]);
  const [posts, setPosts] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPage, setTotalPage] = useState(1);
  const [blogTop, setBlogTop] = useState(null);
  const [blogFeatures, setBlogFeatures] = useState([]);
  const [openBlog, setOpenBlog] = useState(false);
  const [openBlogContent, setOpenBlogContent] = useState({
    title: null,
    body: null,
    image: null
  })
  const pageSize = 6;

  const handlePageChange = (event, value) => {
    console.log(value);
    console.log(allPosts);
    setPage(value);
    getItemToShow(value);
  };

  const handleOpenBlog = (title, body, image) => {
    setOpenBlogContent({
      title,
      body,
      image
    })
    setOpenBlog(true);
  };

  const handleBackButton = () => {
    setOpenBlogContent({
      title: null,
      body: null,
      image: null
    })
    setOpenBlog(false);
  }

  useEffect(() => {
    if (!posts.length) {
      const fetchPosts = async () => {
        const postsData = await getPosts();

        if (postsData?.length) {
          // Calculate the starting index based on the page number and items per page
          const startIndex = (page - 1) * pageSize + 3;

          // Get the items to display on the current page
          const itemsToShow = postsData.slice(startIndex, startIndex + pageSize);

          setAllPosts(postsData);
          setBlogTop(postsData[0]);
          setBlogFeatures([
            postsData[1],
            postsData[2],
          ])
          setTotalPage(Math.ceil((postsData.length - 3) / pageSize));
          setPosts(itemsToShow);
        }
      };
      fetchPosts();
    }
  }, [])

  const getItemToShow = (value) => {
    if (allPosts?.length) {
      console.log('test')
      // Calculate the starting index based on the page number and items per page
      const startIndex = (value - 1) * pageSize + 3;

      // Get the items to display on the current page
      const itemsToShow = allPosts.slice(startIndex, startIndex + pageSize);

      setTotalPage(Math.ceil((allPosts.length - 3) / pageSize));
      setPosts(itemsToShow);
    }
  }

  return (
    <Box className='blogs-wrapper'>
      <Box sx={{ m: '25px auto 50px', p: '0 0 30px', backgroundColor: '#fff' }}>
        {!openBlog ? (
          <>
            {allPosts?.length > 2 && (
              <Box className='blogs-features'>
                {blogTop ? (
                  <Box className='blog-top' sx={{ backgroundImage: `url(${Image1})` }} onClick={() => handleOpenBlog(blogTop.title, blogTop.body, Image1)}>
                    <Box className='blog-label'>
                      Top Read
                    </Box>
                    <Box className='blog-details'>
                      <Box className='blog-title'>
                        {blogTop.title}
                      </Box>
                      <Box className='blog-body'>
                        {blogTop.body}
                      </Box>
                      <Box className='blog-readmore'>
                        Read More
                      </Box>
                    </Box>
                  </Box>
                ) : null}

                {blogFeatures ? (
                  blogFeatures.map((post, index) => {
                    const data = {
                      label: 'featured',
                      key: index,
                      id: post.id,
                      title: post.title,
                      body: post.body,
                      image: index === 0 ? Image2 : Image3,
                      handleOpenBlog: handleOpenBlog
                    }
                    return (
                      <Blog data={data} />
                    )
                  })
                ) : null}
              </Box>
            )}
            <Box className='blogs-container'>
              {posts ? (
                posts.map((post, index) => {
                  const data = {
                    key: index,
                    id: post.id,
                    title: post.title,
                    body: post.body,
                    image: Image4,
                    handleOpenBlog: handleOpenBlog
                  }

                  return (
                    <Blog data={data} />
                  )
                })
              ) : null}
            </Box>
            <Box sx={{ display: 'flex', justifyContent: 'center' }}>
              <Pagination count={totalPage} page={page} onChange={handlePageChange} />
            </Box>
          </>
        ) : (
          <>
            <BlogViewer openBlogContent={openBlogContent} handleBackButton={handleBackButton} />
          </>
        )}
      </Box>
    </Box>
  )
}