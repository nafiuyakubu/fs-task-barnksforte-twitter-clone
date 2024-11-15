// components/TweetInput.tsx
import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";

interface TweetInputProps {
  postTweet: (content: string, tags: string[]) => void;
}

const TweetInput: React.FC<TweetInputProps> = ({ postTweet }) => {
  const [content, setContent] = useState("");
  const [tags, setTags] = useState<string[]>([]);

  const handlePostTweet = () => {
    if (content.trim()) {
      postTweet(content, tags);
      setContent("");
      setTags([]);
    }
  };

  return (
    <Form className="mb-4">
      <Form.Group>
        <Form.Control
          as="textarea"
          rows={3}
          placeholder="What's happening?"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
      </Form.Group>
      <Form.Group>
        <Form.Control
          type="text"
          placeholder="Tag users by username to share (separate by commas eg: nafiu, kabir)"
          value={tags.join(", ")}
          onChange={(e) =>
            setTags(e.target.value.split(",").map((tag) => tag.trim()))
          }
        />
      </Form.Group>
      <div className="text-center">
        <br />
        <Button variant="primary" onClick={handlePostTweet}>
          Tweet
        </Button>
      </div>
    </Form>
  );
};

export default TweetInput;
