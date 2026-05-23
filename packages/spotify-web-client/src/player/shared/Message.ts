import type { MessageType } from "../enums/Messages";
export type Message = {
  type: MessageType;
  body: {
    topic: MessageType;
    data: unknown;
  };
  seq?: number;
};

export type MessageWithId = Message & { seq: number };

export type MessageEvent = Event & { data: Message };
