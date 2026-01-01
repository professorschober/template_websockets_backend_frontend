export type ChatTextMessage = {
    type: "message";
    text: string;
}

export type ClientMessage =
    | ChatTextMessage;