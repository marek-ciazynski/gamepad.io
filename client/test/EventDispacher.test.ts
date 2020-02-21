import EventDispatcher from "../EventDispatcher"
import { doesNotMatch } from "assert"

describe('EventDispatcher', () => {
	it('constructs', () => {
		const dispatcher = new EventDispatcher(['foo', 'bar'])
		expect(dispatcher).toBeInstanceOf(EventDispatcher)
	})

	it('runs handlers', (done) => {
		const dispatcher = new EventDispatcher(['foo'])
		dispatcher.on('foo', (x: number) => {
			expect(x).toBe(42)
			done()
		})
		dispatcher.emit('foo', 42)
	})

	it('accepts multiple arguments in handler', (done) => {
		const dispatcher = new EventDispatcher(['foo'])
		dispatcher.on('foo', (x: number, y: string) => {
			expect(x).toBe(42)
			expect(y).toBe('bar')
			done()
		})
		dispatcher.emit('foo', 42, 'bar')
	})

	it('throws exception on emiting unregistered event name', () => {
		const dispatcher = new EventDispatcher(['foo'])
		expect(() => dispatcher.emit('bar', 42)).toThrow()
	})

	it('throws exception on off\'ing unregistered event name', () => {
		const dispatcher = new EventDispatcher(['foo'])
		expect(() => dispatcher.off('bar')).toThrow()
	})

	it('throws exception on handling unregistered event name', () => {
		const dispatcher = new EventDispatcher(['foo'])
		const callbackMock = jest.fn()
		expect(() => dispatcher.on('bar', callbackMock)).toThrow()
		expect(callbackMock.mock.calls.length).toBe(0)
	})

	it('removes one handler', () => {
		jest.useFakeTimers()
		const dispatcher = new EventDispatcher(['foo'])
		const callbackMock = jest.fn()
		const callbackMock2 = jest.fn()
		dispatcher.on('foo', callbackMock)
		dispatcher.on('foo', callbackMock2)
		dispatcher.off('foo', callbackMock)
		dispatcher.emit('foo', 42)
		jest.runAllTimers()
		expect(setTimeout).toBeCalledTimes(1)
		expect(callbackMock.mock.calls.length).toBe(0)
		expect(callbackMock2.mock.calls.length).toBe(1)
		jest.useRealTimers()
	})

	it('removes all handlers', () => {
		jest.useFakeTimers()
		const dispatcher = new EventDispatcher(['foo'])
		const callbackMock = jest.fn()
		const callbackMock2 = jest.fn()
		dispatcher.on('foo', callbackMock)
		dispatcher.on('foo', callbackMock2)
		dispatcher.off('foo')
		dispatcher.emit('foo', 42)
		jest.runAllTimers()
		expect(setTimeout).toBeCalledTimes(0)
		expect(callbackMock.mock.calls.length).toBe(0)
		expect(callbackMock2.mock.calls.length).toBe(0)
		jest.useRealTimers()
	})
})
