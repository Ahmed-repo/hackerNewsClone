import React from "react";
import { ListGroup, ListGroupItem } from "reactstrap";

const List = ({ user, loading }) => {
  return loading ? (
    <h1>loading..</h1>
  ) : (
    <ListGroup className="list_group">
      {user.map((user) => {
        return (
          <>
            <ListGroupItem tag="a" href="#" className="list-group-item">
              {" "}
              {user.title}
            </ListGroupItem>
          </>
        );
      })}
    </ListGroup>
  );
};

export default List;
