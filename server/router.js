const express = require('express');

const router = express.Router();
const MainController = require('./controllers/main.controller');
const AiController = require('./controllers/ai.controller');

router.get('/', MainController.main);
router.get('/keyword', MainController.keyword);
router.post('/ai/search', AiController.search);
router.post('/ai/completions', AiController.completions);
router.post('/ai/generate', AiController.generate);

module.exports = router;
