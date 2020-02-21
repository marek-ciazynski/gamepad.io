export default class EventDispatcher {
	private events: Map<String, Function[]>;

	constructor(eventNames: String[]) {
		this.events = new Map();
		for (const eventName of eventNames) {
			this.events.set(eventName, []);
		}
	}

	on(eventName: String, callback: Function) {
		const handlers = this.events.get(eventName);
		if (handlers === undefined)
			throw Error('Event not registered')

		handlers.push(callback)
	}

	off(eventName: String, callback?: Function) {
		const handlers = this.events.get(eventName);
		if (handlers === undefined)
			throw Error('Event not registered')

		if (!callback) {
			this.events.set(eventName, [])
		} else {
			const filtered = handlers.filter(cb => cb !== callback);
			this.events.set(eventName, filtered);
		}
	}

	emit(eventName: String, ...args: any[]) {
		const handlers = this.events.get(eventName);
		if (handlers === undefined)
			throw Error('Event not registered')

		for (const handler of handlers) {
			setTimeout(handler.bind(this, ...args), 0)
		}
	}
}
