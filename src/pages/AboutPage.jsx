import React from 'react';
import Card from '../components/shared/Card';
import { Link } from 'react-router-dom';

function AboutPage() {
  return (
    <Card>
      <div className="about">
        <h1>About this project</h1>
        <p>This is an app to leave feedback for a product or service</p>
      </div>
      <p>Version 1.0</p>
      <p>
        <Link to="/">Back to Home</Link>
      </p>
    </Card>
  );
}

export default AboutPage;
