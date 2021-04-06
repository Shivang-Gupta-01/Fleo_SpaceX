import React, { Component, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Card, Button, Row, Col} from 'react-bootstrap';
import {IoIosArrowDropdown } from "react-icons/io";
import RocketLaunchDetails from './components/RocketLaunchDetails';
import querystring from 'querystring';
import './App.css';
import loader from './rocket.gif';
const API_BASE_URL = "https://api.spacexdata.com/v3/launches?limit=100";

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      items: [],
      isLoaded: false,
      isFilterOpen:false,
      isLaunchOpen :false,
      isYearOpen: false,
      isLandOpen: false,

      filters: {
        limit: 150,
        launch_year: undefined,
        launch_success: undefined,
        land_success: undefined,
      },
    }
  }
 toggle = (isOpen,openParam) => {

  if((openParam==="filter"))
  {
    this.setState({
      isFilterOpen: !isOpen
     },()=>{
       console.log(this.state);
     })
  }
  else if ((openParam==="year"))
   {this.setState({
    isYearOpen: !isOpen
   },()=>{
     console.log(this.state);
   })}
   else if(openParam==="launch")
   {
    this.setState({
      isLaunchOpen: !isOpen
     },()=>{
       console.log(this.state);
     })
   }
   else if(openParam==="land")
   {
    this.setState({
      isLandOpen: !isOpen
     },()=>{
       console.log(this.state);
     })
   }
   
 }

  getUpdatedApiUrl(filters = {}) {
    return API_BASE_URL + querystring.stringify({ ...filters });
  }

  fetchAPI(filters) {
    const URL = this.getUpdatedApiUrl(filters);
    this.setState({ isLoaded: false, filters });
    fetch(URL)
      .then(response => response.json())
      .then(data => {
        this.setState({
          isLoaded: true,
          data
        });
      });
  }

  componentDidMount() {
    this.fetchAPI(this.state.filters);
  }

  updateApiFilters(type, value) {
    
    if (this.state.filters[type] === value) {
      value = undefined;
    }

    const filters = {
      ...this.state.filters,
      [type]: value,
    };

    this.fetchAPI(filters);
  }

  render() {

    const { isLoaded, data } = this.state;
    const uniqueLaunchYears = new Array(16).fill(0).map((_, index) => 2006 + index);
    if (!isLoaded) {
      return <div className="App-loader-container">
        <div className="App-loader-box">
          <img src={loader} alt="loading..." />
        </div>
      </div>
    }

    else {

      return (
        <div className="App">
          <h1 className="App-header">SpaceX</h1>
          <Container fluid>
            <Row>
              <Col xs={12} sm={12} md={6} lg={3}>

                <Card className="App-filter-card">
                  <Card.Body>
                    <Card.Title className="App-filter-header">
                      Select Your Filters  <span className="year" onClick={() => {this.toggle(this.state.isFilterOpen,"filter")}} style={{ marginBottom: '1rem' }}><IoIosArrowDropdown/></span>
                    </Card.Title>
                    {
                    this.state.isFilterOpen ? 
                    <div className="Filters">
                      <Card.Text className="App-filter-heading-launch-year">
                      Launch Year
                      <span className="year" onClick={() => {this.toggle(this.state.isYearOpen,"year")}} style={{ marginBottom: '1rem' }}><IoIosArrowDropdown/></span>
                      <hr className="App-filters-hr" />
                    </Card.Text>
                    {
                    this.state.isYearOpen ? <Row>
                      <div className="App-filter-button-container">
                        {
                        uniqueLaunchYears.map((year) => {
                          return (
                            <Button
                              className="App-filter-button"
                              variant={
                                this.state.filters.launch_year ===
                                year.toString()
                                  ? "success"
                                  : "outline-success"
                              }
                              value={year}
                              onClick={(e) =>
                                this.updateApiFilters(
                                  "launch_year",
                                  e.target.value
                                )
                              }
                            >
                              {year}
                            </Button>
                          );
                        })}
                      </div>
                    </Row> :
                    null }
                   

                    <Card.Text className="App-filter-heading">
                       Launch  <span className="Launchbtn" color="primary"  onClick={() => {this.toggle(this.state.isLaunchOpen,"launch")}} style={{ marginBottom: '1rem' }}><IoIosArrowDropdown/></span>
                      <hr className="App-filters-hr" />
                    </Card.Text>
                    {this.state.isLaunchOpen ?
                    <div className="App-filter-button-container">
                      <Button
                        className="App-filter-button"
                        variant={
                          this.state.filters.launch_success === "true"
                            ? "success"
                            : "outline-success"
                        }
                        onClick={(e) =>
                          this.updateApiFilters(
                            "launch_success",
                            e.target.value
                          )
                        }
                        value="true"
                      >
                        Success
                      </Button>

                      <Button
                        className="App-filter-button"
                        variant={
                          this.state.filters.launch_success === "false"
                            ? "success"
                            : "outline-success"
                        }
                        onClick={(e) =>
                          this.updateApiFilters(
                            "launch_success",
                            e.target.value
                          )
                        }
                        value="false"
                      >
                        Failure
                      </Button>
                    </div>
                    : null}


                    <Card.Text className="App-filter-heading">
                       Landing<span className="Yearbtn" color="primary"  onClick={() => {this.toggle(this.state.isLandOpen,"land")}} style={{ marginBottom: '1rem' }}><IoIosArrowDropdown/></span>
                      <hr className="App-filters-hr" />
                    </Card.Text>
                        
                    {this.state.isLandOpen ?
                    <div className="App-filter-button-container">
                      <Button
                        className="App-filter-button"
                        variant={
                          this.state.filters.land_success === "true"
                            ? "success"
                            : "outline-success"
                        }
                        onClick={(e) =>
                          this.updateApiFilters("land_success", e.target.value)
                        }
                        value="true"
                      >
                       Success
                      </Button>

                      <Button
                        className="App-filter-button"
                        variant={
                          this.state.filters.land_success === "false"
                            ? "success"
                            : "outline-success"
                        }
                        onClick={(e) =>
                          this.updateApiFilters("land_success", e.target.value)
                        }
                        value="false"
                      >
                        Failure
                      </Button>
                    </div>
                  :null}
                  </div>:null}
                  </Card.Body>
                </Card>

              </Col>

              <Col xs={12} sm={12} md={6} lg={9}>
                <Row>
                  {data.map((details) => {
                    return (
                      <Col md={12} lg={4}>
                        <RocketLaunchDetails details={details} />
                      </Col>
                    );
                  })}
                </Row>
              </Col>
            </Row>
            <div>
              <h5 className="App-Developers-name">
               Shivang Gupta
              </h5>
            </div>
          </Container>
        </div>
      );
    }

  }
}

export default App;
