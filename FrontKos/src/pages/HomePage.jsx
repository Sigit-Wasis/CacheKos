import React from 'react';

const Welcome = () => {
  return (
    <div style={styles.container}>
      <h1 style={styles.heading}>Welcome to Our Website!</h1>
      <p style={styles.paragraph}>This is a simple welcome page created with React.js.</p>
    </div>
  );
}

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
    backgroundColor: '#f0f8ff',
  },
  heading: {
    fontSize: '36px',
    color: '#333',
  },
  paragraph: {
    fontSize: '18px',
    color: '#666',
  }
};

export default Welcome;
