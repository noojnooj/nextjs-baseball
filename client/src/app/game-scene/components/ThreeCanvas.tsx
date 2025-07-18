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
  const aspect = mount.clientWidth / mount.clientHeight;
  const d = 10;
  const camera = new THREE.OrthographicCamera(
    -d * aspect, d * aspect, d, -d, 1, 1000
  );
  // 스타듀밸리식 탑다운 + 살짝 경사진 시점
  camera.position.set(0, 20, 10); // 위에서 내려다보면서 약간 앞을 봄
  camera.lookAt(0, 0, 0); // 중심 바라보기

  const renderer = new THREE.WebGLRenderer();
  renderer.setSize(mount.clientWidth, mount.clientHeight);
  mount.appendChild(renderer.domElement);

  const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
  const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
  directionalLight.position.set(10, 20, 10);
  scene.add(ambientLight);
  scene.add(directionalLight);

  // 격자 바닥 생성 (단일 ground 텍스처 타일)
  const loader = new THREE.TextureLoader();
  const ground = loader.load('/textures/tiles/grass.png');
  ground.magFilter = THREE.NearestFilter;

  for (let x = -8; x <= 8; x++) {
    for (let z = -8; z <= 8; z++) {
      const tile = new THREE.Mesh(
        new THREE.PlaneGeometry(2, 2),
        new THREE.MeshStandardMaterial({ map: ground })
      );
      tile.rotation.x = -Math.PI / 4;
      tile.position.set(x, 0, z);
      scene.add(tile);
    }
  }

  // Direction to folder mapping
  const directionFolders = {
    downLeft: 'Freya_Walk_Down_Left',
    downRight: 'Freya_Walk_Down_Right',
    upLeft: 'Freya_Walk_Up_Left',
    upRight: 'Freya_Walk_Up_Right',
  };

  const textureMap: Record<string, THREE.Texture[]> = {};
  const frameCount = 10;

  // Preload textures for all directions
  Object.entries(directionFolders).forEach(([key, folder]) => {
    textureMap[key] = [];
    for (let i = 1; i <= frameCount; i++) {
      const tex = loader.load(`/textures/Walk/${folder}/${folder}${i}.png`);
      tex.magFilter = THREE.NearestFilter;
      textureMap[key].push(tex);
    }
  });

  // Character creation with initial downLeft texture
  const character = new THREE.Mesh(
    new THREE.PlaneGeometry(1, 1.5),
    new THREE.MeshBasicMaterial({
      map: textureMap['downLeft'][0],
      transparent: true,
      side: THREE.DoubleSide,
    })
  );
  character.position.set(0, 1.5, 0);
  character.rotation.x = -Math.PI / 4;
  scene.add(character);

  // 건물
  const buildingTexture = loader.load('/textures/buildings/stadium.png');
  buildingTexture.magFilter = THREE.NearestFilter;
  buildingTexture.wrapS = THREE.ClampToEdgeWrapping;
  buildingTexture.wrapT = THREE.ClampToEdgeWrapping;
  // 타입 오류 우회를 위해 실제 값(3001) 직접 할당
  (buildingTexture as any).encoding = 3001; // THREE.sRGBEncoding
  const building = new THREE.Mesh(
    new THREE.PlaneGeometry(6, 5),
    new THREE.MeshBasicMaterial({
      map: buildingTexture,
      transparent: true,
      color: 0xffffff
    })
  );
  building.position.set(-5, 2.5, -5);
  building.rotation.x = -Math.PI / 4; // 스타듀밸리식 기울기
  scene.add(building);



  let hasRedirected = false;

  // Helpers to manage animation frame
  let frameIndex = 0;
  let frameTick = 0;

  const getDirection = () => {
    if (movement.left && movement.down) return 'downLeft';
    if (movement.right && movement.down) return 'downRight';
    if (movement.left && movement.up) return 'upLeft';
    if (movement.right && movement.up) return 'upRight';
    return null;
  };

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

    const dir = getDirection();
    const textures = dir ? textureMap[dir] : null;

    frameTick++;
    if (textures && frameTick % 10 === 0) {
      frameIndex = (frameIndex + 1) % textures.length;
      (character.material as THREE.MeshBasicMaterial).map = textures[frameIndex];
    }

  const characterBox = new THREE.Box3().setFromObject(character);
  const buildingBox = new THREE.Box3().setFromObject(building);

   if (!hasRedirected && characterBox.intersectsBox(buildingBox)) {
    hasRedirected = true;
    router.push('/home-scene');
   }
    
    camera.position.set(character.position.x, 20, character.position.z + 10);
    camera.lookAt(character.position);

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