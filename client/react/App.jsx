import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import TextField from '@material-ui/core/TextField';
import Switch from '@material-ui/core/Switch';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import ChipInput from 'material-ui-chip-input';
import Divider from '@material-ui/core/Divider';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import Button from '@material-ui/core/Button';
import LinearProgress from '@material-ui/core/LinearProgress';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import Checkbox from '@material-ui/core/Checkbox';
import axios from 'axios';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

function TabPanel(props) {
  const {
    children, value, index, ...other
  } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`wrapped-tabpanel-${index}`}
      aria-labelledby={`wrapped-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `wrapped-tab-${index}`,
    'aria-controls': `wrapped-tabpanel-${index}`,
  };
}

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.primary,
  },
  paper: {
    padding: theme.spacing(2),
    color: theme.palette.text.secondary,
  },
}));

export default function TabsWrappedLabel() {
  const classes = useStyles();
  const [currentTab, setCurrentTab] = useState('landingPage');
  const [focusWords, setFocusWords] = useState([]);
  const [pageURL, setPageURL] = useState('');
  const [audienceOrIndustry, setAudienceOrIndustry] = useState('');
  const [isQueryRunning, setIsQueryRunning] = useState(false);
  const [adResults, setAdResults] = useState([]);
  const [adPlatform, setAdPlatform] = useState('adwords');
  const [adTextSearchText, setAdTextSearchText] = useState('');
  const [usePageMetadata, isUsingPageMetadata] = useState(false);
  const[favouritedAds, setFavouritedAds] = useState([false, false, false]);
  const [isRefining, setIsRefining] = useState(false);

  const [sendToModalOpen, setSendToModalOpen] = useState(false);

  const [adCampaigns, setAdCampaigns] = useState([]);
  const [adGroups, setAdGroups] = useState([]);

  const handleTabChange = (event, newValue) => {
    setCurrentTab(newValue);
  };

  const sleep = (ms) => {
    const start = new Date().getTime();
    let end = start;
    while (end < start + ms) {
      end = new Date().getTime();
    }
  };
  const truncate = (source, size) => (source.length > size ? `${source.slice(0, size - 1)}…` : source);

  const getBackendResponse = async () => {
    let data = {
      adTemplate: adPlatform,
    };
    if (currentTab === 'landingPage') {
      data = {
        type: 'url',
        url: pageURL,
        focusWords,
        usePageMetadata,
        ...data,
      };
    } else if (currentTab === 'keyword') {
      data = {
        type: 'keywords',
        keywords: focusWords,
        audienceOrIndustry,
        ...data,
      };
    } else if (currentTab === 'adText') {
      data = {
        type: 'adText',
        promptText: adTextSearchText,
        ...data,
      };
    }
    try {
      return await axios.post('/api/getAdText', data);
    } catch (err) {
      return err;
    }
  };
  const makeBackendRequest = async () => {
    setAdResults([]);
    if (currentTab === '-') {
      alert('Ad template Should be selected');
    } else {
      setIsQueryRunning(true);
      const responseArr = [];
      const results = await Promise.all([getBackendResponse(),getBackendResponse(),getBackendResponse()]);

      results.map((result) => {
        if (adPlatform === 'adwords' && Object.keys(result.data.data).length === 5) {
          responseArr.push(result.data.data);
        } else if (adPlatform === 'reddit' && Object.keys(result.data.data).length === 1) {
          responseArr.push(result.data.data);
        }
        else if (adPlatform === 'facebook' && Object.keys(result.data.data).length === 1) {
          responseArr.push(result.data.data);
        }
      });


      while (responseArr.length < 3) {
        // eslint-disable-next-line no-await-in-loop
        const res = await getBackendResponse();
        console.log(responseArr);
        if (adPlatform === 'adwords' && Object.keys(res.data.data).length === 5) {
          responseArr.push(res.data.data);
        } else if (adPlatform === 'reddit' && Object.keys(res.data.data).length === 1) {
          responseArr.push(res.data.data);
        }
        else if (adPlatform === 'facebook' && Object.keys(res.data.data).length === 1) {
          responseArr.push(res.data.data);
        }
      }
      setIsQueryRunning(false);
      setAdResults(responseArr);
    }
  };

  const handleFavouritedAdsCheckbox = async (e) => {
    const checkboxId = e.target.id;
    const objectId = `add${checkboxId}`;
    const result = favouritedAds;
    result[checkboxId] = !result[checkboxId];
    console.log(favouritedAds.filter(el=> el !== false))
    setFavouritedAds(result);
  };
  const sendRefineRequest = async (e) => {
    setIsRefining(true);
    const responseArr = adResults;
    // eslint-disable-next-line no-restricted-syntax
    let i = 0;
    for (let el of favouritedAds) {
      if (el === false) {
        // eslint-disable-next-line no-await-in-loop
        const res = await getBackendResponse();
        responseArr[i] = res?.data?.data;
      }
      i++;
    }
    setIsRefining(false);
    console.log(responseArr);
    setAdResults(responseArr);

  };
  return (
    <div className={classes.root}>
      <img src="logo.png" style={{height:'70%', width:'14%', marginLeft:'5px'}}/>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={5}>
          <Paper
            className={classes.paper}
            style={{ overflow: 'scroll', height: '100%' }}
          >
            <AppBar
              position="static"
              style={{ color: 'black', backgroundColor: 'white' }}
            >
              <Tabs
                value={currentTab}
                onChange={handleTabChange}
                aria-label="wrapped label tabs example"
                indicatorColor="primary"
              >
                <Tab
                  value="landingPage"
                  label="Landing Page URL"
                  wrapped
                  {...a11yProps('one')}
                />
                <Tab value="keyword" label="Keyword" {...a11yProps('three')} />
                <Tab value="adText" label="Ad Text" {...a11yProps('two')} />
              </Tabs>
            </AppBar>
            <TabPanel
              value={currentTab}
              index="landingPage"
              style={{
                height: '200px',
                backgroundColor: '#f5f5f5',
                paddingBottom: '50px',
                marginTop: '10px',
              }}
            >
              <div className="leftPanel__inputs">
                <div style={{ width: '100%' }}>
                  <TextField
                    id="outlined-full-width"
                    label="URL"
                    placeholder="Enter your landing page URL"
                    helperText="Please include https://"
                    fullWidth
                    margin="normal"
                    InputLabelProps={{
                      shrink: true,
                    }}
                    style={{ width: '100%' }}
                    variant="outlined"
                    onChange={(e) => setPageURL(e.target.value)}
                  />
                  <ChipInput
                    className="accordion__keywordsInput"
                    defaultValue={focusWords}
                    fullWidth
                    onChange={(chips) => setFocusWords(chips)}
                    placeholder="Enter your focus keywords"
                    helperText="Please press Enter key after writing each keyword"
                    InputLabelProps={{
                      shrink: true,
                    }}
                    variant="outlined"
                  />
                </div>
              </div>
            </TabPanel>
            <TabPanel
              value={currentTab}
              index="adText"
              style={{
                height: '200px',
                backgroundColor: '#f5f5f5',
                paddingBottom: '50px',
                marginTop: '10px',
              }}
            >
              <div style={{ width: '100%' }}>
                <TextField
                  id="outlined-full-width"
                  label="Ad Text Area"
                  multiline
                  rows={7}
                  helperText="Please follow the guidelines in placeholder"
                  fullWidth
                  margin="normal"
                  InputLabelProps={{
                    shrink: true,
                  }}
                  style={{ margin: 8, width: '100%' }}
                  variant="outlined"
                  placeholder={
                    adPlatform === 'adwords' ? 'Headline1:\n' +
                    'Headline2:\n' +
                    'Headline3:\n' +
                    'Description1:\n' +
                    'Description2:' : 'Write an ad text'
                  }
                  onChange={(e) => (setAdTextSearchText(e.target.value))}

                />
              </div>
            </TabPanel>
            <TabPanel
              value={currentTab}
              index="keyword"
              style={{
                height: '200px',
                backgroundColor: '#f5f5f5',
                paddingBottom: '50px',
                marginTop: '10px',
              }}
            >
              <ChipInput
                className="accordion__keywordsInput"
                defaultValue={focusWords}
                fullWidth
                onChange={(chips) => setFocusWords(chips)}
                placeholder="Enter your focus keywords"
                helperText="Please press Enter key after writing each keyword"
                InputLabelProps={{
                  shrink: true,
                }}
                variant="outlined"
                style={{marginBottom: '20px'}}
              />
              <TextField
                id="outlined-full-width"
                label="Industry"
                placeholder="Enter Industry"
                helperText="Enter the Industry in one word"
                fullWidth
                margin="normal"
                InputLabelProps={{
                  shrink: true,
                }}
                style={{ width: '100%' }}
                variant="outlined"
                value={audienceOrIndustry}
                onChange={(e) => (setAudienceOrIndustry(e.target.value))}
              />
            </TabPanel>
            <Divider
              variant="middle"
              style={{ marginTop: '50px', marginBottom: '30px' }}
            />
            <div>
              <div style={{ width: '100%' }}>
                <h3>Choose an Ad Platform</h3>
                <div>
                  <RadioGroup
                    row
                    aria-label="position"
                    name="position"
                    defaultValue="adwords"
                    /* eslint-disable-next-line max-len */
                    onChange={(e) => { setAdPlatform(e.target.value); console.log(e.target.value); setAdResults([]); }}
                    value={adPlatform}
                  >
                    <FormControlLabel
                      value="adwords"
                      control={<Radio color="primary" />}
                      label="Adwords"
                      labelPlacement="end"
                    />
                    <FormControlLabel
                      value="reddit"
                      control={<Radio color="primary" />}
                      label="Reddit"
                      labelPlacement="end"
                    />
                    <FormControlLabel
                      value="facebook"
                      control={<Radio color="primary" />}
                      label="Facebook"
                      labelPlacement="end"
                    />
                    <FormControlLabel
                      value="twitter"
                      disabled
                      control={<Radio color="primary" />}
                      label="Twitter"
                      labelPlacement="end"
                    />
                    <FormControlLabel
                      value="other"
                      disabled
                      control={<Radio color="primary" />}
                      label="Other (Generic)"
                      labelPlacement="end"
                    />
                  </RadioGroup>
                </div>
              </div>
            </div>
            <div
              style={{
                display: 'flex',
                flex: 1,
                justifyContent: 'space-between',
                flexDirection: 'column',
                alignItems: 'center',
              }}
            >
              <Button
                variant="contained"
                color="secondary"
                style={{
                  margin: '1px',
                  float: 'right',
                  marginTop: '20px',
                  textAlign: 'center',
                  width: '200px',
                }}
                disabled={isQueryRunning}
                onClick={makeBackendRequest}
              >
                {isQueryRunning ? 'Fetching Ads!' : 'Make Ad Copy!'}
              </Button>
            </div>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={7} style={{ width: '100%' }}>
          <Paper
            style={{
              overflow: 'scroll',
              overflowY: 'scroll',
              height: '100%',
              // position: 'absolute',
              backgroundColor: '#f5f5f5',
            }}
            className={classes.paper}
          >
            <div
              style={{
                display: 'flex',
                flex: 1,
                justifyContent: 'space-between',
                alignItems: 'center',
              }}
            >
              {adResults.length > 1 && (
                <>
                  <List dense className={classes.root}>
                    {adResults.map((result, index) => {
                      const labelId = `checkbox-list-secondary-label-${index}`;
                      return (
                        // eslint-disable-next-line react/no-array-index-key
                        <ListItem key={index}>
                          <ListItemText id={labelId}>
                            <div
                              style={{
                                outline: 'none',
                                border: 0,
                                backgroundColor: 'white',
                                fontSize: '16px',
                                padding: '8px 16px',
                                borderRadius: '16px',
                                width: '90%',
                              }}
                            >
                              <div style={{ color: 'rgb(28, 27, 168)', fontSize:'15px' }}>
                                {result.headline1 && result.headline2 && result.headline3 && `${result.headline1} | ${result.headline2} | ${result.headline3}`}
                                {adPlatform === 'adwords' ?(<img src={`${adPlatform}Icon.png`} alt="" style={{width:'20px', marginLeft: '5px'}}/>) :''}
                              </div>
                              <div style={{ color: 'black', fontSize:'14px' }}>
                                {result.description1}
                                {adPlatform !== 'adwords' ? (<img src={`${adPlatform}Icon.png`} alt="" style={{width:'20px', marginLeft: '5px'}}/>) : ''}
                              </div>
                              <div style={{ color: 'black', fontSize:'14px' }}>
                                {result.description2}
                              </div>
                            </div>
                          </ListItemText>
                          <ListItemSecondaryAction>
                            <Checkbox
                              edge="end"
                              inputProps={{ 'aria-labelledby': labelId }}
                              id={index}
                              onClick={handleFavouritedAdsCheckbox}
                            />
                          </ListItemSecondaryAction>
                        </ListItem>
                      );
                    })}
                  </List>
                </>
              )}
            </div>
            {/*{isQueryRunning && <LinearProgress color="secondary" />}*/}
            {isQueryRunning && <img src="loading.gif" alt="loading..." style={{textAlign:'center', marginLeft: '25%', marginTop: '15%'}} />}
            <div>
              {adResults.length > 0 && (
                <Button
                  variant="contained"
                  color="secondary"
                  style={{
                    float: 'right',
                    textAlign: 'center',
                    width: '200px',
                    position: 'absolute',
                    margin: '150px 1px 1px'
                  }}
                  disabled={isRefining}
                  onClick={sendRefineRequest}
                >
                  {isRefining ? 'Refining!' : 'Refine'}
                </Button>
              )}


              {adResults.length > 0 && (
                <Button
                  variant="contained"
                  color="secondary"
                  style={{

                    float: 'right',
                    marginTop: '20px',
                    textAlign: 'center',
                    width: '200px',
                    position: 'absolute',
                    margin: '150px 230px 1px'
                  }}
                  onClick={() => setSendToModalOpen(true)}
                >
                  {`Send To ${adPlatform.charAt(0).toUpperCase() + adPlatform.slice(1)}`}
                </Button>
              )}
            </div>
            <Dialog
              fullWidth={true}
              maxWidth="md"
              open={sendToModalOpen}
              onClose={(e) => setSendToModalOpen(false)}
              aria-labelledby="max-width-dialog-title"
            >
              <DialogTitle id="max-width-dialog-title">Optional sizes</DialogTitle>
              <DialogContent>
                <DialogContentText>
                  {adResults.map((result, index) => {
                    const labelId = `checkbox-list-secondary-label-${index}`;
                    return (
                      // eslint-disable-next-line react/no-array-index-key
                      <div
                        style={{
                          outline: 'none',
                          border: 0,
                          backgroundColor: 'white',
                          fontSize: '16px',
                          padding: '8px 16px',
                          borderRadius: '16px',
                          width: '90%',
                          height: '120px',
                        }}
                      >
                        <div style={{ color: 'rgb(28, 27, 168)' }}>
                          {`${result.headline1} | ${result.headline2} | ${result.headline3}`}
                          <img src={`${adPlatform}Icon.png`} alt="" style={{width:'20px'}}/>
                        </div>
                        <div style={{ color: 'black' }}>
                          {result.description1}
                          {/*{truncate(result.description1, 90)}*/}
                        </div>
                        <div style={{ color: 'black' }}>
                          {result.description2}
                          {/*{truncate(result.description2, 90)}*/}
                        </div>
                      </div>
                    );
                  })}
                </DialogContentText>
              </DialogContent>
              <DialogActions>
                <Button onClick={(e) => setSendToModalOpen(false)} color="primary">
                  Close
                </Button>
              </DialogActions>
            </Dialog>

          </Paper>
        </Grid>
      </Grid>
      <div style={{    textAlign: 'center', width: '100%', marginTop: '57px' }}>
        Created with <span style={{color: '#e25555', padding:'0px 4px'}}> ❤ </span> by Ads Team - Powered by JotForm
      </div>
    </div>
  );
}
