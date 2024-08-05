import React from 'react';

const HeavyComponent = () => {
  return (
    <div>
      <h2>Heavy Component Loaded</h2>
      <p>This component was loaded lazily using React Suspense.</p>
    </div>
  );
};

export default HeavyComponent;