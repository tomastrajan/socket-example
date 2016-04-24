import * as _ from "lodash";
import { Observable } from "rxjs";

const stream = Observable.interval(250).scan((result, item) => result += (Math.random() - 0.5) / 100, 1);

const MOCK_USERS = [
    {id: 1, name: "Tyrion Lanister"},
    {id: 2, name: "John Snow"}
];

class UsersResource {

    constructor(initialData) {
        this.data = initialData;
    }

    get(id, query) {
        if (id) {
            return this.data.filter(item => item.id === id);
        }
        return this.data;
    }

    post(id, query, payload) {
        // TODO
    }

    put(id, query, payload) {
        if (id) {
            for (let item in this.data) {
                if (item.id === payload.id) {
                    Object.assign(item, payload);
                }
                break;
            }
        }
        this.data = payload;
    }

    delete(id, query) {
        this.data.remove(item => item.id === id);
    }

}

const resources = {
    users: new UsersResource(MOCK_USERS)
};

export default function connectionHandler(socket) {

    const subscribtions = {};

    console.log('User connected');

    socket.on("message", msg => socket.broadcast.emit("message", msg));

    socket.on("subscribe", data => {
        const type = data.type;
        subscribtions[type] = stream.subscribe(value => socket.emit(`subscription.${type}`, {value}));
    });

    socket.on("unsubscribe", data => {
        const type = data.type;
        subscribtions[type].unsubscribe();
        delete data.type;
    });

    socket.on("resource", ({ resource, operation, id, query, payload }, cb) =>
        cb(resources[resource][operation](id, query, payload)));

    socket.on("disconnect", () => {
        console.log('User disconnected')
    });

}