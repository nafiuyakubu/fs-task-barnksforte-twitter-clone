import React from "react";
import { Card, ListGroup } from "react-bootstrap";
import { Tweet } from "../types/Tweet";

interface TweetProps {
  tweet: Tweet;
}

const TweetComponent: React.FC<TweetProps> = ({ tweet }) => {
  return (
    <Card className="mb-3">
      <Card.Body>
        <Card.Title>Tweet ID: {tweet.id}</Card.Title>
        <Card.Text>{tweet.content}</Card.Text>
        <Card.Subtitle className="mb-2 text-muted">
          {tweet.source === "own" ? "Owned Tweet" : "Shared Tweet"}
        </Card.Subtitle>
        <Card.Text>
          <small>
            Created At: {new Date(tweet.createdAt).toLocaleString()}
          </small>
        </Card.Text>
        {tweet.source === "shared" && tweet.sharedWith && (
          <Card.Footer>
            <strong>Shared With:</strong>
            <ListGroup>
              {tweet.sharedWith.map((user: any) => (
                <ListGroup.Item key={user.UserTweetShare.tweetId}>
                  {user.name} on{" "}
                  {new Date(user.UserTweetShare.createdAt).toLocaleString()}
                </ListGroup.Item>
              ))}
            </ListGroup>
          </Card.Footer>
        )}
      </Card.Body>
    </Card>
  );
};

export default TweetComponent;
