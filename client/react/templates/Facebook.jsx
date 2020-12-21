import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Facebook = ({
  // eslint-disable-next-line react/prop-types
  queryRunning, searchValue, setSearchValue, setData, isQueryRunning, data,
}) => {
  const handleFacebookSend = async () => {
    const handleFacebookSendReq = async () => {
      try {
        const result = await axios.post('/ai/completions', {
          engine: 'davinci',
          prompt: searchValue,
          max_tokens: 150,
          temperature: 0.0,
          top_p: 1,
          presence_penalty: 0,
          frequency_penalty: 0,
          best_of: 1,
          stop: ['###'],
        });

        return result;
      } catch (err) {
        return err;
      }
    };
    isQueryRunning(true);
    const response = await handleFacebookSendReq();
    console.log('response', response.data.data);
    setData(response.data.data ? response.data.data.choices[0].text : 'No response');
    isQueryRunning(false);
  };

  return (
    <div className="facebookWrapper">
      <textarea
        className="queryInput"
        disabled={queryRunning}
        placeholder="Enter text"
        type="text"
        value={searchValue}
        id="searchInput"
        onChange={(e) => (setSearchValue(e.target.value))}
        rows={10}
        cols={50}
      />
      <div className="queryButtons">
        <button
          type="button"
          onClick={handleFacebookSend}
        >
          {!queryRunning ? 'Send Completions Request' : 'Loading...'}
        </button>

        {!queryRunning && data
        && (
          <button
            type="button"
            onClick={() => { setSearchValue(`${searchValue}${data}`); setData(null); console.log(searchValue); }}
          >
            Append To Promt
          </button>
        )}
      </div>
    </div>
  );
};

export default Facebook;
