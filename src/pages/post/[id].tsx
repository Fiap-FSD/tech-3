/* eslint-disable @typescript-eslint/no-unused-vars */
import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import styled from 'styled-components';
import { extractYouTubeId } from '@/pages/utils/extractYouTubeId';
import GlobalStyle from "@/app/componentStyles/globalStyles";

const HeaderHeight = "120px"; 

const Container = styled.div`
  background-color: black;
  padding: 20px;
  max-width: 800px;
  margin: calc(${HeaderHeight} + 20px) auto 100px;
  background-color: #333;
  color: white;
  border-radius: 5px;
`;

const Title = styled.h1`
  font-size: 24px;
  margin-bottom: 10px;
`;

const Author = styled.p`
  font-size: 16px;
  color: #aaa;
  margin-bottom: 20px;
`;

const MediaContainer = styled.div`
  margin-top: 20px;
`;

const Image = styled.img`
  width: 100%;
  height: auto;
  border-radius: 5px;
  margin-bottom: 20px;
`;

const Content = styled.div`
  font-size: 16px;
  line-height: 1.5;
`;

const StyledVideoContainer = styled.div`
  position: relative;
  width: 100%;
  padding-top: 56.25%;

  iframe {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    border-radius: 5px;
  }
`;

const YoutubeVideo = ({ videoId }: { videoId: string }) => {
  return (
    <StyledVideoContainer>
      <iframe
        className="w-full h-full"
        src={`https://www.youtube.com/embed/${videoId}`}
        title="YouTube video player"
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      />
    </StyledVideoContainer>
  );
};

interface Post {
  id: string;
  title: string;
  author: string;
  content: string;
  imageUrl?: string;  
  videoUrl?: string;
}

const PostDetails = () => {
  const params = useParams();
  const id = params?.id as string;
  const [post, setPost] = useState<Post | null>(null);
  const [videoDetails, setVideoDetails] = useState<{ thumbnail: string; description: string } | null>(null);

  useEffect(() => {
    if (!id) return;

    const fetchPost = async () => {
      try {
        const response = await fetch(`https://blog-posts-hori.onrender.com/post/${id}`);
        const data = await response.json();
        setPost(data);
      } catch (error) {
        console.error('Erro ao buscar os detalhes do post:', error);
      }
    };

    fetchPost();
  }, [id]);

  useEffect(() => {
    if (post?.videoUrl) {
      const videoId = extractYouTubeId(post.videoUrl);

      if (videoId) {
        const fetchVideoDetails = async () => {
          try {
            const response = await fetch(
              `https://www.googleapis.com/youtube/v3/videos?id=${videoId}&key=YOUR_YOUTUBE_API_KEY&part=snippet`
            );
            const data = await response.json();
            const snippet = data.items[0]?.snippet;

            if (snippet) {
              setVideoDetails({
                thumbnail: snippet.thumbnails.high.url,
                description: snippet.description,
              });
            }
          } catch (error) {
            console.error('Erro ao buscar detalhes do vídeo:', error);
          }
        };

        fetchVideoDetails();
      }
    }
  }, [post]);

  if (!post) {
    return <Container>Carregando...</Container>;
  }
  return (
    <>
      <GlobalStyle />
      <Container>
        <Title>{post.title}</Title>
        <Author>Autor: {post.author}</Author>
        <Content>{post.content}</Content>

        {post.imageUrl && (
          <MediaContainer>
            <Image src={post.imageUrl} alt="Imagem do post" />
          </MediaContainer>
        )}

        {post.videoUrl && (
          <MediaContainer>
            {<YoutubeVideo videoId={post.videoUrl}/>}
          </MediaContainer>
        )}
      </Container>
    </>
  );
};

export default PostDetails;
