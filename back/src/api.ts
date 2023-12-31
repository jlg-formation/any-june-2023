import { json, Router } from "express";
import { Article, NewArticle } from "./interfaces/article";

const generateId = () =>
  Date.now() + "_" + (Math.random() * 1e9).toFixed().padStart(10, "0");

let articles: Article[] = [
  { id: "a1", name: "Tournevis", price: 2.99, qty: 123 },
  { id: "a2", name: "Pelle", price: 5.4, qty: 51 },
];

const app = Router();

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Headers", "*");
  res.setHeader("Access-Control-Allow-Methods", "*");
  next();
});

app.use((req, res, next) => {
  const auth = req.get("Authorization");
  const token = auth?.substring("Bearer ".length);
  if (token === "123soleil") {
    next();
    return;
  }
  res.status(401).end();
});

app.get("/articles", (req, res) => {
  res.json(articles);
});

app.use(json());

app.post("/articles", (req, res) => {
  const newArticle: NewArticle = req.body;
  const id = generateId();
  const article = { ...newArticle, id };
  articles.push(article);
  res.json({ id });
});

app.delete("/articles", (req, res) => {
  const ids: string[] = req.body;
  articles = articles.filter((a) => !ids.includes(a.id));
  res.status(204).end();
});

app.post("/check", (req, res) => {
  const body: { value: string } = req.body;
  console.log("value: ", body.value);
  const result = body.value !== "XXX";
  res.json({ result });
});

export const api = app;
