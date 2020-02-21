import io from 'socket.io-client';
import EventDispatcher from './EventDispatcher';
import { CLIENT_RENEG_WINDOW } from 'tls';

export default class GameServer extends EventDispatcher {
	url: string;
	// players: Player[];

	connected: Promise<void>;
	private readonly socket: any;
	private _roomToken?: string = undefined;

	constructor(url: string) {
		// list of events
		super([
			'player-connected',
			'player-disconnected',
			'gamepad-event',
		]);
		
		this.url = url;

		// connect to 
		this.socket = io(url);
		this.connected = new Promise((resolve, reject) => {
			this.socket.once('connect', () => resolve());
			this.socket.once('connect_failed', () => reject());
		});
	}


	get roomToken() {
		return this._roomToken;
	}
}

// export in global scope
declare var window: any;
window.GameServer = GameServer
