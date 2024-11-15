import React from "react";
import { Container, Card, Button } from "react-bootstrap";
import twitter from "../assets/twitter-icon.png";

const Hero: React.FC = () => {
  return (
    <div className="py-5">
      <Container className="d-flex justify-content-center">
        <Card className="p-5 d-flex flex-column align-items-center hero-card bg-light w-100">
          <img style={{ height: "50px" }} src={twitter} alt="twitter" />

          <h1 className="text-center mt-3">Tweetly App</h1>
          <h5 className="text-center mb-4">
            A Twitter Clone Project by Nafiu Yakubu
          </h5>
          <p className="text-center mb-4">
            Tweetly is a full-stack web application built to replicate some core
            functionalities of Twitter. The app is built with React on the
            frontend and leverages Redux Toolkit for state management, React
            Bootstrap for styling, NodeJS (Express) for Backend API and
            Sequelize ORM with MySQL for database operations.
          </p>
          <div className="d-flex">
            <Button variant="primary" href="/login" className="me-3">
              Sign In
            </Button>
            <Button variant="secondary" href="/register">
              Register
            </Button>
          </div>
        </Card>
      </Container>
    </div>
  );
};

export default Hero;
