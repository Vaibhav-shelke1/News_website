import express from "express";
import axios from "axios";
import moment from "moment";
import dotenv from "dotenv";

// Load environment variables from .env file
dotenv.config();

const newsRouter = express.Router();
const common_url = "http://newsapi.org/v2/";
const apiKey = `apiKey=${process.env.NEWS_API_KEY}`;

// Route for top headlines
newsRouter.get("/", async (req, res) => {
    try {
        const url = `${common_url}top-headlines?country=in&${apiKey}`;
        const news_get = await axios.get(url);
        
        // Format dates using moment.js
        const articles = news_get.data.articles.map(article => ({
            ...article,
            publishedAt: moment(article.publishedAt).format("MMMM Do YYYY, h:mm:ss a")
        }));
        
        res.render("news", { articles });
    } catch (err) {
        if (err.response) {
            console.error("Error fetching top headlines:", err.response.data);
        } else {
            console.error("Error:", err.message);
        }
        res.render("news", { articles: null, message: "Failed to load news articles. Please try again later." });
    }
});

// Route for search functionality
newsRouter.post("/search", async (req, res) => {
    const search = req.body["search"];
    try {
        const url = `${common_url}everything?q=${search}&${apiKey}`;
        const news_get = await axios.get(url);
        
        // Format dates using moment.js
        const articles = news_get.data.articles.map(article => ({
            ...article,
            publishedAt: moment(article.publishedAt).format("MMMM Do YYYY, h:mm:ss a")
        }));
        
        res.render("news", { articles });
    } catch (err) {
        if (err.response) {
            console.error("Error fetching search results:", err.response.data);
        } else {
            console.error("Error:", err.message);
        }
        res.render("news", { articles: null, message: "Failed to perform search. Please try again later." });
    }
});

// Route for category-based news
newsRouter.get("/news/:category", async (req, res) => {
    const category = req.params.category;
    try {
        const url = `${common_url}top-headlines?country=in&category=${category}&${apiKey}`;
        const news_get = await axios.get(url);
        
        // Format dates using moment.js
        const articles = news_get.data.articles.map(article => ({
            ...article,
            publishedAt: moment(article.publishedAt).format("MMMM Do YYYY, h:mm:ss a")
        }));
        
        res.render("category", { articles });
    } catch (err) {
        if (err.response) {
            console.error("Error fetching category news:", err.response.data);
        } else {
            console.error("Error:", err.message);
        }
        res.render("category", { articles: null, message: `Failed to load ${category} news. Please try again later.` });
    }
});

export default newsRouter;
