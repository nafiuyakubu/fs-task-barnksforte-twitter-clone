import React, { useState } from "react";
import { Form, Button, ListGroup, Spinner } from "react-bootstrap";
import Badge from "react-bootstrap/Badge";
import apiProtected from "../api/axiosConfig";

interface TweetInputProps {
  postTweet: (
    content: string,
    tags: { id: number; username: string }[]
  ) => void;
}

const TweetInput: React.FC<TweetInputProps> = ({ postTweet }) => {
  const [content, setContent] = useState("");
  const [tags, setTags] = useState<{ id: number; username: string }[]>([]);
  const [tagInput, setTagInput] = useState("");
  const [filteredSuggestions, setFilteredSuggestions] = useState<
    { id: number; username: string }[]
  >([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [loading, setLoading] = useState(false);

  const handlePostTweet = () => {
    if (content.trim()) {
      postTweet(content, tags);
      setContent("");
      setTags([]);
      setTagInput("");
    }
  };

  const handleTagInputChange = async (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const input = e.target.value;
    setTagInput(input);
    if (input) {
      setLoading(true);
      try {
        // My Username Suggestion API endpoint
        const response = await apiProtected.get(`/v1/users/suggestions`, {
          params: { query: input },
        });
        setFilteredSuggestions(response.data); // API returns an array of { id, username }
        setShowSuggestions(true);
      } catch (error) {
        console.error("Error fetching user suggestions:", error);
        setFilteredSuggestions([]);
      } finally {
        setLoading(false);
      }
    } else {
      setShowSuggestions(false);
    }
  };

  const handleSelectSuggestion = (
    e: React.MouseEvent,
    suggestion: {
      id: number;
      username: string;
    }
  ) => {
    e.preventDefault();
    // alert(JSON.stringify(suggestion));
    // Avoid duplicate tags based on user id
    if (!tags.some((tag) => tag.id === suggestion.id)) {
      setTags([...tags, suggestion]);
    }
    setTagInput("");
    setFilteredSuggestions([]);
    setShowSuggestions(true);
  };

  return (
    <Form method="get" className="mb-4">
      {/* {JSON.stringify(tags)} */}
      <Form.Group>
        <Form.Control
          as="textarea"
          rows={3}
          name="tweet"
          placeholder="What's happening?"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
      </Form.Group>
      <Form.Group className="position-relative">
        <Form.Control
          type="text"
          name="tag"
          placeholder="Type here Tag users by username and click to share"
          value={tagInput}
          onChange={handleTagInputChange}
        />
        {loading && <Spinner animation="border" size="sm" className="ml-2" />}
        {showSuggestions && (
          <ListGroup className="position-absolute w-100">
            {filteredSuggestions.map((suggestion) => (
              <ListGroup.Item
                key={suggestion.id}
                action
                onClick={(e) => handleSelectSuggestion(e, suggestion)}
              >
                {suggestion.username}
              </ListGroup.Item>
            ))}
          </ListGroup>
        )}
      </Form.Group>
      <Form.Group>
        <div>
          <Form.Label>Share with: </Form.Label>
          {tags.map((tag) => (
            <Badge key={tag.id} bg="primary">
              {tag.username}
            </Badge>
          ))}
        </div>
      </Form.Group>
      <div className="text-center">
        <br />
        <Button type="button" variant="primary" onClick={handlePostTweet}>
          Tweet
        </Button>
      </div>
    </Form>
  );
};

export default TweetInput;
