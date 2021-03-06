import {Observable} from "rxjs";

import Resource from "./resource";

import "./style.scss";

window.onload = () => {
    console.log("Loaded...");

    const socket = io();

    socket.on("message", msg => $(".chat ul").append($("<li>").text(msg)));

    $(".chat button").click(() => {
        const msg = $(".chat input").val();
        socket.emit("message", msg);
        $(".chat ul").append($("<li>").text(msg));
        $(".chat input").val("");
    });


    const type = "something";
    let subscribtion;

    $("button.sub").click(() => {
        socket.emit("subscribe", {type});

        subscribtion = Observable.fromEventPattern(
            h => socket.on(`subscription.${type}`, h),
            h => socket.removeListener(`subscription.${type}`, h)
        )
            .do(data => console.log("Subscription received value", data.value))
            .throttleTime(500)
            // .filter(data => data.value > 1)
            // .flatMap()
            // .reduce()
            // and much much more
            .subscribe(data => {
                console.log("Subscription received value after filtering", data.value);
                $(".subval").text(data.value);
            });
    });

    $("button.unsub").click(() => {
        if (subscribtion) {
            socket.emit("unsubscribe", { type});
            subscribtion.unsubscribe();
        }
    });


    const Users = new Resource(socket, "users");
    
    $("button.find").click(() => {
        Users.find(1, res => {
            $(".resource-response").text(JSON.stringify(res));
            console.log(res)
        });
    });

    $("button.findall").click(() => {
        Users.findAll(res => {
            $(".resource-response").text(JSON.stringify(res));
            console.log(res)
        });
    });
};