export enum SubscribeEvents {
    ON_NEW_NOTIFICATION = 'ON_NEW_NOTIFICATION',
}

class EventEmitter {
    events: any = {};

    dispatch(event: SubscribeEvents, data: any): void {
        if (!this.events[event]) return;
        this.events[event].forEach((callback: any) => callback(data));
    }

    subscribe(event: SubscribeEvents, callback: (data: any) => any): void {
        if (!this.events[event]) this.events[event] = [];
        this.events[event].push(callback);
    }

    unsubscribe(event: SubscribeEvents): void {
        if (!this.events[event]) return;
        delete this.events[event];
    }
}
export default new EventEmitter();
