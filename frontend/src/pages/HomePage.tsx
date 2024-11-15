import React, { useState, useEffect } from "react";
import apiProtected from "../api/axiosConfig";
import { Container, Row, Col } from "react-bootstrap";
import { useSelector } from "react-redux";
import TweetInput from "../components/TweetInput";
import axios from "axios";
import { toast } from "react-toastify";
// import TweetList from "./components/TweetList";

interface Tweet {
  id: number;
  content: string;
  tags: string[];
}

interface RootState {
  auth: {
    userInfo: { id: string; name: string; email: string; token: string } | null;
  };
}

const HomePage: React.FC = () => {
  const { userInfo } = useSelector((state: RootState) => state.auth);

  const [tweets, setTweets] = useState<Tweet[]>([]);
  const [page, setPage] = useState(1);

  useEffect(() => {
    fetchTweets(page);
  }, [page]);

  const fetchTweets = async (page: number) => {
    try {
      const response = await apiProtected.get(`/api/tweets?page=${page}`);
      setTweets((prevTweets) => [...prevTweets, ...response.data]);
    } catch (error) {
      console.error("Error fetching tweets:", error);
    }
  };

  const postTweet = async (content: string, tags: string[]) => {
    try {
      const response = await apiProtected.post("/v1/tweets/create", {
        userID: userInfo?.id,
        content,
        tags,
      });
      // console.log(response);
      setTweets([response.data, ...tweets]);
      toast.success("Tweet successful");
    } catch (error: any) {
      console.error("Error posting tweet:", error);
      toast.error(error?.data?.message || error.error);
    }
  };

  const deleteTweet = async (tweetId: number) => {
    try {
      await apiProtected.delete(`/api/tweets/${tweetId}`);
      setTweets(tweets.filter((tweet) => tweet.id !== tweetId));
    } catch (error) {
      console.error("Error deleting tweet:", error);
    }
  };

  const shareTweet = async (tweetId: number, tags: string[]) => {
    try {
      await apiProtected.post(`/api/tweets/${tweetId}/share`, { tags });
      alert("Tweet shared successfully!");
    } catch (error) {
      console.error("Error sharing tweet:", error);
    }
  };

  return (
    <Container className="mt-4">
      <p className="text-center"> Hi {userInfo?.name} ! </p>
      <Row>
        <Col md={{ span: 6, offset: 3 }}>
          <TweetInput postTweet={postTweet} />
          {/* <TweetList
            tweets={tweets}
            fetchMoreTweets={() => setPage(page + 1)}
            deleteTweet={deleteTweet}
            shareTweet={shareTweet}
          /> */}
        </Col>
      </Row>
    </Container>
  );
};

export default HomePage;
