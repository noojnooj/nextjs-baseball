import { useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import * as THREE from 'three';
import { useMovement } from '../hooks/useMovement';

export default function ThreeCanvas() {
  const mountRef = useRef<HTMLDivElement>(null);
  const movement = useMovement();
  const router = useRouter();


useEffect(() => {
  const mount = mountRef.current!;
  const scene = new THREE.Scene();
  scene.background = new THREE.Color(0xa0d0f0);
  const camera = new THREE.PerspectiveCamera(
    60, // 시야각
    mount.clientWidth / mount.clientHeight, // 종횡비
    0.1, // near
    1000 // far
  );
  camera.position.set(10, 10, 10);
  camera.lookAt(0, 0, 0); // 중심바라보기

  const renderer = new THREE.WebGLRenderer();
  renderer.setSize(mount.clientWidth, mount.clientHeight);
  mount.appendChild(renderer.domElement);

  const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
  const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
  directionalLight.position.set(10, 20, 10);
  scene.add(ambientLight);
  scene.add(directionalLight);

  // 격자 바닥 생성
  for (let x = -8; x <= 8; x++) { // 바닥 타일 크기
    for (let z = -8; z <= 8; z++) { // 바닥 타일 크기
      const tile = new THREE.Mesh(
        new THREE.PlaneGeometry(1, 1),
        new THREE.MeshStandardMaterial({ color: 0x88cc88 })
      );
      tile.rotation.x = -Math.PI / 2;
      tile.position.set(x, 0, z);
      scene.add(tile);
    }
  }

  // 캐릭터
  const character = new THREE.Mesh(
    new THREE.BoxGeometry(0.5, 1, 0.5),
    new THREE.MeshStandardMaterial({ color: 0xff4444 })
  );
  character.position.set(0, 0.5, 0);
  scene.add(character);

  // 건물
  const building = new THREE.Mesh(
  new THREE.BoxGeometry(2, 5, 2), // 폭=2, 높이=5, 깊이=2
  new THREE.MeshStandardMaterial({ color: 0x888888 }) // 회색
);
  building.position.set(-5, 2.5, -5); // y는 높이의 절반 (바닥에 닿게)
  scene.add(building);



  let hasRedirected = false;

  const animate = () => {
    const speed = 0.05;
    const minX = -8, maxX = 8;
    const minZ = -8, maxZ = 8;
    const nextX = character.position.x + (movement.left ? -speed : movement.right ? speed : 0);
    const nextZ = character.position.z + (movement.up ? -speed : movement.down ? speed : 0);

    // 캐릭터가 바닥 영역을 벗어나지 못하게 이동 제한
    if (nextX >= minX && nextX <= maxX) {
      character.position.x = nextX;
    }
    if (nextZ >= minZ && nextZ <= maxZ) {
      character.position.z = nextZ;
    }

  const characterBox = new THREE.Box3().setFromObject(character);
  const buildingBox = new THREE.Box3().setFromObject(building);

   if (!hasRedirected && characterBox.intersectsBox(buildingBox)) {
    hasRedirected = true;
    router.push('/home-scene');
   }
    
    requestAnimationFrame(animate);
    renderer.render(scene, camera);
  };

  animate();

  return () => {
    mount.innerHTML = '';
  };
}, [movement]);

  return <div ref={mountRef} style={{ width: '100vw', height: '100vh' }} />;
}