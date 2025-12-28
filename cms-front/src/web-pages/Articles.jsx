import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Articles.css";

const Articles = () => {
    const [articles, setArticles] = useState([]);
    const [newArticle, setNewArticle] = useState({
        a_name: "",
        a_link: "",
    });
    const BASEURL = "http://localhost:3002";


    // Fetch articles data from the backend
    useEffect(() => {
        axios
            .get(BASEURL + "/api/article")
            .then((response) => {
                setArticles(response.data);
            })
            .catch((error) => {
                console.error("Error fetching articles:", error);
            });
    }, []);

    // Add new article
    const handleAddArticle = () => {
        axios
            .post(BASEURL + "/api/article", newArticle)
            .then(() => {
                // Fetch the updated list of articles
                return axios.get(BASEURL + "/api/article");
            })
            .then((response) => {
                setArticles(response.data);
                setNewArticle({
                    a_name: "",
                    a_link: "",
                });
            })
            .catch((error) => {
                console.error("Error adding article:", error);
            });
    };

    // Handle form changes for new article
    const handleChange = (e) => {
        const { name, value } = e.target;
        setNewArticle({
            ...newArticle,
            [name]: value,
        });
    };

    // Remove an article
    const handleRemoveArticle = (id) => {
        axios
            .delete(BASEURL + `/api/article?id=${id}`)
            .then(() => {
                setArticles(articles.filter((article) => article.a_id !== id));
            })
            .catch((error) => {
                console.error("Error removing article:", error);
            });
    };

    return (
        <div className="articles">
            <h2>Articles</h2>
            <div className="article-form">
                <input
                    type="text"
                    name="a_name"
                    value={newArticle.a_name}
                    onChange={handleChange}
                    placeholder="Article Name"
                />
                <input
                    type="url"
                    name="a_link"
                    value={newArticle.a_link}
                    onChange={handleChange}
                    placeholder="Article Link"
                />
                <button onClick={handleAddArticle}>Add Article</button>
            </div>

            <table className="article-table">
                <thead>
                    <tr>
                        <th>Article Name</th>
                        <th>Article Link</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {articles.map((article) => (
                        <tr key={article.a_id}>
                            <td>{article.a_name}</td>
                            <td>
                                <a href={article.a_link} target="_blank" rel="noopener noreferrer">
                                    {article.a_link}
                                </a>
                            </td>
                            <td>
                                <button onClick={() => handleRemoveArticle(article.a_id)}>
                                    Remove
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default Articles;
