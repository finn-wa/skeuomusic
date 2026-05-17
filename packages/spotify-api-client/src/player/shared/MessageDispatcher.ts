import { Messages, type MessageType } from "../enums/Messages";
import type { Message, MessageEvent, MessageWithId } from "./Message";

export type MessageCallback = (
  topic: MessageType,
  data: unknown,
  seq: number,
) => void;

export class MessageDispatcher {
  constructor(
    private _seq = 0,
    private _onMessageCallback: MessageCallback = () => {},
  ) {}

  static create() {
    return new MessageDispatcher();
  }
  _addMessageId(e: Message): MessageWithId {
    (e as MessageWithId).seq = this._seq++;
    return e as MessageWithId;
  }
  _receiveMessage = (e: Event) => {
    if (this.isMessageEvent(e)) {
      this._onMessageCallback(e.data.body.topic, e.data.body.data, e.data.seq!);
    }
  };

  private isMessageEvent(e: any): e is MessageEvent {
    return (
      e != null &&
      e.data?.type === Messages.SPOTIFY_MESSAGE &&
      e.data.body?.topic != null
    );
  }

  listen(e: Window, t: MessageCallback) {
    this._onMessageCallback = t;
    e.addEventListener("message", this._receiveMessage);
  }

  stopListening(e: Window) {
    e.removeEventListener("message", this._receiveMessage);
  }

  send(w: Window, message: Message, origin = "*"): number {
    const msg = this._addMessageId(message);
    w.postMessage(msg, origin);
    return msg.seq;
  }
}
