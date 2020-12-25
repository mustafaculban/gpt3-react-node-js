const urlMetadata = require('url-metadata');
const fetch = require('node-fetch');
const cheerio = require('cheerio');
const AiController = require('./ai.controller');
const prompts = require('../prompts');
const { GoogleAdsApi, enums } = require('google-ads-api');
const { ADWORDS_CLIENT_ID, ADWORDS_CLIENT_SECRET, ADWORDS_DEVELOPER_TOKEN, ADWORDS_CUSTOMER_ACCOUNT, ADWORDS_CUSTOMER_REFRESH_TOKEN } = require('../config');

class MainController {
  main(req, res) {
    res.render('index');
  }

  keyword(req, res) {
    res.render('keyword');
  }

  async getKeywords(req, res) {
    const {
      url = 'https://www.jotform.com/surveys/',
      usePageMetadata = false,
    } = req.body;

    const result = {};
    if (usePageMetadata) {
      await urlMetadata(url, { timeout: 5000 })
        .then(
          (metadata) => { // success handler
            result.pageMetadata = (metadata.keywords ? metadata.keywords.split(', ')
              .map((element) => element.trim()) : 'No Content');
          },
          (error) => { // failure handler
            console.log(error);
          },
        );
    }
    res.json({
      data: result,
      status: 200,
    });
  }

  async getAdText(req, res) {
    let {
      // eslint-disable-next-line no-unused-vars,prefer-const
      url = false,
      // eslint-disable-next-line no-unused-vars,prefer-const
      usePageMetadata = false,
      // eslint-disable-next-line no-unused-vars
      keywords = [],
      // eslint-disable-next-line prefer-const
      type = false,
      // eslint-disable-next-line no-unused-vars,prefer-const
      focusWords = [],
      audienceOrIndustry = '',
      adTemplate = 'adwords',
      promptText: requestedAdText,
    } = req.body;

    if (type !== false) {
      switch (type) {
        case 'keywords':
          if (keywords) {
            keywords = keywords.map((el) => el.charAt(0).toUpperCase() + el.slice(1));
            const addText = prompts[adTemplate].keywordPrompt.replace('{{keywords}}', `${keywords.join(', ')}`).replace('{{audienceAndIndustry}}', audienceOrIndustry);
            const gptOptions = {
              engine: 'davinci',
              prompt: addText,
              max_tokens: 128,
              temperature: 0.75,
              top_p: 1,
              presence_penalty: 0.39,
              frequency_penalty: 0.13,
              best_of: 1,
              stop: '#',
            };
            if(adTemplate === 'adwords') {
              console.log(addText);

              const aiResult = await AiController.completions({ body: gptOptions }, res, {
                addText,
                return: true
              });
              const aiTextResult = aiResult.choices[0].text;
              const headline1 = Array.from(aiTextResult.matchAll(/.*Headline1:(.*\n)Headline2:/g), (x) => x[1] || [''])[0]?.trim();
              const headline2 = Array.from(aiTextResult.matchAll(/.*Headline2:(.*\n)Headline3:/g), (x) => x[1] || [''])[0]?.trim();
              const headline3 = Array.from(aiTextResult.matchAll(/.*Headline3:(.*\n)Description1:/g), (x) => x[1] || [''])[0]?.trim();
              const description1 = Array.from(aiTextResult.matchAll(/.*Description1:(.*\n)Description2:/g), (x) => x[1] || [''])[0]?.trim();
              const description2 = Array.from(aiTextResult.matchAll(/.*Description2:(.*\n?)/g), (x) => x[1] || [''])[0]?.trim();

              console.log(aiTextResult)
              res.json({
                data: {
                  headline1,
                  headline2,
                  headline3,
                  description1,
                  description2
                },
                status: 200
              });
            }
            else if(adTemplate === 'reddit') {
              const aiResult = await AiController.completions({ body: gptOptions }, res, {
                addText,
                return: true
              });
              const aiTextResult = aiResult.choices[0].text;
              const title = Array.from(aiTextResult.matchAll(/.*Title:(.*\n)/g), (x) => x[1] || [''])[0]?.trim();
              console.log(addText);
              console.log('resulting', aiTextResult)
              res.json({
                data: {
                  description1: title
                },
                status: 200
              });
            }
            else if (adTemplate === 'facebook') {
              const aiResult = await AiController.completions({ body: gptOptions }, res, {
                addText,
                return: true
              });
              const aiTextResult = aiResult.choices[0].text;
              const text = Array.from(aiTextResult.matchAll(/.*PrimaryText:(.*\n)/g), (x) => x[1] || [''])[0]?.trim();
              console.log(text);
              res.json({
                data: {
                  description1: text
                },
                status: 200
              });
            }
          }
          break;
        case 'url':
          if (url) {
            fetch(url)
              .then((text) => text.text())
              .then(async (content) => {
                const $ = cheerio.load(content);
                const heroText = $('h1:first').text().trim();
                const descriptionText = $('.introduction p:first').text().trim();

                //getting keywords
                let selectedKeywords = [];
                let addText = prompts[adTemplate].urlPrompt.replace('{{heroText}}', heroText)
                  .replace('{{descriptionText}}', descriptionText);
                if (usePageMetadata) {
                  const metaWords = $('meta[name ="keywords"]')
                    .attr('content');

                  metaWords
                    .split(',')
                    .map((element) => element.trim())
                    .map((el) => el.split(' ')
                      .map((splittedEl) => selectedKeywords.push(splittedEl)));
                  selectedKeywords = selectedKeywords
                    .filter((value, index, self) => self.indexOf(value) === index)
                    .slice(0, 2);
                }

                const selectedPartWhereKeywordsShouldBeIn = adTemplate === 'adwords' ? 'Headline1' : (adTemplate === 'reddit' ? 'Title' : (adTemplate === 'facebook' ? 'PrimaryText' : 'Headline1'));
                if (focusWords.length > 0) {
                  focusWords.forEach((el) => { selectedKeywords.push(el); console.log(el) });
                }
                if (selectedKeywords.length > 0) {
                  let keywordText = '\nRule: The following ad text contains {{keywords}} keywords in the '+selectedPartWhereKeywordsShouldBeIn+'.';
                  selectedKeywords = selectedKeywords
                    .map((el) => el.charAt(0).toUpperCase() + el.slice(1));
                  const last = selectedKeywords.pop();
                  if (selectedKeywords.length === 0) {
                    keywordText = '\nRule: The following ad text contains {{keywords}} keyword in the '+selectedPartWhereKeywordsShouldBeIn+'.';
                    keywordText = keywordText.replace('{{keywords}}', `${last}`);
                  } else {
                    keywordText = '\nRule: The following ad text contains {{keywords}} keywords in the '+selectedPartWhereKeywordsShouldBeIn+'.';
                    keywordText = keywordText.replace('{{keywords}}', `${selectedKeywords.join(', ')} and ${last}`);
                  }
                  addText = addText.replace('{{keywords}}', keywordText);
                } else {
                  addText = addText.replace('{{keywords}}', '\nRule: The following ad text contains all keywords in the '+selectedPartWhereKeywordsShouldBeIn+'.');
                  addText = addText.replace('/(.*)Rule: (.*)\n/g', '');
                }


                const gptOptions = {
                  engine: 'davinci',
                  prompt: addText,
                  max_tokens: 192,
                  temperature: 0.7,
                  top_p: 1,
                  presence_penalty: 0.33,
                  frequency_penalty: 0.13,
                  best_of: 1,
                  stop: '###',
                };

                if(adTemplate === 'adwords') {
                  console.log(addText);
                  // eslint-disable-next-line max-len
                  const aiResult = await AiController.completions({ body: gptOptions }, res, {
                    addText,
                    return: true
                  });
                  const aiTextResult = aiResult.choices[0].text;
                  const headline1 = Array.from(aiTextResult.matchAll(/.*Headline1:(.*\n)Headline2:/g), (x) => x[1] || [''])[0]?.trim();
                  const headline2 = Array.from(aiTextResult.matchAll(/.*Headline2:(.*\n)Headline3:/g), (x) => x[1] || [''])[0]?.trim();
                  const headline3 = Array.from(aiTextResult.matchAll(/.*Headline3:(.*\n)Description1:/g), (x) => x[1] || [''])[0]?.trim();
                  const description1 = Array.from(aiTextResult.matchAll(/.*Description1:(.*\n)Description2:/g), (x) => x[1] || [''])[0]?.trim();
                  const description2 = Array.from(aiTextResult.matchAll(/.*Description2:(.*\n?)/g), (x) => x[1] || [''])[0]?.trim();

                  console.log(aiTextResult)

                  res.json({
                    data: {
                      headline1,
                      headline2,
                      headline3,
                      description1,
                      description2
                    },
                    status: 200
                  });
                }
                else if(adTemplate === 'reddit') {
                  const aiResult = await AiController.completions({ body: gptOptions }, res, {
                    addText,
                    return: true
                  });
                  const aiTextResult = aiResult.choices[0].text;
                  const title = Array.from(aiTextResult.matchAll(/.*\nTitle:(.*\n)/g), (x) => x[1] || [''])[0]?.trim();
                  console.log(addText);
                  console.log(aiTextResult);
                  res.json({
                    data: {
                      description1: title
                    },
                    status: 200
                  });
                }
                else if (adTemplate === 'facebook') {
                  const aiResult = await AiController.completions({ body: gptOptions }, res, {
                    addText,
                    return: true
                  });
                  const aiTextResult = aiResult.choices[0].text;
                  const text = Array.from(aiTextResult.matchAll(/.*\nPrimaryText:(.*\n)/g), (x) => x[1] || [''])[0]?.trim();
                  console.log(addText);
                  res.json({
                    data: {
                      description1: text
                    },
                    status: 200
                  });
                }
              });
          }
          break;
        case 'adText':
          let promptText = prompts[adTemplate].adSetPrompt
            .replace('{{prompt}}', requestedAdText);

          const gptOptions = {
            engine: 'davinci',
            prompt: promptText,
            max_tokens: 192,
            temperature: 0.7,
            top_p: 1,
            presence_penalty: 0.33,
            frequency_penalty: 0.13,
            best_of: 1,
            stop: 'Original ad texts:',
          };

          console.log(promptText);
        if (adTemplate === 'adwords') {
          // eslint-disable-next-line max-len
          const aiResult = await AiController.completions({ body: gptOptions }, res, {
            promptText,
            return: true
          });
          console.log(aiResult.choices);
          const aiTextResult = aiResult.choices[0].text;

          const headline1 = Array.from(aiTextResult.matchAll(/.*Headline1:(.*\n)Headline2:/g), (x) => x[1] || [''])[0]?.trim();
          const headline2 = Array.from(aiTextResult.matchAll(/.*Headline2:(.*\n)Headline3:/g), (x) => x[1] || [''])[0]?.trim();
          const headline3 = Array.from(aiTextResult.matchAll(/.*Headline3:(.*\n)Description1:/g), (x) => x[1] || [''])[0]?.trim();
          const description1 = Array.from(aiTextResult.matchAll(/.*Description1:(.*\n)Description2:/g), (x) => x[1] || [''])[0]?.trim();
          const description2 = Array.from(aiTextResult.matchAll(/.*Description2:(.*\n?)/g), (x) => x[1] || [''])[0]?.trim();

          console.log(aiTextResult)

          res.json({
            data: {
              headline1,
              headline2,
              headline3,
              description1,
              description2
            },
            status: 200
          });
        }
        else if(adTemplate === 'reddit') {
          gptOptions.stop = 'Original ad text:';
          const aiResult = await AiController.completions({ body: gptOptions }, res, {
            addText : '',
            return: true
          });
          const aiTextResult = aiResult.choices[0].text;
          const title = Array.from(aiTextResult.matchAll(/.*\nAlternative ad text:\n(.*\n)/g), (x) => x[1] || [''])[0]?.trim();
          console.log(aiTextResult);
          res.json({
            data: {
              description1: title
            },
            status: 200
          });
        }

        else if(adTemplate === 'facebook') {
          gptOptions.stop = 'Original ad texts:';
          const aiResult = await AiController.completions({ body: gptOptions }, res, {
            addText : '',
            return: true
          });
          const aiTextResult = aiResult.choices[0].text;
          const title = Array.from(aiTextResult.matchAll(/.*\nAlternative ad texts:\n(.*\n?)/g), (x) => x[1] || [''])[0]?.trim();
          console.log(title);
          res.json({
            data: {
              description1: title
            },
            status: 200
          });
        }

        break;
        default:
          break;
      }
    }
  }

  async getAdGroupsAndCampaigns (req, res) {
    const client = new GoogleAdsApi({
      client_id: ADWORDS_CLIENT_ID,
      client_secret: ADWORDS_CLIENT_SECRET,
      developer_token: ADWORDS_DEVELOPER_TOKEN,
    })

    const customer = client.Customer({
      customer_account_id: ADWORDS_CUSTOMER_ACCOUNT,
      refresh_token: ADWORDS_CUSTOMER_REFRESH_TOKEN,
    })

    try {
      const results = await customer.report({
        entity: 'ad_group',
        attributes: ['campaign.id', 'campaign.name', 'ad_group.id', 'ad_group.name', 'ad_group.type'],
        constraints: [
          { 'ad_group.status': enums.AdGroupStatus.ENABLED },
          { 'ad_group.type': enums.AdGroupType.SEARCH_STANDARD },
          { 'campaign.advertising_channel_type': "SEARCH" },
        ],
      })

      const resultingArray = [];
      for (const { campaign, ad_group } of results) {
        resultingArray.push({adGroupName: ad_group.name, adGroupId: ad_group.id, adGroupString: ad_group.resource_name, campaignName: campaign.name});
      }

      console.log(resultingArray)

      res.json({
        data:resultingArray,
        status:200
      })

    } catch (err) {
      console.log(err)
    }
  }
  async publishAdSet(req, res) {
    // const x = await this.getAdGroups();
    const client = new GoogleAdsApi({
      client_id: ADWORDS_CLIENT_ID,
      client_secret: ADWORDS_CLIENT_SECRET,
      developer_token: ADWORDS_DEVELOPER_TOKEN,
    })

    const customer = client.Customer({
      customer_account_id: ADWORDS_CUSTOMER_ACCOUNT,
      refresh_token: ADWORDS_CUSTOMER_REFRESH_TOKEN,
    })

    // Bonus: If you're using Typescript, set the type here to "types.AdGroupAd" for autocomplete
    const ad = {
      ad_group: 'customers/CUSTOMER_ID/adGroups/AD_GROUP_ID',
      status: enums.AdGroupAdStatus.PAUSED,
      ad: {
        final_urls: ['http://www.jotform.com'],
        expanded_text_ad: {
          headline_part1: 'Online Secure Payment Forms',
          headline_part2: 'Create Secure Payment Forms',
          headline_part3: 'Credit Card Payments',
          description: 'You can now easily accept online payments from any device.',
          description2: 'Use our secure payment form builder to add a payment form to your website to start accepting credit card payments.',
        },
      },
    }

    try {
      const { results } = await customer.adGroupAds.create(ad)
      res.json({
        data: results,
        status:200
      })
    } catch (err) {
      console.log(err)
      res.json({
        data: err,
        status:400
      })
    }
  }
}

module.exports = new MainController();
