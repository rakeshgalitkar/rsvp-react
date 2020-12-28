import React from "react";
import style from "styled-components";
import { connect } from "react-redux";
import { getUsersRequest, usersError } from "../actions/users";
import { Nav, Navbar, Form, Container } from "react-bootstrap";
import Reports from "../components/Reports";
import Listing from "../components/Listing";

const AdminContainer = style.div`
display:flex;
flex-direction:column;
overflow:hidden;
`;

export class Admin extends React.Component {
  constructor(props) {
    super(props);
  }

  componentWillMount() {
    this.props.getUsersRequest();
  }

  state = {
    view: "listing",
    list: [],
  };

  render() {
    const userList =
      this.props.users && this.props.users.items ? this.props.users.items : [];

    return (
      <AdminContainer>
        <Navbar bg="primary" variant="dark">
          <Navbar.Brand href="/admin">Admin</Navbar.Brand>
          <Nav className="mr-auto">
            <Nav.Link
              href="#listing"
              onClick={() => {
                this.setState({ view: "listing" });
              }}
            >
              Listing
            </Nav.Link>
            <Nav.Link
              href="#reports"
              onClick={() => {
                this.setState({ view: "reports" });
              }}
            >
              Reports
            </Nav.Link>
          </Nav>
        </Navbar>
        <Container>
          {this.state.view === "listing" ? (
            <Listing userList={userList} />
          ) : (
            <Reports userList={userList} />
          )}
        </Container>
      </AdminContainer>
    );
  }
}

export default connect(({ users }) => ({ users }), {
  getUsersRequest,
  usersError,
})(Admin);
