import CatCuddle from "./images/image 2.png";
import CatCar from "./images/image 3.png";
import CatShoulder from "./images/image 1.png";
import PlaceholderCat from "./images/placeholder.png";
import PerfectScrollbar from "perfect-scrollbar";
import "perfect-scrollbar/css/perfect-scrollbar.css";
import LogoWhite from "./images/CatwikiLogo_white.svg";
import React from "react";
import { Link } from "react-router-dom";
import config from "./config.js";

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchInput: {
        value: "",
        state: false,
        searchBreeds: [],
        modalActive: false
      },
      popularity: [],
      randomFact: "",
      width: window.innerWidth,
    };
    this.searchInput = this.searchInput.bind(this);
    this.setFocus = this.setFocus.bind(this);
    this.setBlur = this.setBlur.bind(this);
    this.setPopularity = this.setPopularity.bind(this);
    this.toggleSearchModal = this.toggleSearchModal.bind(this);
    this.scrollBar = this.scrollBar.bind(this);
  }

  static getDerivedStateFromProps(props, state) {
    let search = { ...state.searchInput };
    search.searchBreeds = props.catData;
    return {
      searchInput: search,
    };
  }

  componentDidMount() {
    this.scrollBar();
    fetch(config.SERVER_URL+"/cat-popularity",
      {
        method: "GET",
      }
    )
      .then((res) => res.json())
      .then((data) => {
        this.setState(() => ({
          popularity: data,
        }));
      });
    window.addEventListener("resize", () => {
      this.setState(() => ({
        width: window.innerWidth,
      }));
      this.ps.destroy();
      this.ps = null;
      this.scrollBar();
    });
  }

  scrollBar() {
    this.ps = new PerfectScrollbar(this.state.width > 480 ? "#results-list" : "#results-list-mobile", {
      minScrollbarLength: 20,
      wheelPropagation: false,
      scrollingThreshold: 0,
    });
  }

  searchInput(e) {
    let search = { ...this.state.searchInput };
    search.value = e.target.value;
    this.setState(() => ({
      searchInput: search,
    }));
    document.querySelector(this.state.width > 480 ? "#results-list" : "#results-list-mobile").scrollTop = 0;
  }

  setFocus(e) {
    let search = { ...this.state.searchInput };
    search.state = true;
    this.setState(() => ({
      searchInput: search,
    }));
  }

  setBlur(e) {
    setTimeout(() => {
      let search = { ...this.state.searchInput };
      search.state = false;
      this.setState(() => ({
        searchInput: search,
      }));
    }, 200);
  }

  setPopularity(e) {
    let breed = e.currentTarget.attributes.breed.value;
    fetch(config.SERVER_URL+"/cat-pop-add/" +
        breed,
      {
        method: "POST",
      }
    )
      .then((res) => res.json())
      .then((data) => {});
  }

  toggleSearchModal() {
    let search = this.state.searchInput;
    search.modalActive = this.state.searchInput.modalActive === true ? false : true;
    this.setState(() => ({
      searchInput: search
    }))
  }

  render() {
    let searchRegex = new RegExp(this.state.searchInput.value, "ig");
    let searchSuggestions = this.state.searchInput.searchBreeds
      .filter((breed) => breed.name.match(searchRegex))
      .map((breed) => {
        let link = ("cat/" + breed.name)
          .replace(/-/g, "_")
          .replace(/ /g, "-")
          .toLowerCase();
        return (
          <Link
            to={link}
            className="search-result"
            breed={breed.id}
            onClick={this.setPopularity}
          >
            {breed.name}
          </Link>
        );
      });
    if (this.state.searchInput.value === "")
      searchSuggestions = this.state.searchInput.searchBreeds.map((breed) => {
        let link = ("cat/" + breed.name)
          .replace(/-/g, "_")
          .replace(/ /g, "-")
          .toLowerCase();
        return (
          <Link
            to={link}
            className="search-result"
            breed={breed.id}
            onClick={this.setPopularity}
          >
            {breed.name}
          </Link>
        );
      });
    let popularityList = [];
    if ( this.state.popularity.length !== 0 && this.state.searchInput.searchBreeds.length !== 0 )
      popularityList = this.state.popularity.slice(0, 4).map((catData) => {
        let cat = this.state.searchInput.searchBreeds.filter(
          (catList) => catList.id === catData[0]
        )[0];
        let index = this.state.popularity.indexOf(catData);
        return (
          <Link
            to={
              "/cat/" +
              cat.name.replace(/-/g, "_").replace(/ /g, "-").toLowerCase()
            }
            breed={cat.id}
            onClick={this.setPopularity}
            className="highlight-cat"
          >
            <div className={index === 0 && "highlight-active"}>
              {cat.image ? (
              <img src={cat.image.url} alt={cat.name} />
              ) : (
                <img src={PlaceholderCat} alt={cat.name} />
              )}
            </div>
            <p>{cat.name}</p>
          </Link>
        );
      });

    return (
      <div>
        <div id="banner">
          <div id="banner-inner">
            <img src={LogoWhite} alt="Header Logo" id="banner-img" />
            <h6>Get to know more about your cat breed</h6>
            {this.state.width > 480 && (
              <div>
                <div className="input-icon">
                  <input
                    type="search"
                    placeholder="Enter your breed"
                    id="breed-search-input"
                    onChange={this.searchInput}
                    value={this.state.searchInput.value}
                    onFocus={this.setFocus}
                    onBlur={this.setBlur}
                  />
                  <i className="fas fa-search"></i>
                </div>
                <div
                  id="result-container"
                  className={
                    searchSuggestions.length > 0 &&
                    this.state.searchInput.state &&
                    "search-active"
                  }
                >
                  <div id="results-list">{searchSuggestions}</div>
                </div>
              </div>
            )}
            {this.state.width <= 480 && (
              <div>
                <div className="input-icon" onClick={this.toggleSearchModal}>
                  <div
                    type="search"
                    placeholder="Enter your breed"
                    className="input"
                  >
                    Search
                  </div>
                  <i className="fas fa-search"></i>
                </div>
                <div className={this.state.searchInput.modalActive ? 'mobile-search-modal modal-active' : 'mobile-search-modal'}>
                  <div className="modal-inner">
                  <div className="modal-header">
                  <i class="fas fa-times" onClick={this.toggleSearchModal}></i>
                  </div>  
                  <div className="input-icon">
                    <input
                      type="search"
                      placeholder="Enter your breed"
                      id="breed-search-input"
                      onChange={this.searchInput}
                      value={this.state.searchInput.value}
                      onFocus={this.setFocus}
                      onBlur={this.setBlur}
                    />
                    <i className="fas fa-search"></i>
                  </div>
                  <div id="results-list-mobile">{searchSuggestions}</div>
                </div>
                </div>
              </div>
            )}
          </div>
        </div>
        <div id="most-searched">
          <p>
            <strong>{this.state.randomFact}</strong>
          </p>
          <p className="small-title">Most Searched Breeds</p>
          <div id="highlight-header">
            <h2>66+ Breeds for You to discover</h2>
            <Link to="/Top10" className="caps-text">
              Top 10 Cats ⟶
            </Link>
          </div>
          <div id="highlight-cats">
            {popularityList.length >= 0 && popularityList}
          </div>
        </div>
        <div id="why-cat">
          <div id="why-left">
            <p className="small-title"></p>
            <h2>Why should you have a cat?</h2>
            <p>
              Having a cat around you can actually trigger the release of
              calming chemicals in your body which lower your stress and anxiety
              leves
            </p>
            <a
              href="https://youtu.be/dQw4w9WgXcQ"
              target="_blank"
              rel="noreferrer"
            >
              <p className="caps-text">Read More ⟶</p>
            </a>
          </div>
          <div id="why-right">
            <img
              className="img1"
              src={CatCuddle}
              alt="Cat cuddling"
              width="100%"
            />
            <img className="img2" src={CatCar} alt="Cat in Car" width="100%" />
            <img
              className="img3"
              src={CatShoulder}
              alt="Car on Shoulder"
              width="80%"
            />
          </div>
        </div>
      </div>
    );
  }
}

export default Home;
