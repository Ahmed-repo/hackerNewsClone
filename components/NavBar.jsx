import React, { useState } from "react";
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Form,
  Button,
} from "reactstrap";

const NavBar = ({
  setQuery,
  setChangeColor,
  changeColor,
  setSearch,
  query,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);
  const clickform = (e) => {
    e.preventDefault();
    setSearch(query);
    setQuery(" ");
  };
  const onChangeMethod = (e) => {
    setQuery(e.target.value);
  };

  return (
    <div>
      <Navbar light expand="md" className="navbar">
        <NavbarBrand className="navbarBrand" href="/">
          HackerNewsClone
        </NavbarBrand>
        <Form className="d-flex" onSubmit={clickform}>
          <input
            onChange={onChangeMethod}
            type="text"
            placeholder="Search"
            className="mr-2"
            aria-label="Search"
          />
          <Button type="submit" variant="outline-success">
            Search
          </Button>
        </Form>
        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar>
          <Nav className="mr-auto" navbar>
            <NavItem>
              <NavLink href="https://github.com/Ahmed-repo?tab=repositories">
                GitHub
              </NavLink>
            </NavItem>
            <UncontrolledDropdown nav inNavbar>
              <DropdownToggle nav caret>
                Options
              </DropdownToggle>
              <DropdownMenu right>
                <DropdownItem></DropdownItem>
                <DropdownItem
                  onClick={() => {
                    setChangeColor(setChangeColor(!changeColor));
                  }}
                  className="option1"
                >
                  Dark mode
                </DropdownItem>
                <DropdownItem
                  onClick={() => {
                    setChangeColor(!changeColor);
                  }}
                >
                  Light mode
                </DropdownItem>
                <DropdownItem divider />
                <DropdownItem>Reset</DropdownItem>
              </DropdownMenu>
            </UncontrolledDropdown>
          </Nav>
        </Collapse>
      </Navbar>
    </div>
  );
};

export default NavBar;
