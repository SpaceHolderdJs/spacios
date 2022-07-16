import * as THREE from "three";
import gsap from "gsap";
import { PointLight } from "three";

const scene = () => {
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
  );

  scene.background = new THREE.Color("black");

  const renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.domElement.className = "scene";
  document.body.appendChild(renderer.domElement);

  const ReactLogoObject = new THREE.Object3D();
  scene.add(ReactLogoObject);

  const generateReactLogo = () => {
    const torusBox = [];
    const lightsBox = [];
    const torusRotations = [
      { x: 1.5, y: 0, z: 0 },
      { x: 1.3, y: 2, z: 0 },
      { x: 1.3, y: -2, z: 0 },
    ];

    for (let i = 0; i < 3; i++) {
      const TorusGeometry = new THREE.TorusGeometry(10, 0.15, 5, 100, 10);
      const TorusMaterial = new THREE.MeshStandardMaterial({
        color: 0x7bccea,
        metalness: 0.7,
        roughness: 0.2,
        displacementScale: 0,
      });

      const torus = new THREE.Mesh(TorusGeometry, TorusMaterial);
      torus.name = `torus${i}`;
      const { x, y, z } = torusRotations[i];

      const light = new PointLight(0x7bccea, 1, 100);
      torus.add(light);
      lightsBox.push(light);

      light.position.set(i, 5, 0);

      torus.rotation.set(x, y, z);
      ReactLogoObject.add(torus);
      torusBox.push(torus);
    }
    const geometry = new THREE.SphereGeometry(1.5, 32, 16);
    const material = new THREE.MeshStandardMaterial({
      color: "white",
      metalness: 0.9,
      roughness: 0.2,
    });

    const sphereLight = new THREE.PointLight("white", 3, 100);

    const sphere = new THREE.Mesh(geometry, material);
    sphere.add(sphereLight);
    sphere.name = "sphere";
    ReactLogoObject.add(sphere);

    return { torusBox, lightsBox };
  };

  const { torusBox, lightsBox } = generateReactLogo();

  const starsObject = new THREE.Object3D();
  scene.add(starsObject);

  const generateStars = (quantity: number) => {
    for (let i = 0; i < quantity; i++) {
      const geometry = new THREE.SphereGeometry(Math.random() * 0.1, 32, 16);
      const material = new THREE.MeshBasicMaterial({
        color: "white",
      });
      const star = new THREE.Mesh(geometry, material);
      star.position.set(
        Math.random() * 50 - Math.random() * 50,
        Math.random() * 50 - Math.random() * 50,
        Math.random() * 50 - Math.random() * 50
      );
      starsObject.add(star);
    }
  };

  generateStars(150);

  camera.position.z = 20;

  window.addEventListener("click", () => {
    lightsBox.forEach((light) => {
      gsap.fromTo(light, { intensity: 1 }, { intensity: 15 }).duration(1.5);
      gsap.fromTo(light, { intensity: 15 }, { intensity: 1, delay: 3 });
    });

    // torusBox.forEach((torus) => {
    //   gsap.fromTo(torus.geometry.parameters, { arc: 10 }, { arc: 1.5 });
    //   torus.updateMatrixWorld();
    //   gsap.fromTo(
    //     torus.geometry.parameters,
    //     { arc: 1.5 },
    //     { arc: 10, delay: 3 }
    //   );

    //   torus.updateMatrixWorld();
    // });
  });

  function animate() {
    requestAnimationFrame(animate);

    ReactLogoObject.rotation.x = starsObject.rotation.x += 0.005;
    ReactLogoObject.rotation.y = starsObject.rotation.y += 0.005;

    renderer.render(scene, camera);
  }

  animate();
};

export default scene;
