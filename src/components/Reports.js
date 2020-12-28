import React from "react";
import style from "styled-components";
import { Container, Row, Col, Modal, Form, Card } from "react-bootstrap";

const ReportsContainer = style.div`

display:flex;
justify-content: space-between;
flex-wrap: wrap;

.Row {
  border: 1px solid #EFEFEF;
    text-align: left;
    margin: 10px;
    font-size: 14px;
    flex-direction: column;
    justify-content: space-between;
    display: flex;
    min-width: 250px;
}

.title {
  text-align: center;
  font-weight: bold;
  padding: 10px 0;
  background: #007bfe;
  margin-bottom: 10px;
  color:#fff;
}

.box {
  display: flex;
  flex-direction: column;
  font-size: 12px;
  padding: 10px;
}

.content {
  display:flex;
}

.content div {
  margin-bottom:5px;
  flex:1;
}

.report {
  text-align: left;
  font-weight: bold;
  padding: 10px 0;
  background: #23374c;
  color:#fff;
  padding-left:5px;
  margin-top: 5px;
}

.listing span {
    font-size:12px;
    padding: 0 10px;
}
`;

class Reports extends React.Component {
  state = {
    gtAge: "",
    ltAge: "",
    reportByAge: "",
    reportByLocality: "",
    reportByGroupSize: "",
    reportByProgession: "",
    list: [],
    _data: [],
  };

  static getDerivedStateFromProps(props, state) {
    if (!state._data.length) {
      return {
        list: JSON.parse(JSON.stringify(props.userList)),
        _data: JSON.parse(JSON.stringify(props.userList)),
      };
    }
    return null;
  }

  calculateAge = (birthday) => {
    // birthday is a date
    var ageDifMs = Date.now() - new Date(birthday);
    var ageDate = new Date(ageDifMs); // miliseconds from epoch
    return Math.abs(ageDate.getUTCFullYear() - 1970);
  };

  getLocalitySet = () => {
    const localitySet = [];
    if (this.state._data.length) {
      for (let i in this.state._data) {
        if (localitySet.length) {
          if (localitySet.indexOf(this.state._data[i].locality) === -1) {
            localitySet.push(this.state._data[i].locality);
          }
        } else {
          localitySet.push(this.state._data[i].locality);
        }
      }
    }
    return localitySet;
  };

  byAgeReport = (e) => {
    let gtAge = parseInt(this.state.gtAge);
    let ltAge = parseInt(this.state.ltAge);

    if (e.target.name === "gtAge" && e.target.value >= 0) {
      this.setState({ gtAge: e.target.value });
      gtAge = parseInt(e.target.value);
    }

    if (e.target.name === "ltAge" && e.target.value >= 0) {
      this.setState({ ltAge: e.target.value });
      ltAge = parseInt(e.target.value);
    }

    if (gtAge && ltAge) {
      if (gtAge < ltAge) {
        const filterList = this.state._data.filter((item) => {
          const age = this.calculateAge(item.dob);
          return age < ltAge && age > gtAge;
        });

        this.setState({ reportByAge: filterList.length });
      } else {
        this.setState({ reportByAge: "" });
      }
    } else if (gtAge && !ltAge) {
      //find records having only age greater than
      const filterList = this.state._data.filter((item) => {
        const age = this.calculateAge(item.dob);
        return age > gtAge;
      });
      this.setState({ reportByAge: filterList.length });
    } else if (!gtAge && ltAge) {
      //find records having only age less than
      const filterList = this.state._data.filter((item) => {
        const age = this.calculateAge(item.dob);
        return age < ltAge;
      });
      this.setState({ reportByAge: filterList.length });
    }
  };

  byLocality = (e) => {
    if (e.target.value) {
      const filterList = this.state._data.filter((item) => {
        return e.target.value === item.locality;
      });

      this.setState({ reportByLocality: filterList.length });
    } else {
      this.setState({ reportByLocality: "" });
    }
  };

  byGroupSize = (e) => {
    if (e.target.value) {
      const filterList = this.state._data.filter((item) => {
        return parseInt(e.target.value) === parseInt(item.num_of_guests) + 1;
      });

      this.setState({ reportByGroupSize: filterList.length });
    } else {
      this.setState({ reportByGroupSize: "" });
    }
  };

  byProfession = (e) => {
    if (e.target.value) {
      const filterList = this.state._data.filter((item) => {
        return e.target.value === item.profession;
      });

      this.setState({ reportByProgession: filterList.length });
    } else {
      this.setState({ reportByProgession: "" });
    }
  };

  render() {
    return (
      <ReportsContainer>
        <div className="Row">
          <div className="title">Report by Age</div>
          <div className="box">
            <div className="content">
              <div>Greater than :</div>
              <div>
                <input
                  type="number"
                  name="gtAge"
                  value={this.state.gtAge}
                  onChange={this.byAgeReport}
                />
              </div>
            </div>
            <div className="content">
              <div>Less than :</div>
              <div>
                <input
                  type="number"
                  name="ltAge"
                  value={this.state.ltAge}
                  onChange={this.byAgeReport}
                />
              </div>
            </div>
          </div>
          <div className="report">
            Number of people : {this.state.reportByAge}
          </div>
        </div>

        <div className="Row">
          <div className="title">Report by locality</div>
          <div className="box">
            <div>
              Find report by locality <br />
              <select onChange={this.byLocality}>
                <option value="">Select locality</option>
                {this.getLocalitySet().map((locality) => {
                  return (
                    <option value={locality} key={locality}>
                      {locality}
                    </option>
                  );
                })}
              </select>
            </div>
          </div>
          <div className="report">
            Number of people : {this.state.reportByLocality}
          </div>
        </div>

        <div className="Row">
          <div className="title">Report by group size</div>
          <div className="box">
            <div>
              Find report by group size <br />
              <select onChange={this.byGroupSize}>
                <option value="">Select group size</option>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
              </select>
            </div>
          </div>
          <div className="report">
            Number of people : {this.state.reportByGroupSize}
          </div>
        </div>

        <div className="Row">
          <div className="title">Report by profession</div>
          <div className="box">
            <div>
              Find report by profession <br />
              <select onChange={this.byProfession}>
                <option value="">Select Profession</option>
                <option value="employee">Employee</option>
                <option value="student">Student</option>
              </select>
            </div>
          </div>
          <div className="report">
            Number of people : {this.state.reportByProgession}
          </div>
        </div>
      </ReportsContainer>
    );
  }
}

export default Reports;
