import React from "react";

const List = ({ user, loading }) => {
  return loading ? (
    <h1 className="loading">loading..</h1>
  ) : (
    <nav>
      <ul className="pagination" id="list-ul">
        {user.map((user) => (
          <li className="page-item" id="list-li">
            <a href="!#" className="page-link" id="list-li">
              {user.title}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default List;
