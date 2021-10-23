import * as THREE from 'three';
import { PCDLoader as ThreePCDLoader } from 'three/examples/jsm/loaders/PCDLoader';

export class PCDLoader {
	private scene: THREE.Scene;
	private loader: ThreePCDLoader;
	private pointClouds: THREE.Points[];
	private currentPC?: THREE.Points;
	private mode: 'aggregate' | 'single' = 'single';

	constructor(scene: THREE.Scene) {
		this.scene = scene;
		this.loader = new ThreePCDLoader();
		this.addEventListeners();
	}

	async loadAsync(url: string): Promise<THREE.Points> {
		return new Promise((res, rej) => {
			this.loader.load(url, (points) => {
				console.log(points);
				res(points);
			});
		});
	}

	async loadManyAsync(urls: string[]): Promise<number> {
		const promises = urls.map(
			(url) =>
				new Promise<THREE.Points>((res, rej) => {
					this.loader.load(url, (points) => {
						res(points);
					});
				})
		);

		this.pointClouds = await Promise.all(promises);
		this.renderPC(this.pointClouds[0]);
		return this.pointClouds.length;
	}

	prevPC() {
		if (!this.pointClouds?.length || this.mode === 'aggregate') {
			return;
		}

		const currentPCIndex = this.pointClouds.indexOf(this.currentPC!);
		const isFirstPC = currentPCIndex === 0;
		const prevIndex = isFirstPC
			? this.pointClouds.length - 1
			: currentPCIndex - 1;
		this.renderPC(this.pointClouds[prevIndex]);
	}

	nextPC() {
		if (!this.pointClouds?.length || this.mode === 'aggregate') {
			return;
		}

		const currentPCIndex = this.pointClouds.indexOf(this.currentPC!);
		const isFinalPC = currentPCIndex === this.pointClouds.length - 1;
		const nextIndex = isFinalPC ? 0 : currentPCIndex + 1;
		this.renderPC(this.pointClouds[nextIndex]);
	}

	private async renderPC(points: THREE.Points) {
		if (this.currentPC) {
			this.scene.remove(this.currentPC);
		}
		this.currentPC = points;
		this.scene.add(this.currentPC);
	}

	private addEventListeners() {
		document.addEventListener(
			'keyup',
			this.addNavigationKeysListeners.bind(this)
		);
	}

	private aggregatePoints() {
		if (this.currentPC) {
			this.scene.remove(this.currentPC);
			this.currentPC = undefined;
		}

		this.pointClouds.forEach((pc) => this.scene.add(pc));
	}

	private splitFrames() {
		this.pointClouds.forEach((pc) => this.scene.remove(pc));
		this.renderPC(this.pointClouds[0]);
	}

	private addNavigationKeysListeners(e: KeyboardEvent) {
		switch (e.key.toLowerCase()) {
			case 'arrowleft':
				this.prevPC();
				break;
			case 'arrowright':
				this.nextPC();
				break;
			case 'a':
				this.aggregatePoints();
				break;
			case 'escape':
				this.splitFrames();
				break;
			default:
				break;
		}
	}
}
