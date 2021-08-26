import React, { useRef, useState, useEffect, Suspense } from "react";
import "./App.scss";
import NavBar from "./components/NavBar.jsx";
import List from "./components/List.jsx";
import { Canvas, useFrame } from "react-three-fiber";
import axios from "axios";
import Pagination from "./components/Pagination";
import { OrbitControls } from "@react-three/drei";
import { useSpring, a } from "@react-spring/three";
import { Html } from "@react-three/drei";

const Spin = ({ position, args, color }) => {
  const mesh = useRef(null);
  const [changeSize, setChangeSize] = useState(false);

  const props = useSpring({
    scale: changeSize ? [1.4, 1.4, 1.4] : [1, 1, 1],
  });

  useFrame(() => (mesh.current.rotation.x = mesh.current.rotation.y += 0.01));
  return (
    <a.mesh
      onClick={() => setChangeSize(!changeSize)}
      scale={props.scale}
      castShadow
      position={position}
      ref={mesh}
    >
      <boxBufferGeometry attach="geometry" args={args} />
      <meshPhysicalMaterial attach="material" color={color} />
    </a.mesh>
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
      <Canvas
        shadowMap
        colorManagement
        camera={{ position: [-5, 2, 10], fov: 60 }}
      >
        <ambientLight intensity={1} />
        <directionalLight
          castShadow
          position={(0, 10, 0)}
          intensity={3}
          shadow-mapSize-width={1024}
          shadow-mapSize-height={1024}
          shadow-camera-far={50}
          shadow-camera-left={-10}
          shadow-camera-right={10}
          shadow-camera-top={10}
          shadow-camera-bottom={-10}
        />
        <spotLight position={[1, 5, 10]} intensity={2} />
        <pointLight position={[-10, 0, -20]} intensity={2} />
        <pointLight position={[0, -10, 0]} intensity={1.5} />
        <group>
          <mesh
            receiveShadow
            rotation={[-Math.PI / 2.2, 0, 0]}
            position={[0, -3, 0]}
          >
            <planeBufferGeometry attach="geometry" args={[100, 100]} />
            <meshPhysicalMaterial attach="material" color="" />
          </mesh>

          <Spin position={[0, -1, 1]} args={[2, 2, 2]} color="blue" />
          <Spin position={[-10, -1, -3]} color="green" />
          <Spin position={[5, 1, -5]} color="355070" />
          <Spin position={[1, -3, 3]} args={[2, 2, 2]} color="#808000" />
          <Spin position={[-8, -5, -4]} color="green" />
          <Spin position={[0, 6, -7]} color="red" />
          <Spin position={[0, -5, 1]} args={[5, 2, 1]} color="blue" />
          <Spin position={[-1, -1, -3]} color="green" />
          <Spin position={[1, 5, -5]} color="red" />
          <Spin position={[1, -3, 8]} args={[2, 2, 2]} color="#008020" />
          <Spin position={[-8, -5, -4]} color="green" />
          <Spin position={[0, 6, -7]} color="red" />
          <Spin position={[3, -1, 1]} args={[2, 2, 2]} color="#800000" />
          <Spin position={[-0, -2, -6]} color="green" />
          <Spin position={[5, 1, -5]} color="red" />
          <Spin position={[3, -4, 3]} args={[2, 2, 2]} color="blue" />
          <Spin position={[-5, -5, -4]} color="green" />
          <Spin position={[7, 6, -7]} color="red" />
          <Spin position={[5, -5, 1]} args={[2, 2, 2]} color="blue" />
          <Spin position={[-3, 5, -3]} color="green" />
          <Spin position={[4, 5, -5]} color="red" />
          <Spin position={[4, 5, -3]} args={[2, 2, 2]} color="#800000" />
          <Spin position={[-8, 5, -4]} color="green" />
          <Spin position={[0, 6, 7]} color="red" />
        </group>

        <OrbitControls autoRotate />
      </Canvas>

      <div className="container1">
        <List user={currentPosts} loading={loading} />
        <Pagination
          postsPerPage={postsPerPage}
          totalPosts={user.length}
          paginate={paginate}
        />
      </div>
    </>
  );
}

export default App;
