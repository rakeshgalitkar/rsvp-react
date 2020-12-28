import React from "react";
import style from "styled-components";
import {
  Container,
  ListGroup,
  Form,
  Modal,
  Button,
  Row,
  Col,
} from "react-bootstrap";

const ListingContainer = style.div`

display:flex;
overflow:hidden;

.listing {
    text-align:left;
    cursor:pointer;
}

.listing:hover {
    color:blue;
}

.listing span {
    font-size:12px;
    padding: 0 10px;
}
`;

class Listing extends React.Component {
  static getDerivedStateFromProps(props, state) {
    if (!state._data.length) {
      return {
        list: JSON.parse(JSON.stringify(props.userList)),
        _data: JSON.parse(JSON.stringify(props.userList)),
      };
    }

    return null;
  }

  state = {
    list: [],
    _data: [],
    searchText: "",
    showDetails: false,
    currentUser: null,
  };

  _onSearch = (e) => {
    let filterList = [];
    if (e.target.value) {
      filterList = this.state._data.filter((item) => {
        return (
          item.name
            .toLocaleLowerCase()
            .indexOf(e.target.value.toLocaleLowerCase()) > -1 ||
          item.locality
            .toLocaleLowerCase()
            .indexOf(e.target.value.toLocaleLowerCase()) > -1
        );
      });
    } else {
      filterList = JSON.parse(JSON.stringify(this.state._data));
    }

    this.setState({ list: filterList });
  };

  showUserDetails = (user) => {
    //show popup with user details
    this.setState({ showDetails: true, currentUser: user });
  };

  handleClose = () => {
    this.setState({ showDetails: false });
  };

  getModalBody = () => {
    const { currentUser } = this.state;
    return this.state.currentUser ? (
      <div>
        <Row>
          <Col>Name:</Col>
          <Col>{this.state.currentUser.name}</Col>
        </Row>
        <Row>
          <Col>Locality:</Col>
          <Col>{currentUser.locality}</Col>
        </Row>
        <Row>
          <Col>Date of birth:</Col>
          <Col>{currentUser.dob}</Col>
        </Row>
        <Row>
          <Col>Profession:</Col>
          <Col>{currentUser.profession}</Col>
        </Row>
        <Row>
          <Col>Number of guests:</Col>
          <Col>{currentUser.num_of_guests}</Col>
        </Row>
        <Row>
          <Col>Address:</Col>
          <Col>{currentUser.address}</Col>
        </Row>
      </div>
    ) : (
      "No data found"
    );
  };

  render() {
    return (
      <ListingContainer>
        <Modal show={this.state.showDetails} onHide={this.handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>User Details</Modal.Title>
          </Modal.Header>
          <Modal.Body>{this.getModalBody()}</Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={this.handleClose}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>

        <Container>
          <Form>
            <Form.Group controlId="formBasicEmail">
              <Form.Label>Search</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter name or locality"
                onChange={this._onSearch}
              />
              <div>Total {this.state.list.length} records found</div>
            </Form.Group>
          </Form>

          <ListGroup>
            {this.state.list &&
              this.state.list.map((item) => {
                return (
                  <ListGroup.Item key={item.id}>
                    <div
                      className="listing"
                      onClick={() => {
                        this.showUserDetails(item);
                      }}
                    >
                      <div>{item.name}</div>
                      <div>
                        <span>
                          Locality : <span>{item.locality}</span>
                        </span>
                        <span>
                          Date of Birth : <span>{item.dob}</span>
                        </span>
                      </div>
                      <div></div>
                    </div>
                  </ListGroup.Item>
                );
              })}
          </ListGroup>
        </Container>
      </ListingContainer>
    );
  }
}

export default Listing;
