import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

import { apiUrlGetAllData } from "../api";
import styles from "./CharacterList.module.css";

function CharacterList() {
  const [data, setData] = useState(null);

  useEffect(() => {
    async function getAllCharacters() {
      const response = await axios.get(apiUrlGetAllData);
      const results = response.data.data.results;
      setData(results);
    }

    getAllCharacters();
  }, []);

  return (
    <>
      {data ? (
        <div>
          <h1>Character List</h1>
          <div className={styles.container}>
            {data.map((item) => {
              const { thumbnail, name, id } = item;
              return (
                <div key={item.id} className={styles.card}>
                  <Link to={`/${id}`}>
                    <img
                      src={`${thumbnail.path}.${thumbnail.extension}`}
                      alt={name}
                      className={styles.image}
                    />
                  </Link>
                  <h2>{name}</h2>
                </div>
              );
            })}
          </div>
        </div>
      ) : (
        <img src={"../../public/loader.gif"} />
      )}
    </>
  );
}

export default CharacterList;
