import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { PCDLoader } from './PCDLoader';

let scene = new THREE.Scene();

let camera = new THREE.PerspectiveCamera(
	50,
	window.innerWidth / window.innerHeight,
	0.1,
	2000
);

let renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

camera.position.z = 200;
camera.position.y = 50;
let controls = new OrbitControls(camera, renderer.domElement);

function render() {
	renderer.render(scene, camera);
}

function animate() {
	render();
	requestAnimationFrame(animate);
}

// let mesh = new THREE.Mesh(
// 	new THREE.BoxGeometry(1, 1, 1),
// 	new THREE.MeshBasicMaterial()
// );

// scene.add(mesh);

let axes = new THREE.AxesHelper(10);
scene.add(axes);

const pcdLoader = new PCDLoader(scene);
pcdLoader.loadManyAsync([
	'./data/scan_000.pcd',
	'./data/scan_001.pcd',
	'./data/scan_002.pcd',
	'./data/scan_003.pcd',
	'./data/scan_004.pcd',
	'./data/scan_005.pcd',
	'./data/scan_006.pcd',
	'./data/scan_007.pcd',
	'./data/scan_008.pcd',
	'./data/scan_009.pcd',
	'./data/scan_010.pcd',
	'./data/scan_011.pcd',
	'./data/scan_012.pcd',
]);
// pcdLoader.loadAsync('./data/scan_000.pcd').then((points) => scene.add(points));

animate();
