import React, { Component } from "react";
import { connect } from "react-redux";
import _ from "lodash";

import { search, categorize, filterRating } from "../../utils";
import { SpectaclesTable, Pagination } from "../../components";
import { Input, Loading, ListGroup } from "../../components/common";

import { getSpectacles } from "../../actions/spectaclesAction";
import { getGenres } from "../../actions/genreAction";

class Spectacles extends Component {
  state = {
    genres: [],
    pageSize: 12,
    currentPage: 1,
    currentGenre: "All",
    searchFilter: "",
    rating: 0,
  };

  componentDidMount() {
    this.props.getSpectacles();
    this.props.getGenres();
  }

  handleChange = (name, value) => {
    this.setState({ [name]: value, currentPage: 1 });
  };

  onPageChange = (page) => {
    this.setState({ currentPage: page });
  };

  render() {
    const {
      currentGenre,
      currentPage,
      searchFilter,
      pageSize,
      rating,
    } = this.state;

    const { spectacles, genres, loggedIn } = this.props;

    if (_.isEmpty(spectacles)) {
      return (
        <div className="background-container pt-5">
          <Loading />
        </div>
      );
    }

    let filteredSpectacles = [];

    /* Checking for searched item if nothing searched it will just set it to allSpectacles*/
    filteredSpectacles = search(spectacles, searchFilter, "title");
    filteredSpectacles = categorize(filteredSpectacles, currentGenre);
    filteredSpectacles = filterRating(filteredSpectacles, rating);

    return (
      <div className="background-container">
        <div className="mx-5 py-5">
          <div className="row">
            <div className="col-lg-2 col-sm-12">
              <h4 className="text-muted text-left p-1">Filters</h4>
              <ListGroup
                active={currentGenre}
                onChange={(val) => this.handleChange("currentGenre", val)}
                options={genres}
              />

              <Input
                onChange={(val) =>
                  this.handleChange("rating", val.target.value)
                }
                label={"Rating"}
                min={0}
                max={10}
                placeholder="0-10"
                type="number"
                iconClass="fas fa-star"
              />
              {/* { loggedIn && <Link to='/spectacles/new' className='btn btn-primary btn-block my-2 text-white'> Add Spectacle </Link> } */}
              {/* <Rating total={5} filled={rating} onChange={val => this.handleChange('rating', val)}/> */}
            </div>

            <div className="col-lg-10 col-sm-12">
              <Input
                onChange={(event) =>
                  this.handleChange("searchFilter", event.target.value)
                }
                label="Search Spectacle"
                iconClass="fas fa-search"
                placeholder="Search..."
              />
              <p className="text-left text-muted">
                {!!filteredSpectacles.length ? `${filteredSpectacles.length}` : "0"}
                spectacles found.
              </p>

              {!!filteredSpectacles ? (
                <SpectaclesTable
                  pageSize={pageSize}
                  currentPage={currentPage}
                  spectacles={filteredSpectacles}
                />
              ) : (
                <h1 className="text-white">No Spectacles</h1>
              )}
              <br />

              <Pagination
                itemsCount={filteredSpectacles.length}
                pageSize={pageSize}
                onPageChange={this.onPageChange}
                currentPage={currentPage}
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    spectacles: state.spectacle.spectacles,
    genres: state.genre.genres,
    loggedIn: state.auth.loggedIn,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getSpectacles: () => dispatch(getSpectacles()),
    getGenres: () => dispatch(getGenres()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Spectacles);
