import { Errors } from "./enums/Errors";
import {
  type AnthemEventListener,
  AnthemEvents,
  type AnthemEventType,
} from "./enums/Events";
import { Messages, type MessageType } from "./enums/Messages";
import { PlayerError } from "./error/PlayerError";
import type { Message } from "./shared/Message";
import {
  type MessageCallback,
  MessageDispatcher,
} from "./shared/MessageDispatcher";
import { messages } from "./shared/MessageFactory";
import {
  createPromiseResolver,
  type PromiseResolver,
} from "./shared/PromiseResolver";
import type { WebPlaybackState } from "./types";

const defaultIframeFactory = (hostWindow: Window) => (src: string) => {
  const id = "spotify-playback-sdk-container";
  const existingIframe = hostWindow.document.getElementById(id);
  if (existingIframe != null) {
    if (
      existingIframe instanceof HTMLIFrameElement &&
      existingIframe.contentWindow != null
    ) {
      console.log("Connecting to existing Spotify playback iframe...");
      return existingIframe.contentWindow;
    }
    console.log("Removing errored Spotify playback iframe");
    hostWindow.document.removeChild(existingIframe);
  }
  console.log("Creating Spotify playback iframe...");
  const iframe = hostWindow.document.createElement("iframe");
  iframe.id = id;
  iframe.src = src;
  iframe.setAttribute("alt", "Audio Playback Container");
  iframe.setAttribute("tabIndex", "-1");
  iframe.style.setProperty("position", "absolute", "important");
  iframe.style.setProperty("left", "-1px", "important");
  iframe.style.setProperty("width", "0", "important");
  iframe.style.setProperty("height", "0", "important");
  iframe.style.setProperty("border", "none", "important");
  iframe.style.setProperty("outline", "none", "important");
  iframe.allow = "encrypted-media; autoplay";
  hostWindow.document.body.appendChild(iframe);
  return iframe.contentWindow!;
};

export type SpotifyPlayerOptions = {
  /**
   * The name of the Spotify Connect player. It will be visible in other Spotify
   * apps
   */
  name: string;
  /**
   * This will be called every time you run Spotify.Player#connect or when a
   * user's access token has expired (maximum of 60 minutes). You will be
   * provided with a callback parameter. You will need to execute this with a
   * valid access_token string for a Spotify Premium user.
   */
  getOAuthToken(cb: (token: string) => void): void;
  /**
   * The default volume of the player. Represented as a decimal between 0 and 1.
   * Default value is 1.
   */
  volume?: number | undefined;
  /**
   * If set to true, the Media Session API will be set with metadata and action
   * handlers. Default value is false.
   */
  enableMediaSession?: boolean | undefined;
};

type RequestMap<T> = {
  [ref: number]: PromiseResolver<T>;
};

/**
 * Creates an iframe containing the Spotify Web Player, and returns a Player
 * class that can be used to control it. This code is based on the Spotify
 * JS-SDK v1.10.0.
 */
export function initSpotifyPlayer(
  hostWindow: Window,
  iframeFactory: (src: string) => Window = defaultIframeFactory(hostWindow),
) {
  const playerSrc = "https://sdk.scdn.co/embedded/index.html";
  const msgDispatcher = MessageDispatcher.create();
  const isLoaded = new Promise<void>((resolve) => {
    msgDispatcher.listen(hostWindow, (t) => {
      if (t === Messages.LOADED) {
        msgDispatcher.stopListening(hostWindow);
        resolve();
      }
    });
  });
  const playerFrame = iframeFactory(playerSrc);

  return class Player {
    readonly isLoaded: Promise<void>;

    private readonly _options: SpotifyPlayerOptions & { id?: string };
    private readonly _eventListeners: {
      [K in AnthemEventType]: AnthemEventListener[K][];
    } = {
      [AnthemEvents.ACCOUNT_ERROR]: [],
      [AnthemEvents.AUTH_ERROR]: [],
      [AnthemEvents.AUTOPLAY_FAILED]: [],
      [AnthemEvents.PLAYBACK_ERROR]: [],
      [AnthemEvents.PLAYER_INIT_ERROR]: [],
      [AnthemEvents.PLAYER_READY]: [],
      [AnthemEvents.PLAYER_NOT_READY]: [],
      [AnthemEvents.PLAYER_STATE_CHANGED]: [],
      [AnthemEvents.PROGRESS]: [],
    };
    private readonly _messageHandlers = {
      [Messages.GET_TOKEN]: this._onGetToken.bind(this),
      [Messages.EVENT]: this._onEvent.bind(this),
      [Messages.CONNECTED]: this._onConnected.bind(this),
      [Messages.CURRENT_STATE]: this._onCurrentState.bind(this),
      [Messages.VOLUME]: this._onVolume.bind(this),
    };
    private readonly _connectionRequests: RequestMap<boolean> = {};
    private readonly _getCurrentStateRequests: RequestMap<WebPlaybackState | null> =
      {};
    private readonly _getVolumeRequests: RequestMap<number> = {};

    constructor(options: SpotifyPlayerOptions) {
      this._options = {
        name: options.name ?? hostWindow.location.hostname ?? "",
        getOAuthToken: options.getOAuthToken || (options as any).getOauthToken,
        volume: options.volume ?? 1,
        enableMediaSession: options.enableMediaSession,
      };
      this.isLoaded = isLoaded.then(() => {
        (msgDispatcher.listen(hostWindow, this._handleMessages),
          this._sendMessage(messages.init(this._options)));
      });
    }

    private _handleMessages: MessageCallback = (topic, data, seq) => {
      if (topic in this._messageHandlers) {
        (this._messageHandlers as any)[topic](data, seq);
      }
    };

    private _getListeners(eventType: AnthemEventType) {
      return [...this._eventListeners[eventType]];
    }

    private _onEvent(e: { name: MessageType; eventData: unknown }): void {
      const name = e.name;
      this._getListeners(
        AnthemEvents[name as keyof typeof AnthemEvents],
      ).forEach((listener) => listener(e.eventData as any));
    }

    private _onGetToken(_e: unknown, ref: number): void {
      const getOauthToken = this._options.getOAuthToken;
      if ("function" == typeof getOauthToken) {
        new Promise(getOauthToken).then((token) => {
          this._sendMessage(messages.token(token, ref));
        });
        return;
      }
      if (!this._getListeners(AnthemEvents.PLAYER_INIT_ERROR).length) {
        throw new PlayerError(
          Errors.INVALID_OAUTH,
          "getOAuthToken is not a function",
        );
      }
      this._onEvent({
        name: Messages.PLAYER_INIT_ERROR,
        eventData: { message: Errors.INVALID_OAUTH },
      });
    }

    private _onConnected(e: { ref: number; connected: boolean }): void {
      const request = this._connectionRequests[e.ref];
      if (request != null) {
        request.resolve(e.connected);
        delete this._connectionRequests[e.ref];
      }
    }

    private _onCurrentState(e: {
      ref: number;
      state: WebPlaybackState | null;
    }): void {
      const request = this._getCurrentStateRequests[e.ref];
      if (request != null) {
        request.resolve(e.state);
        delete this._getCurrentStateRequests[e.ref];
      }
    }

    private _onVolume(e: { ref: number; volume: number }): void {
      const request = this._getVolumeRequests[e.ref];
      if (request != null) {
        request.resolve(e.volume);
        delete this._getVolumeRequests[e.ref];
      }
    }

    private _sendMessage(e: Message): number {
      return msgDispatcher.send(playerFrame, e, playerSrc);
    }

    private async _sendMessageWhenLoaded(e: Message): Promise<number> {
      await this.isLoaded;
      return this._sendMessage(e);
    }

    /**
     * Connect our Web Playback SDK instance to Spotify with the credentials
     * provided during initialization.
     *
     * @returns Returns a Promise containing a Boolean (either true or false)
     *   with the success of the connection.
     */
    async connect(): Promise<boolean> {
      await this.isLoaded;
      const ref = this._sendMessage(messages.connect());
      this._connectionRequests[ref] = createPromiseResolver();
      return this._connectionRequests[ref].promise;
    }

    /** Closes the current session our Web Playback SDK has with Spotify. */
    disconnect(): Promise<number> {
      return this._sendMessageWhenLoaded(messages.disconnect());
    }

    /** Create a new event listener in the Web Playback SDK. */
    on<T extends AnthemEventType>(
      eventType: T,
      listener: AnthemEventListener[T],
    ): boolean {
      if (this._eventListeners[eventType].includes(listener)) {
        return false;
      }
      this._eventListeners[eventType].push(listener);
      return true;
    }

    /** Create a new event listener in the Web Playback SDK. Alias for Player#on. */
    addListener = this.on;

    /**
     * Remove an event listener in the Web Playback SDK.
     *
     * @param eventName A valid event name. See Web Playback SDK Events.
     * @param listener The callback function you would like to remove from the
     *   listener. If not provided, it will remove all callbacks under the
     *   event_name.
     * @returns Returns a Boolean. Returns true if the event name is valid with
     *   registered callbacks from #addListener.
     */
    removeListener<T extends AnthemEventType>(
      eventName: T,
      listener?: AnthemEventListener[T],
    ): boolean {
      if (1 === arguments.length) {
        this._eventListeners[eventName] = [];
        return true;
      }
      const listeners = this._eventListeners[eventName];
      if (listeners?.length) {
        this._eventListeners[eventName] = listeners.filter(
          (x) => x !== listener,
        ) as any[];
      }
      return true;
    }

    /**
     * Collect metadata on local playback.
     *
     * @returns Returns a Promise. It will return either a WebPlaybackState
     *   object or null depending on if the user is successfully connected.
     */
    async getCurrentState(): Promise<WebPlaybackState | null> {
      await this.isLoaded;
      const ref = this._sendMessage(messages.getCurrentState());
      this._getCurrentStateRequests[ref] = createPromiseResolver();
      return this._getCurrentStateRequests[ref].promise;
    }

    /**
     * Rename the Spotify Player device. This is visible across all Spotify
     * Connect devices.
     */
    setName(name: string): Promise<number> {
      return this._sendMessageWhenLoaded(messages.setName(name));
    }

    /**
     * Get the local volume currently set in the Web Playback SDK.
     *
     * @returns Returns a Promise containing the local volume (as a decimal
     *   between 0 and 1).
     */
    async getVolume(): Promise<number> {
      await this.isLoaded;
      const ref = this._sendMessage(messages.getVolume());
      this._getVolumeRequests[ref] = createPromiseResolver();
      return this._getVolumeRequests[ref].promise;
    }

    /**
     * Set the local volume for the Web Playback SDK.
     *
     * Note: On iOS devices, the audio level is always under the user’s physical
     * control. The volume property is not settable in JavaScript. Reading the
     * volume property always returns 1. More details can be found in the
     * iOS-specific Considerations documentation page by Apple.
     *
     * @param volume The new desired volume for local playback. Between 0 and 1.
     */
    setVolume(volume: number): Promise<number> {
      return this._sendMessageWhenLoaded(messages.setVolume(volume));
    }

    /**
     * Some browsers prevent autoplay of media by ensuring that all playback is
     * triggered by synchronous event-paths originating from user interaction
     * such as a click. In the autoplay disabled browser, to be able to keep the
     * playing state during transfer from other applications to yours, this
     * function needs to be called in advance. Otherwise it will be in pause
     * state once it’s transferred.
     *
     * @returns
     */
    activateElement() {
      return this._sendMessageWhenLoaded(messages.activateElement());
    }

    /** Pause the local playback. */
    pause() {
      return this._sendMessageWhenLoaded(messages.pause());
    }

    /** Resume the local playback. */
    resume() {
      return this._sendMessageWhenLoaded(messages.resume());
    }

    /** Resume/pause the local playback. */
    togglePlay() {
      return this._sendMessageWhenLoaded(messages.togglePlay());
    }

    /** Seek to a position in the current track in local playback. */
    seek(timestampMs: number) {
      return this._sendMessageWhenLoaded(messages.seek(timestampMs));
    }

    /** Switch to the previous track in local playback. */
    previousTrack() {
      return this._sendMessageWhenLoaded(messages.previousTrack());
    }

    /** Skip to the next track in local playback. */
    nextTrack() {
      return this._sendMessageWhenLoaded(messages.nextTrack());
    }
  };
}

type SpotifyPlayerWithPrivateFields = InstanceType<
  ReturnType<typeof initSpotifyPlayer>
>;

/** Provides an API for interacting with the Spotify Web Playback SDK. */
export type SpotifyPlayer = {
  [K in keyof SpotifyPlayerWithPrivateFields]: SpotifyPlayerWithPrivateFields[K];
};
