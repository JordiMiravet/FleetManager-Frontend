import { EventInterface } from '../../models/event';
import { MOCK_EVENTS } from './event-data.mock';

export function loadMockEvents(): EventInterface[] {
    return [...MOCK_EVENTS];
}

export function getMockEventById(id: string): EventInterface | undefined {
    return MOCK_EVENTS.find(event => event._id === id);
}

export function addMockEvent(
    event: Omit<EventInterface, '_id'>
): EventInterface {
    let id = crypto.randomUUID();

    while (MOCK_EVENTS.some(event => event._id === id)) {
        id = crypto.randomUUID();
    }

    const newEvent: EventInterface = {
        ...event,
        _id: id,
    };

    MOCK_EVENTS.push(newEvent);

    return newEvent;
}

export function updateMockEvent(
    updatedEvent: EventInterface
): EventInterface[] {
    return MOCK_EVENTS.map( event =>
        event._id === updatedEvent._id
            ? {...event, ...updatedEvent}
            : event
    );
}

export function deleteMockEvent(
    id: string
): EventInterface[] {
    return MOCK_EVENTS.filter( event => event._id !== id)
}