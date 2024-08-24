import express from "express";
import axios from "axios";
import moment from "moment";

const newsRouter = express.Router();
const common_url = "http://newsapi.org/v2/";
const apiKey = "apiKey=fc79901190a24c0182c7fe32e6d18267";

// Route for top headlines
newsRouter.get("/", async (req, res) => {
    try {
        const url = `${common_url}top-headlines?country=in&${apiKey}`;
        const news_get = await axios.get(url);
        console.log(news_get.data.articles);
        res.render("news", { articles: news_get.data.articles });
    } catch (err) {
        if (err.response) {
            console.error("Error fetching top headlines:", err.response.data);
        } else {
            console.error("Error:", err.message);
        }
        res.render("news", { articles: null });
    }
});

// Route for search functionality
newsRouter.post("/search", async (req, res) => {
    const search = req.body["search"];
    try {
        const url = `${common_url}everything?q=${search}&${apiKey}`;
        const news_get = await axios.get(url);
        res.render("news", { articles: news_get.data.articles });
    } catch (err) {
        if (err.response) {
            console.error("Error fetching search results:", err.response.data);
        } else {
            console.error("Error:", err.message);
        }
        res.render("news", { articles: null });
    }
});

// Route for category-based news
newsRouter.get("/news/:category", async (req, res) => {
    const category = req.params.category;
    try {
        const url = `${common_url}top-headlines?country=in&category=${category}&${apiKey}`;
        const news_get = await axios.get(url);
        res.render("category", { articles: news_get.data.articles });
    } catch (err) {
        if (err.response) {
            console.error("Error fetching category news:", err.response.data);
        } else {
            console.error("Error:", err.message);
        }
        res.render("category", { articles: null });
    }
});

export default newsRouter;
