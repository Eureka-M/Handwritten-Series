class EventEmitter {
    constructor () {
        this.events = {}
    }

    on(eventKey, callback) {
        if (!this.events[eventKey]) {
            this.events[eventKey] = []
        }
        this.events[eventKey].push(callback)
    }

    emit(eventKey, data) {
        let callbacks = this.events[eventKey]
        if (callbacks.length) {
            for (let i = 0; i < callbacks.length; i++) {
                callbacks[i](data)
            }
        }
    }

    off(eventKey) {
        if (this.events[eventKey]) {
            this.events[eventKey] = []
        }
    }

    once(eventKey, callback) {
        this.on(eventKey, (data) => {
            callback(data)
            this.off(eventKey)
        })
    }
}

const eventEmitter = new EventEmitter()

eventEmitter.on('event1', function (data) {
    console.log('event1 1', data)
})

eventEmitter.on('event1', function (data) {
    console.log('event1 2', data)
})

eventEmitter.on('event2', function (data) {
    console.log('event2 1', data)
})

eventEmitter.once('event2', function (data) {
    console.log('event2 once', data)
})

eventEmitter.emit('event1', 'eventData')

eventEmitter.emit('event2', 'eventData')

eventEmitter.off('event1')

eventEmitter.emit('event1', 'eventData')

eventEmitter.emit('event2', 'eventData')

eventEmitter.emit('event2', 'eventData')


