// Get the News model
const News = require('../models/news_model');

newsService = {

    // Get the news without archiveDate ordered by his date desc.
    getNews() {

        return News.find({
            archiveDate: {"$exists": false}
        })
        .sort({
            date: -1
        })
        .catch((err) => {
            return err;
        });
    },

    // Get the news with archiveDate ordered by his date desc.
    getArchivedNews() {
        return News.find({
            archiveDate: {"$exists": true}
        })
        .sort({
            date: -1
        })
        .catch((err) => {
            return err;
        });
    },

    // Update a new with a archiveDate.
    saveNews(new_info) {
        return News.updateOne({
                _id: new_info.id
            }, {
                $set: {
                    archiveDate: new_info.archiveDate,
                }
            })
            .catch((err) => {
            return err;
        });
    },

    // Delete a new.
    deleteNews(new_id) {
        return News.deleteOne({
            _id: new_id
        })
        .catch((err) => {
            return err;
        })
    }

    
};

module.exports = newsService;