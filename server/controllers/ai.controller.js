const fetch = require('node-fetch');
const OpenAI = require('../lib/openai.lib');
const { OPEN_AI_API_KEY, OPEN_AI_API_KEY2, OPEN_AI_API_KEY3 } = require('../config');

const openai = new OpenAI(OPEN_AI_API_KEY);
const keys = [OPEN_AI_API_KEY, OPEN_AI_API_KEY2,OPEN_AI_API_KEY3];
openai.setApiKey(keys[Math.floor(Math.random() * keys.length)]);

class AiController {
  async search(req, res) {
    const {
      engine = '',
      documents = [''],
      query = '',
    } = req.body;

    const result = await openai.search(engine, {
      documents,
      query,
    });

    const { data } = result.data;

    res.json({
      data,
      status: 200,
    });
  }

  async completions(req, res, extra = null) {
    const { engine, ...options } = req.body;
    const prodResponse = '';
    return fetch(`https://www.jotform.com/API/gpt3/completion?dbg=1&${new URLSearchParams(req.body).toString()}`, {
      method: 'POST', // *GET, POST, PUT, DELETE, etc.
      mode: 'cors', // no-cors, *cors, same-origin
      cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
      credentials: 'same-origin', // include, *same-origin, omit
      headers: {
        accept: 'application/json, text/plain, */*',
        'accept-language': 'en-US,en;q=0.9',
        'sec-ch-ua': '"Google Chrome";v="87", " Not;A Brand";v="99", "Chromium";v="87"',
        'sec-ch-ua-mobile': '?0',
        'sec-fetch-dest': 'empty',
        'sec-fetch-mode': 'cors',
        'sec-fetch-site': 'same-origin',
      },
      referrer: 'https://www.jotform.com/myforms/',
      referrerPolicy: 'strict-origin-when-cross-origin',
      redirect: 'follow', // manual, *follow, error
      // referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
      // eslint-disable-next-line max-len
    }).then((text) => text.json())
      .then((content) => {
        console.log(content);
        const result = { data: {} };
        result.data.choices = content.content;
        if (extra && extra.adTextURLPrompt) {
          result.data.choices[0].text = extra.adTextURLPrompt + result.data.choices[0].text;
        }

        if (extra && extra.return) {
          return result.data;
        }
        res.json({
          data: result.data,
          status: 200,
        });
      });

    // const result = await openai.completions(engine, options);
  }

  async generate(req, res) {
    const { engine, ...options } = req.body;

    const result = await openai.generate(engine, options);

    res.json({
      data: result.data,
      status: 200,
    });
  }
}

module.exports = new AiController();
