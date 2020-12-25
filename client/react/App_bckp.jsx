import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
  Button,
  FormControl, InputLabel, MenuItem, Select,
} from '@material-ui/core';

// eslint-disable-next-line import/no-named-default
import { default as FacebookContainer } from './templates/Facebook';
// eslint-disable-next-line import/no-named-default,import/named
import { default as AdwordsContainer } from './templates/Adwords';
import SelectedTexts from './components/SelectedTexts';

import Menu from './components/Menu';

const App = () => {
  const [data, setData] = useState({});
  const [searchValue, setSearchValue] = useState('');
  const [adTemplate, selectAdTemplate] = useState('-');
  const [queryRunning, isQueryRunning] = useState(false);
  const [adObject, updateAdObject] = useState({});
  const responseMap = {
    headline1: 'Headline 1:',
    headline2: 'Headline 2:',
    headline3: 'Headline 3:',
    description1: 'Description 1:',
    description2: 'Description 2:',
  };
  const addToAdList = () => {
    updateAdObject(data);
    console.log('addToAdList', data);
  };

  useEffect(() => {
    console.log('App rendered');
  }, []);

  useEffect(() => {

  }, [data]);

  const templateContainers = {
    Facebook: <FacebookContainer
      searchValue={searchValue}
      setSearchValue={setSearchValue}
      setData={setData}
      isQueryRunning={isQueryRunning}
      queryRunning={queryRunning}
      data={data}
    />,
    Adwords: <AdwordsContainer
      setData={setData}
      isQueryRunning={isQueryRunning}
      queryRunning={queryRunning}
    />,
  };

  return (
    <div className="app">
      <div className="app-header">
        <img className="logo" src="assets/openai-logo.png" alt="openai-logo"/>
        <h1>OpenAI React App with Node.js server</h1>
      </div>
      <div
        className="app__adObject"
        style={{
          display: 'flex',
          flex: 1,
          justifyContent: 'space-between',
          width: '1200px',
        }}
      >
        <div />
        <SelectedTexts
          adObject={adObject}
          updateAdObject={updateAdObject}
          responseMap={responseMap}
        />
      </div>
      <div className="app-cta">
        <FormControl
          variant="filled"
          className="template-select"
          style={{ width: '200px' }}
        >
          <InputLabel id="template-label">Ad Template</InputLabel>
          <Select
            labelId="template-label"
            value={adTemplate}
            onChange={(e) => {
              selectAdTemplate(e.target.value);
              setData({});
            }}
            color="secondary"
          >
            <MenuItem value="-" disabled selected>Select Template</MenuItem>
            <MenuItem value="adwords">Adwords</MenuItem>
            <MenuItem value="facebook">Facebook</MenuItem>
            <MenuItem value="reddit">Reddit</MenuItem>
          </Select>
        </FormControl>

        <AdwordsContainer
          setData={setData}
          isQueryRunning={isQueryRunning}
          queryRunning={queryRunning}
          adTemplate={adTemplate}
        />

      </div>
      {
        !queryRunning && Object.entries(data).length !== 0 && (
          <div className="app-result">
            <pre>
              {
                typeof data !== 'string'
                && (
                <Button variant="contained" color="primary" onClick={addToAdList}>
                  Add To Ad List
                </Button>
                )
              }
              {
                typeof data === 'string' ? data
                  : Object.entries(data)
                  // eslint-disable-next-line no-unused-vars
                    .map((item, index) => (
                      <div>
                        <p>
                          {responseMap[item[0]] + item[1]}
                        </p>
                      </div>
                    ))
              }
            </pre>
          </div>
        )
      }
      <Menu currentMenuValue={0}/>
    </div>
  );
};

export default App;
