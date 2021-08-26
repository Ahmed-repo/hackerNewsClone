import React from "react";
import { ListGroup, ListGroupItem } from "reactstrap";

const List = ({ user, loading }) => {
  return loading ? (
    <h1 className="loading">loading..</h1>
  ) : (
    <ListGroup className="list_group">
      {user.map((user) => {
        return (
          <>
            <ListGroupItem tag="a" href="#" className="list-group-item">
              {" "}
              {user.titl}
            </ListGroupItem>
          </>
        );
      })}
    </ListGroup>
  );
};

export default List;
