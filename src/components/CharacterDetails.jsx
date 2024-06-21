import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { apiUrlGetDataDetails } from "../api";

import styles from "./CharacterDetails.module.css";
import axios from "axios";
import { Link } from "react-router-dom";

function CharacterDetails() {
  const [characterDetails, setCharacterDetails] = useState(null);

  const { id } = useParams();

  useEffect(() => {
    async function fetchCharacterDetails() {
      const url = apiUrlGetDataDetails.replace("{characterId}", id);

      const response = await axios.get(url);
      console.log(response.data.data.results[0]);
      setCharacterDetails(response.data.data.results[0]);
    }

    fetchCharacterDetails();
  }, []);

  return (
    <>
      {characterDetails && (
        <div className={styles.container}>
          <img
            className={styles.image}
            src={
              characterDetails.thumbnail.path +
              "." +
              characterDetails.thumbnail.extension
            }
            alt={characterDetails.name}
          />
          <h2>
            <b>Name: </b>
            {characterDetails.name}
          </h2>
          <p>
            <b>Description: </b>
            {characterDetails.description}
          </p>
          <div style={{ textAlign: "left" }}>
            <h3>Associated Comics</h3>
            <ul>
              {characterDetails.comics.items.map((comic, index) => (
                <li key={index}>{comic.name}</li>
              ))}
            </ul>
          </div>

          <Link to="/">Back to Home page</Link>
        </div>
      )}
    </>
  );
}

export default CharacterDetails;
