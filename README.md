# gpt3-nodejs-wrapper
A wrapper which handles gpt-3 requests

###To install & run the server
```bash
yarn && yarn start
```

###To run ad tag tool
```bash
yarn watch:client
```


###To run keyword suggestion
```bash
yarn watch:keyword_client
```

###To server remote;
- First install ngrok from their website and get an account.
- Then, run following where PORT is the nodeJS port that is served locally.
```bash
./ngrok http PORT
```
That will give remote access to your local port 
