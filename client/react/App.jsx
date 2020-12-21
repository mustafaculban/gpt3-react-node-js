import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
  FormControl, InputLabel, MenuItem, Select,
} from '@material-ui/core';

import { Face } from '@material-ui/icons';
import { default as FacebookContainer } from './templates/Facebook';

const App = () => {
  const [data, setData] = useState(null);
  const [searchValue, setSearchValue] = useState('');
  const [template, setTemplate] = useState('custom');
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
    const response = await handleSearchReq();
    console.log('response', response.data.data);
    setData(response.data.data ? response.data.data.choices[0].text : 'No Response');
  };

  const handleCompletionsReq = async () => {
    try {
      const result = await axios.post('/ai/completions', {
        engine: 'davinci',
        prompt: searchValue,
        max_tokens: 64,
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
    const response = await handleGenerateReq();
    console.log('response', response.data.data.data[0].text.join(''));
    setData(response.data.data.data[0].text.join(''));
  };

  useEffect(() => {
    console.log('App rendered');
  }, []);

  useEffect(() => {
    console.log(template);
  }, [template]);

  const templateContainers = {
    Facebook: <FacebookContainer
      searchValue={searchValue}
      setSearchValue={setSearchValue}
      setData={setData}
      isQueryRunning={isQueryRunning}
      queryRunning={queryRunning}
      data={data}
    />,
  };

  return (
    <div className="app">
      <div className="app-header">
        <img className="logo" src="assets/openai-logo.png" alt="openai-logo" />
        <h1>OpenAI React App with Node.js server</h1>
      </div>
      <div className="app-cta">
        <FormControl variant="filled" className="template-select">
          <InputLabel id="template-label">Ad Template</InputLabel>
          <Select
            labelId="template-label"
            value={template}
            onChange={(e) => { setTemplate(e.target.value); }}
            color="secondary"
          >
            <MenuItem value="-" disabled selected>Select Template</MenuItem>
            <MenuItem value="Adwords">Adwords</MenuItem>
            <MenuItem value="Facebook">Facebook</MenuItem>
            <MenuItem value="Reddit">Reddit</MenuItem>
          </Select>
        </FormControl>
        {
          templateContainers[template]
        }

        {/* <button */}
        {/*  type="button" */}
        {/*  onClick={handleSearch} */}
        {/* > */}
        {/*  Send Search Request */}
        {/* </button> */}
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

export default App;
