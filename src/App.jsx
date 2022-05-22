import React, { useRef, useState, useEffect } from "react";
import "./App.scss";
import NavBar from "./components/NavBar.jsx";
import List from "./components/List.jsx";
import { Canvas, useFrame } from "react-three-fiber";
import axios from "axios";
import Pagination from "./components/Pagination";
import { OrbitControls, Stars } from "@react-three/drei";
import { useSpring, a } from "@react-spring/three";
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";

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
// chached
const QuantumCube = () => {
  const [model, setModel] = useState();
  useEffect(() => {
    new GLTFLoader().load("/scene.gltf", setModel);
  }, []);

  return model ? <primitive object={model.scene} /> : null;
};

function App() {
  const [user, setUser] = useState([]);
  const [query, setQuery] = useState("");
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(5);
  const [changecolor, setChangeColor] = useState(false);

  useEffect(() => {
    fetchdata();
  }, [search]);
  const fetchdata = async () => {
    setLoading(true);
    await axios
      .get(`https://hn.algolia.com/api/v1/search?query=${search}`)
      .then((response) => setUser(response.data.hits));

    setLoading(false);
  };

  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = user.slice(indexOfFirstPost, indexOfLastPost);

  // Change page paginate
  const paginate = (pageNumbers) => {
    setCurrentPage(pageNumbers);
  };

  return (
    <div className={changecolor ? "blue" : "black"}>
      <NavBar
        setQuery={setQuery}
        query={query}
        loading={loading}
        setChangeColor={setChangeColor}
        changecolor={changecolor}
        setSearch={setSearch}
      />

      <Canvas
        shadowMap
        colorManagement
        camera={{ position: [-1, 2, 10], fov: 60 }}
        onCreated={({ gl }) => {
          gl.shadowMap.enabled = true;
          gl.shadowMap.type = THREE.PCFSoftShadowMap;
        }}
      >
        <ambientLight intensity={0.5} />
        <directionalLight
          castShadow
          position={(0, 10, 0)}
          intensity={0.5}
          shadow-mapSize-width={1024}
          shadow-mapSize-height={1024}
          shadow-camera-far={50}
          shadow-camera-left={-10}
          shadow-camera-right={10}
          shadow-camera-top={10}
          shadow-camera-bottom={-10}
        />
        <spotLight position={[1, 5, 10]} intensity={0.5} />
        <pointLight position={[-10, 0, -20]} intensity={1} />
        <pointLight position={[0, -10, 0]} intensity={0.5} />

        <Stars
          radius={100} // Radius of the inner sphere (default=100)
          depth={50} // Depth of area where stars should fit (default=50)
          count={5000} // Amount of stars (default=5000)
          factor={5} // Size factor (default=4)
          saturation={0.3} // Saturation 0-1 (default=0)
          fade // Faded dots (default=false)
        />
        <QuantumCube />

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
    </div>
  );
}

export default App;
