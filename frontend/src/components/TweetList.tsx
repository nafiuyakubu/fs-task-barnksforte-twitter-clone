// components/TweetList.tsx
import React, { useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { ListGroup, Badge } from "react-bootstrap";
import Loader from "../components/Loader";

interface Tweet {
  id: number;
  content: string;
  tags: string[];
}

interface TweetListProps {
  tweets: Tweet[];
  deleteTweet: (tweetId: number) => Promise<void>;
  shareTweet: (tweetId: number, tags: string[]) => Promise<void>;
  fetchMoreTweets: () => void;
}

const TweetList: React.FC<TweetListProps> = ({ tweets }) => {
  const [visibleTweets, setVisibleTweets] = useState(tweets.slice(0, 10));

  const fetchMoreTweets = () => {
    const newTweets = tweets.slice(
      visibleTweets.length,
      visibleTweets.length + 10
    );
    setVisibleTweets([...visibleTweets, ...newTweets]);
  };

  return (
    <InfiniteScroll
      dataLength={visibleTweets.length}
      next={fetchMoreTweets}
      hasMore={visibleTweets.length < tweets.length}
      loader={
        <span className="text-center">
          <Loader size={20} color="secondary" />
        </span>
      }
    >
      <ListGroup>
        {visibleTweets.map((tweet) => (
          <ListGroup.Item key={tweet.id}>
            <div>{tweet.content}</div>
            {/* {tweet.tags.map((tag) => (
              <Badge key={tag} className="mr-1">
                {tag}
              </Badge>
            ))} */}
            {/* <Badge key={tag} variant="secondary" className="mr-1"> */}@
          </ListGroup.Item>
        ))}
      </ListGroup>
    </InfiniteScroll>
  );
};

export default TweetList;
