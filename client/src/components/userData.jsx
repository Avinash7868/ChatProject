import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUsers } from "../store/slice/userSlice";
import "./../assets/userData.css";
import { Link } from "react-router-dom";

const UserData = () => {
  const dispatch = useDispatch();
  const { data, loading, error } = useSelector((state) => state.user);

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }
  console.log(data);

  return (
    <div>
      <div>
        <h2>
          <Link to="http://localhost:5173/Chathome" className="link">
            Home
          </Link>
        </h2>{" "}
        <h1>User Data</h1>
      </div>

      <div className="userTableContainer">
        <table className="table">
          <thead className="tableHead">
            <tr className="tableHeadRow">
              <th>Indexing</th>
              <th>Email</th>
              <th>Name</th>
              <th>Password</th>
            </tr>
          </thead>
          <tbody className="tableBody">
            {data.map((user, id) => (
              <tr key={id} className="tableBodyRow">
                <td>{id + 1}</td>
                <td>{user.email}</td>
                <td>{user.name}</td>
                <td>{user.password}</td>
              </tr>
            ))}
          </tbody>
        </table>{" "}
      </div>
    </div>
  );
};

export default UserData;
