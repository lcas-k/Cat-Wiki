import React, { useState, useEffect } from "react";
import { useParams } from "react-router";
import { useHistory  } from "react-router-dom";
import config from "./config.js";
import PlaceholderCat from "./images/placeholder.png";

function Cat(catData) {
  const [breedData, setBreedData] = useState([]);
  const [catPictures, setCatPictures] = useState([]);
  const [catPhoto, setCatPhoto] = useState([]);
  
  let history = useHistory()
  let params = useParams();

  useEffect(() => {
    async function loadData() {
      let { breed } = params;
      if (!params.breed) {
        history.push("/");
        return
      }
      let paramBreed = catData.catData.filter((cat) => cat.name.toLowerCase() === breed.replace(/-/g, " ").replace(/_/g, "-"))[0];
      if(!paramBreed) {
        history.push("/")
        return
      }
      setBreedData(paramBreed);

      let pics = [];
      await fetch(config.SERVER_URL + "/cat-photos/" + paramBreed.id, {
        method: "POST",
      })
        .then((res) => res.json())
        .then((data) => {
          pics = data;
        });

      setCatPictures(
        pics.map((picture) => {
          return <img src={picture.url} alt={paramBreed.name} loading="lazy" />;
        })
      );

      let catPhoto;
      if (paramBreed && pics) {
        if (paramBreed.reference_image_id) {
          catPhoto = `https://cdn2.thecatapi.com/images/${paramBreed.reference_image_id}.jpg`
        } else if (pics[0]) {
          catPhoto = pics[0].url;
        } else {
          catPhoto = PlaceholderCat;
        }
      }
      setCatPhoto(catPhoto);
    }
    loadData();
  }, [catData, history, params]);

  return (
    <div>
      {breedData ? (
        <div>
          <div id="cat-info">
            <div id="cat-thumbnail">
              <div className="highlight-active">
                <img src={catPhoto} alt={breedData.alt_names} width="90%" style={{ aspectRatio: "1/1", objectFit: "cover" }} />
              </div>
            </div>
            <div id="cat-description">
              <h4>{breedData.name}</h4>
              <p>{breedData.description}</p>
              <p>
                <strong>Temperament:</strong> {breedData.temperament}
              </p>
              <p>
                <strong>Origin:</strong> {breedData.origin}
              </p>
              <p>
                <strong>Life Span:</strong> {breedData.life_span} Years
              </p>
              <div className="cat-stats">
                <div className="stats-title">
                  <strong>Adaptability:</strong>
                </div>
                <div className={`stats-bars bars-${breedData.adaptability}`}>
                  <div></div>
                  <div></div>
                  <div></div>
                  <div></div>
                  <div></div>
                </div>
                <div className="stats-title">
                  <strong>Affection Level:</strong>
                </div>
                <div className={`stats-bars bars-${breedData.affection_level}`}>
                  <div></div>
                  <div></div>
                  <div></div>
                  <div></div>
                  <div></div>
                </div>
                <div className="stats-title">
                  <strong>Child Friendly:</strong>
                </div>
                <div className={`stats-bars bars-${breedData.child_friendly}`}>
                  <div></div>
                  <div></div>
                  <div></div>
                  <div></div>
                  <div></div>
                </div>
                <div className="stats-title">
                  <strong>Grooming:</strong>
                </div>
                <div className={`stats-bars bars-${breedData.grooming}`}>
                  <div></div>
                  <div></div>
                  <div></div>
                  <div></div>
                  <div></div>
                </div>
                <div className="stats-title">
                  <strong>Intelligence:</strong>
                </div>
                <div className={`stats-bars bars-${breedData.intelligence}`}>
                  <div></div>
                  <div></div>
                  <div></div>
                  <div></div>
                  <div></div>
                </div>
                <div className="stats-title">
                  <strong>Health issues:</strong>
                </div>
                <div className={`stats-bars bars-${breedData.health_issues}`}>
                  <div></div>
                  <div></div>
                  <div></div>
                  <div></div>
                  <div></div>
                </div>
                <div className="stats-title">
                  <strong>Social needs:</strong>
                </div>
                <div className={`stats-bars bars-${breedData.social_needs}`}>
                  <div></div>
                  <div></div>
                  <div></div>
                  <div></div>
                  <div></div>
                </div>
                <div className="stats-title">
                  <strong>Stranger friendly:</strong>
                </div>
                <div className={`stats-bars bars-${breedData.stranger_friendly}`}>
                  <div></div>
                  <div></div>
                  <div></div>
                  <div></div>
                  <div></div>
                </div>
              </div>
            </div>
          </div>
          {catPictures.length !== 0 && (
            <div id="cat-gallery">
              <h4>Other photos</h4>
              <div id="gallery-grid">{catPictures}</div>
            </div>
          )}
        </div>
      ) : (
        <div className="lds-ring">
          <div></div>
          <div></div>
          <div></div>
          <div></div>
        </div>
      )}
    </div>
  );
}

export default Cat;
