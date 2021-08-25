import React, { useRef, useState, useEffect } from "react";
import "./App.scss";
import NavBar from "./components/NavBar.jsx";
import List from "./components/List.jsx";
import { Canvas, useFrame } from "react-three-fiber";
import axios from "axios";
import Pagination from "./components/Pagination";

const Spin = ({ position, args, color }) => {
  const mesh = useRef(null);
  useFrame(() => (mesh.current.rotation.x = mesh.current.rotation.y += 0.01));
  return (
    <mesh position={position} ref={mesh}>
      <boxBufferGeometry attach="geometry" args={args} />
      <meshPhysicalMaterial attach="material" color={color} />
    </mesh>
  );
};

function App() {
  const [user, setUser] = useState([]);
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(5);

  useEffect(() => {
    fetchdata();
  }, [query]);
  const fetchdata = async () => {
    setLoading(true);
    await axios
      .get(`https://hn.algolia.com/api/v1/search?query=${query}`)
      .then((response) => setUser(response.data.hits));

    setLoading(false);

    // setLoading(!loading);
  };

  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = user.slice(indexOfFirstPost, indexOfLastPost);

  // Change page paginate
  const paginate = (pageNumbers) => {
    setCurrentPage(pageNumbers);
  };

  return (
    <>
      <NavBar setQuery={setQuery} loading={loading} />
      <Canvas colorManagement={{ position: [-5, 2, 1], fov: 70 }}>
        <ambientLight intensity={1} />
        <spotLight position={(1, 5, 10)} intensity={3} />
        <Spin position={[0, 1, 0]} args={[2, 2, 2]} color="blue" />
        <Spin position={[-10, -1, -1]} color="green" />
        <Spin position={[5, 1, -2]} color="red" />
      </Canvas>
      <List user={currentPosts} loading={loading} />
      <Pagination
        postsPerPage={postsPerPage}
        totalPosts={user.length}
        paginate={paginate}
      />
    </>
  );
}

export default App;
