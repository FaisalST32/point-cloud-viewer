import * as THREE from 'three';
import { PCDLoader as ThreePCDLoader } from 'three/examples/jsm/loaders/PCDLoader';

export class PCDLoader {
	scene: THREE.Scene;
	loader: ThreePCDLoader;
	constructor(scene: THREE.Scene) {
		this.scene = scene;
		this.loader = new ThreePCDLoader();
	}

	async loadAsync(url: string): Promise<THREE.Points> {
		return new Promise((res, rej) => {
			this.loader.load(url, (points) => {
				console.log(points);
				res(points);
			});
		});
	}

	async loadManyAsync(urls: string[]): Promise<THREE.Points[]> {
		const promises = urls.map(
			(url) =>
				new Promise<THREE.Points>((res, rej) => {
					this.loader.load(url, (points) => {
						res(points);
					});
				})
		);

		const points: THREE.Points[] = await Promise.all(promises);
		points.forEach((p) => {
			this.scene.add(p);
		});

		return points;
	}
}
