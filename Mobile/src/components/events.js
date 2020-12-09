import {
    EventEmitter
} from 'events';

const companyEvents = new EventEmitter();
const confirmEvents = new EventEmitter();
const dataEvents = new EventEmitter();

export {
    companyEvents,
    confirmEvents,
    dataEvents
};
