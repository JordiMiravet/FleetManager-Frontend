import { addMockEvent, deleteMockEvent, getMockEventById, loadMockEvents, updateMockEvent } from './event-mock.helpers';
import { MOCK_EVENTS } from './event-data.mock';

describe('event-mock.helpers', () => {

    describe('loadMockEvents', () => {

        it('should return a copy of all mock events', () => {
            const events = loadMockEvents();

            expect(events).toEqual(MOCK_EVENTS);
            expect(events).not.toBe(MOCK_EVENTS);
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

            expect(result).toHaveSize(events.length + 1);
            expect(result[result.length - 1]).toEqual({
                ...newEvent,
                _id: jasmine.any(String),
            });
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

            expect(result).toHaveSize(1);
            expect(result[0]).toEqual({
                ...newEvent,
                _id: jasmine.any(String),
            });
        });

    });

    describe('updateMockEvent', () => {

        it('should update the event with the given id', () => {
            const events = [...MOCK_EVENTS];
            const updatedEvent = {
                ...events[0],
                title: 'Updated event',
            };

            const result = updateMockEvent(events, updatedEvent);

            expect(result[0]).toEqual(updatedEvent);
        });

        it('should not modify events when the id does not exist', () => {
            const events = [...MOCK_EVENTS];
            const updatedEvent = {
                ...MOCK_EVENTS[0],
                _id: '999',
                title: 'Updated event',
            };

            const result = updateMockEvent(events, updatedEvent);

            expect(result).toEqual(events);
        });

    });

    describe('deleteMockEvent', () => {

        it('should remove the event with the given id', () => {
            const events = [...MOCK_EVENTS];

            const result = deleteMockEvent(events, '1');

            expect(result).toHaveSize(events.length - 1);
            expect(result.some(event => event._id === '1')).toBeFalse();
        });

        it('should not modify events when the id does not exist', () => {
            const events = [...MOCK_EVENTS];
            const result = deleteMockEvent(events, '999');

            expect(result).toEqual(events);
        });

        it('should return an empty array when deleting from an empty array', () => {
            const result = deleteMockEvent([], '1');

            expect(result).toEqual([]);
        });

    });

});
