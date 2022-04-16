import { createMachine } from "xstate";

export const machine = createMachine({
    id: "video-player",
    initial: "closed",
    states: {
        opened: {
            type: "parallel",
            on: { CLOSE: "closed" },
            states: {
                size: {
                    initial: "mini",
                    states: {
                        mini: {
                            on: {
                                TOGGLE: 'full'
                            },
                        },
                        full: {
                            on: {
                                TOGGLE: 'mini'
                            },
                        },
                    },
                },
                control: {
                    initial: "played",
                    states: {
                        played: {
                            on: {
                                PAUSE: "paused",
                            },
                        },
                        paused: {
                            on: {
                                PLAY: "played",
                            },
                        },
                    },
                },
            },
        },
        closed: {
            on: { OPEN: "opened" },
        },
    },
});
