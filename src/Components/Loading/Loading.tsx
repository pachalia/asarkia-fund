import { NextPage } from 'next';
import React from 'react';

const Loading: NextPage = () => {
  return (
    <>
      <div className="container">
        <div className="col 24 d-flex justify-content-center">
          <div
            className="spinner-border text-success"
            style={{ width: '4rem', height: '4rem' }}
          >
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      </div>
    </>
  );
};

export default Loading;
