// Imports
const NewsService = require('../services/news_service');

newsController = {};

// Get the list of news without date of archive 
newsController.getNews = async function(req, res) {

    let data;
    let newsList = await NewsService.getNews();
    data = newsList;

    if (data === "error occured") {
        res.status(400);
        res.json({
            error: "ERROR"
        });
        return res;
    }
    res.status(200);
    res.json(data);
    
    return res;

}

// Get the list of news with date of archive
newsController.getArchivedNews = async function (req, res) {

    let data;
    let archivedNewsList = await NewsService.getArchivedNews();
    data = archivedNewsList;
    
    if (data === "error occured") {
        res.status(400);
        res.json({
            error: "ERROR"
        });
        return res;
    }
    res.status(200);
    res.json(data);
    
    return res;

}

// Archive a new. Param: mongo _id
newsController.saveNews = async function (req, res) {
    var new_info = JSON.parse(req.body.params.updates[0].value);

    let data = await NewsService.saveNews(new_info);

    if (data === "error occured") {
        res.status(400);
        res.json({
            error: "ERROR"
        });
        return res;
    }
    res.status(200);
    res.json(data);
    
    return res;


}

// Delete a new. Param: mongo _id
newsController.deleteNews = async function (req, res) {

    let new_info = JSON.parse(req.query.new_info);

    let data = await NewsService.deleteNews(new_info._id);

    if (data === "error occured") {
        res.status(400);
        res.json({
            error: "ERROR"
        });
        return res;
    }
    res.status(200);
    res.json(data);
    
    return res;

    

}

module.exports = newsController;