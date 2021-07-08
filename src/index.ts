import express from "express";
import cors from "cors";
import * as path from "path";
import "dotenv";
import { addUser, checkUser } from "./Query/accountQueries";
import { addNews, deleteNews, getAllNews, getTopNews } from "./Query/newsQueries";

const app = express();
const PORT = process.env.PORT || 3000;
const apiPath = "/api";

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.get(apiPath, async (req, res) => {
    return res.status(200).send({
        message:
            "API for the purpose of the Department of machining and assembly.",
    });
});

app.get(path.join(apiPath, "/files/*"), (req, res) => {
    res.status(200).download("./" + req.path);
});

app.get(path.join(apiPath, "/topNews"), (req, res) => {
    getTopNews()
        .then((response) => res.status(200).send(response))
        .catch((error) => res.status(500).send(error));
});

app.get(path.join(apiPath, "/allNews"), (req, res) => {
    getAllNews()
        .then((response) => res.status(200).send(response))
        .catch((error) => res.status(500).send(error));
});

app.post(path.join(apiPath, "/addNews"), (req, res) => {
    addNews(req.body)
        .then((response) => res.status(200).send(response))
        .catch((error) => res.status(500).send(error));
});

app.post(path.join(apiPath, "/deleteNews"), (req, res) => {
    deleteNews(req.body)
        .then((response) => res.status(200).send(response))
        .catch((error) => res.status(500).send(error));
});

app.post(path.join(apiPath, "/checkUser"), (req, res) => {
    checkUser(req.body)
        .then((response) => res.status(200).send(response))
        .catch((error) => res.status(500).send(error));
});

app.post(path.join(apiPath, "/addUser"), (req, res) => {
    addUser(req.body)
        .then((response) => res.status(200).send(response))
        .catch((error) => res.status(500).send(error));
});

try {
    app.listen(PORT, (): void => {
        console.log(`API is running on http://localhost:${PORT}${apiPath}`);
    });
} catch (error) {
    console.log(`Error occurred: ${error.message}`);
}
