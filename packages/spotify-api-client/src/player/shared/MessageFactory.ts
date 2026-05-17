import { Messages, type MessageType } from "../enums/Messages";
import type { Message } from "./Message";

export class MessageFactory {
  constructor() {}
  static create() {
    return new MessageFactory();
  }
  _createEventMessage(name: string, eventData: unknown) {
    return this._createMessage(Messages.EVENT, {
      name,
      eventData,
    });
  }
  _createMessage(messageType: MessageType, data?: unknown): Message {
    return {
      type: Messages.SPOTIFY_MESSAGE,
      body: {
        topic: messageType,
        data: data == null ? data : JSON.parse(JSON.stringify(data)),
      },
    };
  }
  accountError(e: string) {
    return this._createEventMessage(Messages.ACCOUNT_ERROR, {
      message: e,
    });
  }
  authError(e: unknown) {
    return this._createEventMessage(Messages.AUTH_ERROR, e);
  }
  autoplayFailed(e: unknown) {
    return this._createEventMessage(Messages.AUTOPLAY_FAILED, e);
  }
  playbackError(e: unknown) {
    return this._createEventMessage(Messages.PLAYBACK_ERROR, e);
  }
  playerReady(e: unknown) {
    return this._createEventMessage(Messages.PLAYER_READY, e);
  }
  playerNotReady(e: unknown) {
    return this._createEventMessage(Messages.PLAYER_NOT_READY, e);
  }
  connect() {
    return this._createMessage(Messages.CONNECT);
  }
  connected(e: boolean, t: unknown) {
    return this._createMessage(Messages.CONNECTED, {
      connected: e,
      ref: t,
    });
  }
  disconnect() {
    return this._createMessage(Messages.DISCONNECT);
  }
  init(e: unknown) {
    return this._createMessage(Messages.INIT, e);
  }
  playerInitError(e: unknown) {
    return this._createEventMessage(Messages.PLAYER_INIT_ERROR, e);
  }
  getToken() {
    return this._createMessage(Messages.GET_TOKEN);
  }
  token(token: unknown, ref: number) {
    return this._createMessage(Messages.TOKEN, { token, ref });
  }
  activateElement() {
    return this._createMessage(Messages.ACTIVATE_ELEMENT);
  }
  activateElementError(e: unknown) {
    return this._createEventMessage(Messages.ACTIVATE_ELEMENT_ERROR, e);
  }
  pause() {
    return this._createMessage(Messages.PAUSE);
  }
  resume() {
    return this._createMessage(Messages.RESUME);
  }
  togglePlay() {
    return this._createMessage(Messages.TOGGLE_PLAY);
  }
  seek(timestampMs: number) {
    return this._createMessage(Messages.SEEK, timestampMs);
  }
  nextTrack(e?: unknown) {
    return this._createMessage(Messages.NEXT_TRACK, e);
  }
  previousTrack(e?: unknown) {
    return this._createMessage(Messages.PREV_TRACK, e);
  }
  getCurrentState() {
    return this._createMessage(Messages.GET_CURRENT_STATE);
  }
  currentState(e: unknown, t: unknown) {
    return this._createMessage(Messages.CURRENT_STATE, {
      state: e,
      ref: t,
    });
  }
  playerStateChanged(e: unknown) {
    return this._createEventMessage(Messages.PLAYER_STATE_CHANGED, e);
  }
  progress(e: unknown) {
    return this._createEventMessage(Messages.PROGRESS, e);
  }
  getVolume() {
    return this._createMessage(Messages.GET_VOLUME);
  }
  volume(e: number, t: unknown) {
    return this._createMessage(Messages.VOLUME, {
      volume: e,
      ref: t,
    });
  }
  setVolume(e: unknown) {
    return this._createMessage(Messages.SET_VOLUME, e);
  }
  setName(e: unknown) {
    return this._createMessage(Messages.SET_NAME, e);
  }
  embeddedLoaded() {
    return this._createMessage(Messages.LOADED);
  }
}
export const messages = new MessageFactory();
