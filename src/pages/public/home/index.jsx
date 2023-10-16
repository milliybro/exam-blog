import { useState } from "react";
import { Navigate, NavLink } from "react-router-dom";
import CategoryCard from "../../../components/card/categoryCard";
import PopularCard from "../../../components/card/PopularCard";
import request from "../../../server";
import { trueDate } from "../../../utils/data";
import "./style.scss";
const HomePage = () => {
  const [lastone, setLastone] = useState("");
  async function getLatest() {
    try {
      const { data } = await request.get("post/lastone");
      setLastone(data);
    } catch (error) {
      console.log(error.name);
    }
  }
  getLatest();
  const getPostId = (id) => {
    Navigate(`post/${id}`);
  };
  return (
    <main>
      <section
        id="latest"

      >
        <div className="container">
          <div className="latest-text">
            <h5>
              Posted on <span>{lastone?.category?.name}</span>{" "}
            </h5>
            <h1>{lastone.title}</h1>
            <div>
              <h6>
                By{" "}
                <span>
                  {lastone?.user?.first_name} {lastone.user?.last_name}
                </span>{" "}
                | {trueDate(lastone.createdAt)}
              </h6>
              <p>{lastone.description}</p>
              <NavLink
                onClick={() => getPostId(`${lastone._id}`)}
                className="lastone-btn"
              >
                Read More{" "}
              </NavLink>
            </div>
          </div>
        </div>
      </section>
      <section id="popular">
        <div className="container">
          <h2>Popular blogs</h2>
          <PopularCard />
          <hr />
        </div>
      </section>
      <section id="category">
        <div className="container">
          <h2>Choose A Catagory</h2>
          <CategoryCard />
        </div>
      </section>
    </main>
  );
};

export default HomePage;
