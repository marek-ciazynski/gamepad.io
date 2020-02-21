import io from 'socket.io-client';
import EventDispatcher from './EventDispatcher';

class GameServer extends EventDispatcher {
	url: String;
	socket: any;	

	constructor(url: String) {
		super([
			'player-connected',
			'player-disconnected',
		]);
		
		this.url = url;
	}
}
