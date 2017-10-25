import {notify} from './Notification'
import {warn} from "./Notification";


require('./css/main.css');


notify('notified.');
warn('warning');

class Form {
    constructor() {
        console.log('constructor called');
    }
}

new Form();