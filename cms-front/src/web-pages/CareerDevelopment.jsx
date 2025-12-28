import React, { useEffect, useState } from "react";
import Footer from "../components/Footer";
import NavBar from "../components/NavBar";
import "../components/web-pages-css/careerdevelopmentcss.css";
import axios from "axios";

const CareerDevelopment = () => {
  const [articles, setArticles] = useState([]);
  const [guides, setGuides] = useState([]);
  const [workshops, setWorkshop] = useState([]);
  const [jobboards, setJobboard] = useState([]);
  const [error, setError] = useState(null);
  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const articleResponse = await axios.get(
          "http://localhost:3002/api/article"
        );
        setArticles(articleResponse.data);
        const guidesResponse = await axios.get(
          "http://localhost:3002/api/guide"
        );
        setGuides(guidesResponse.data);
        const workshopResponse = await axios.get(
          "http://localhost:3002/api/workshop"
        );
        setWorkshop(workshopResponse.data);
        const jobboardResponse = await axios.get(
          "http://localhost:3002/api/jobboard"
        );
        setJobboard(jobboardResponse.data);
      } catch (err) {
        console.error("Error fetching articles");
      }
    };
    fetchArticles();
  }, []);
  return (
    <>
      <NavBar />
      <h1> Welcome {localStorage.getItem("username")}!</h1>

      <div className="career-development">
        <header>
          <h1>Career Development</h1>
        </header>

        <div className="content">
          {/* Container for Articles - Guides */}
          <div className="main-content">
            <section className="articles">
              <h2>Articles</h2>
              <div className="article-grid">
                {articles.map((article) => (
                  <div className="article-item" key={article.id}>
                    <a href={article.a_link}>{article.a_name}</a>
                  </div>
                ))}
              </div>
            </section>

            <section className="guides">
              <h2>Guides</h2>
              <div className="guide-grid">
                {guides.map((guide) => (
                  <div className="guide-item" key={guide.id}>
                    <a href={guide.g_link}>{guide.g_name}</a>
                  </div>
                ))}
              </div>
            </section>
          </div>

          {/* Resources section for Workshops and Job Board */}
          <aside className="resources">
            <div className="workshops">
              <h2>Workshop & Webinars</h2>
              <ul>
                {workshops.map((workshop) => (
                  <div key={workshop.w_id}>
                    <a className="workshop" href={workshop.w_link}>
                      {workshop.w_name}
                    </a>
                  </div>
                ))}
              </ul>
            </div>

            <div className="job-board">
              <h2>Job Board</h2>
              <ul>
                {jobboards.map((jobboard) => (
                  <li key={jobboard.j_id}>
                    {jobboard.jname}
                    <br />
                    <a href={jobboard.j_link}>{jobboard.j_link}</a>
                  </li>
                ))}
              </ul>
            </div>
          </aside>
        </div>
      </div>

      <Footer />
    </>
  );
};

export default CareerDevelopment;
