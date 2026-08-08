import { getMockEventById, loadMockEvents } from './event-mock.helpers';
import { MOCK_EVENTS } from './event-data.mock';

describe('event-mock.helpers', () => {
    describe('loadMockEvents', () => {
        it('should return all mock events', () => {
            const events = loadMockEvents();

            expect(events).toEqual(MOCK_EVENTS);
        });
    });

    describe('getMockEventById', () => {
        it('should return the event with the given id', () => {
            const event = getMockEventById('1');

            expect(event).toEqual(MOCK_EVENTS[0]);
        });
    });
});