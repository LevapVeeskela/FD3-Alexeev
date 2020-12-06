import {
    EventEmitter
} from 'events';

const companyEvents = new EventEmitter();
const filterEvents = new EventEmitter();
const dataEvents = new EventEmitter();

export {
    companyEvents,
    filterEvents,
    dataEvents
};
