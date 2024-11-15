import React, { useState, useEffect } from "react";
import apiProtected from "../api/axiosConfig";
import { Container, Row, Col } from "react-bootstrap";
import { useSelector } from "react-redux";
import TweetInput from "../components/TweetInput";
import { Tweet } from "../types/Tweet";
import TweetComponent from "../components/Tweet";
import { toast } from "react-toastify";
// import TweetList from "./components/TweetList";

interface RootState {
  auth: {
    userInfo: { id: string; name: string; email: string; token: string } | null;
  };
}

const DashboardPage: React.FC = () => {
  const { userInfo } = useSelector((state: RootState) => state.auth);

  const [tweets, setTweets] = useState<Tweet[]>([]);
  // const [page, setPage] = useState(1);

  useEffect(() => {
    fetchTweets(1);
  }, []);

  const fetchTweets = async (page: number) => {
    console.log("fetching tweets");
    try {
      const response = await apiProtected.get(`/v1/tweets?page=${page}`);
      console.log(response);
      setTweets((prevTweets) => [...prevTweets, ...response.data.tweets]);
    } catch (error) {
      console.error("Error fetching tweets:", error);
    }
  };

  const postTweet = async (content: string, tags: any) => {
    try {
      const response = await apiProtected.post("/v1/tweets/create", {
        userID: userInfo?.id,
        content,
        tags,
      });
      // console.log(response);
      setTweets([response.data, ...tweets]);
      toast.success("Tweet successful");
      fetchTweets(1);
    } catch (error: any) {
      console.error("Error posting tweet:", error);
      toast.error(error?.data?.message || error.error);
    }
  };

  return (
    <Container className="mt-4">
      <p className="text-center"> Hi {userInfo?.name} ! </p>
      <Row>
        <Col md={{ span: 6, offset: 3 }}>
          <TweetInput postTweet={postTweet} />
          {/* <button onClick={() => fetchTweets(page)}>Reload</button> */}
          <Container>
            <Row>
              <Col>
                <h1 className="mt-5">Tweet Feed</h1>
                {tweets.map((tweet) => (
                  <TweetComponent key={tweet.id} tweet={tweet} />
                ))}
              </Col>
            </Row>
          </Container>
        </Col>
      </Row>
    </Container>
  );
};

export default DashboardPage;
