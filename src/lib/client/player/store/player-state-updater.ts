import type { SetStoreFunction } from "solid-js/store";
import type {
  PlayerActionListener,
  PlayerActionListenerObj,
} from "./player-action-listeners";
import type { PlayerAction } from "./player-actions";
import type { PlayerState } from "./player-state";

export class PlayerStateUpdater {
  private readonly actionHandlers: PlayerActionListenerObj;

  constructor(
    private readonly state: Readonly<PlayerState>,
    private readonly setState: SetStoreFunction<PlayerState>,
  ) {
    this.actionHandlers = {
      play: () => {
        this.setState("playing", true);
        this.setState("playedAt", {
          epochMs: Date.now(),
          trackMs: this.state.playedAt?.trackMs ?? 0,
        });
      },
      pause: () => {
        this.setState("playing", false);
        if (this.state.playedAt != null) {
          const epochMs = Date.now();
          this.setState("playedAt", {
            epochMs,
            trackMs:
              this.state.playedAt.trackMs +
              (epochMs - this.state.playedAt.epochMs),
          });
        }
      },
      setSong: (action) => {
        this.setState("song", action.song);
      },
      setVolume: (action) => {
        this.setState("volume", action.volume);
      },
      next: () => {
        // TODO: state change
      },
      previous: () => {
        // TODO: state change
      },
      seek: ({ positionMs }) => {
        this.setState("playedAt", { epochMs: Date.now(), trackMs: positionMs });
      },
      setRepeat: (action) => {
        this.setState("repeat", action.repeat);
      },
      setShuffle: (action) => {
        this.setState("shuffle", action.shuffle);
      },
      syncExternalState: (action) => {
        this.setState(action.state);
      },
      requestSync: () => {},
    };
  }

  applyAction<T extends PlayerAction>(action: T) {
    this.getActionHandler(action.kind)(action);
  }

  private getActionHandler<T extends PlayerAction>(
    kind: T["kind"],
  ): (action: T) => void {
    return this.actionHandlers[kind] as PlayerActionListener<T>;
  }
}
