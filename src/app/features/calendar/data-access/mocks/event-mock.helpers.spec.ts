import { addMockEvent, getMockEventById, loadMockEvents } from './event-mock.helpers';
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

        it('should return undefined for a non-existing id', () => {
            const event = getMockEventById('999');

            expect(event).toBeUndefined();
        });
    });

    describe('addMockEvent', () => {
        it('should add a new event with a generated id', () => {
            const events = [...MOCK_EVENTS];
            const newEvent = {
                title: 'Test event',
                date: '2026-08-30',
                hourStart: '10:00',
                hourEnd: '11:00',
                comment: 'Test event comment',
                vehicleId: '1',
            };

            const result = addMockEvent(events, newEvent);

            expect(result).toHaveLength(events.length + 1);
            expect(result[result.length - 1]).toMatchObject(newEvent);
            expect(result[result.length - 1]._id).toEqual(expect.any(String));
        });

        it('should add an event to an empty array', () => {
            const newEvent = {
                title: 'Test event',
                date: '2026-08-30',
                hourStart: '10:00',
                hourEnd: '11:00',
                comment: 'Test event comment',
                vehicleId: '1',
            };

            const result = addMockEvent([], newEvent);

            expect(result).toHaveLength(1);
            expect(result[0]).toMatchObject(newEvent);
            expect(result[0]._id).toEqual(expect.any(String));
        });
    });
});