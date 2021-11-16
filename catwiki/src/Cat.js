import React, { useState } from "react";
import { useParams } from "react-router";
import config from "./config.js";
import PlaceholderCat from "./images/placeholder.png";

function Cat(catData) {
  const [breedPictures, setPictures] = useState([]);

  let { breed } = useParams();
  let breedData = catData.catData.filter(
    (cat) => cat.name.toLowerCase() === breed.replace(/-/g, " ").replace(/_/g, '-')
  )[0];

  if (
    breedData &&
    breedPictures.length === 0 &&
    breedPictures[0] !== "loading"
  ) {
    setPictures(["loading"]);
    fetch(config.SERVER_URL+"/cat-photos/" + breedData.id, {
      method: "POST",
    })
      .then((res) => res.json())
      .then((data) => {
        setPictures(data);
      });
  }

  let catPictures =
    breedPictures[0] !== "loading" &&
    breedPictures.map((picture) => {
      return (
        <img
          src={picture.url}
          alt={picture.breeds[0].alt_names}
          loading="lazy"
        />
      );
    });
  let catPhoto;
if(breedData.image) {
  catPhoto = breedData.image.url
} else if (breedPictures[0]) {
  catPhoto = breedPictures[0].url
} else {
  catPhoto = PlaceholderCat;
}


  return (
    <div>
      {breedData && (
        <div>
          <div id="cat-info">
            <div id="cat-thumbnail">
              <div className="highlight-active">
                <img
                  src={catPhoto}
                  alt={breedData.alt_names}
                  width="90%"
                  style={{ "aspect-ratio": "1/1", "object-fit": "cover" }}
                />
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
                <div
                  className={`stats-bars bars-${breedData.stranger_friendly}`}
                >
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
      )}
    </div>
  );
}

export default Cat;
