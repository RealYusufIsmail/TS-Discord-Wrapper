import {EventNames} from "../ws/util/EventNames.ts";

export class EventEmitter {
    private listeners: Map<EventNames, ((data: any) => void)[]> = new Map();

    on <T> (event: EventNames, listener: (data: T) => void) {
        if (!this.listeners.has(event)) {
            this.listeners.set(event, []);
        }
        this.listeners.get(event)?.push(listener);
    }

    emit <T> (event: EventNames, data: T) {
        const eventListeners = this.listeners.get(event);
        if (eventListeners) {
            for (const listener of eventListeners) {
                listener(data);
            }
        }
    }
}