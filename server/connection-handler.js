import { Observable } from "rxjs";

const stream = Observable.interval(250).scan((result, item) => result += (Math.random() - 0.5) / 100, 1);

export default function connectionHandler(socket) {

    const subscribtions = {};

    console.log('User connected');

    socket.on("message", msg => socket.emit("message", msg));

    socket.on("subscribe", data => {
        const type = data.type;
        subscribtions[type] = stream.subscribe(value => socket.emit(`subscription.${type}`, { value }));
    });

    socket.on("unsubscribe", data => {
        const type = data.type;
        subscribtions[type].unsubscribe();
        delete data.type;
    });

    socket.on("disconnect", () => {
        console.log('User disconnected')
    });

}