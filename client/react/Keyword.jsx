import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Keyword = () => {
  const [data, setData] = useState(null);
  const [searchValue, setSearchValue] = useState('');
  const [queryRunning, isQueryRunning] = useState(false);

  const handleSearchReq = async () => {
    try {
      const result = await axios.post('/ai/search', {
        engine: 'davinci',
        documents: [
          'White House',
          'hospital',
          'school',
        ],
        query: 'teacher',
      });

      return result;
    } catch (err) {
      return err;
    }
  };

  const handleSearch = async () => {
    isQueryRunning(true);
    const response = await handleSearchReq();
    console.log('response', response.data.data);
    setData(response.data.data ? response.data.data.choices[0].text : 'No Response');
    isQueryRunning(false);
  };

  const handleCompletionsReq = async () => {
    try {
      const result = await axios.post('/ai/completions', {
        engine: 'davinci',
        prompt: searchValue,
        max_tokens: 12,
        temperature: 0.0,
        top_p: 1,
        presence_penalty: 0,
        frequency_penalty: 0,
        best_of: 1,
        stop: ['.'],
      });

      return result;
    } catch (err) {
      return err;
    }
  };

  const handleCompletions = async () => {
    isQueryRunning(true);
    const response = await handleCompletionsReq();

    console.log('response', response.data.data);
    setData(response.data.data ? response.data.data.choices[0].text : 'No response');
    isQueryRunning(false);
  };

  const handleGenerateReq = async () => {
    try {
      const result = await axios.post('/ai/generate', {
        engine: 'davinci',
        context: searchValue,
        stream: false,
        stop: '\n',
        length: 100,
        temperature: 0.3,
        top_p: 1,
        best_of: 1,
      });

      return result;
    } catch (err) {
      return err;
    }
  };

  const handleGenerate = async () => {
    isQueryRunning(true);
    const response = await handleGenerateReq();
    console.log('response', response.data.data.data[0].text.join(''));
    setData(response.data.data.data[0].text.join(''));
    isQueryRunning(false);
  };

  useEffect(() => {
    console.log('App rendered');
  }, []);

  return (
    <div className="app">
      <div className="app-header">
        <img className="logo" src="assets/openai-logo.png" alt="openai-logo" />
        <h1>OpenAI React App with Node.js server</h1>
      </div>
      <div className="app-cta">
        {/* <button */}
        {/*  type="button" */}
        {/*  onClick={handleSearch} */}
        {/* > */}
        {/*  Send Search Request */}
        {/* </button> */}
        <div className="queryInput">
          <textarea disabled={queryRunning} placeholder="Enter text" type="text" value={searchValue} id="searchInput" onChange={(e) => (setSearchValue(e.target.value))} rows={10} cols={50}/>
        </div>
        <div className="queryButtons">
          <button
            type="button"
            onClick={handleCompletions}
          >
            { !queryRunning ? 'Send Completions Request' : 'Loading...' }
          </button>
          <button type="button" onClick={handleGenerate} >
            { !queryRunning ? 'Send Generate Request' : 'Loading...' }
          </button>
        </div>
      </div>
      {
        !queryRunning && data && (
          <div className="app-result">
            <pre>
              {data}
            </pre>
          </div>
        )
      }
    </div>
  );
};

export default Keyword;
