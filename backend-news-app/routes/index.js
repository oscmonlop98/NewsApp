// Importss
const express = require('express');
const router = express.Router();
var newsController = require("../controllers/news_controller");

// Routes
router.get('/home', newsController.getNews);

router.get('/archived-news', newsController.getArchivedNews);

router.post('/save-news', newsController.saveNews);

router.delete('/delete-news', newsController.deleteNews);

module.exports = router;