import {
    EventEmitter
} from 'events';

const confirmEvents = new EventEmitter();
const dataEvents = new EventEmitter();

export {
    confirmEvents,
    dataEvents
};
