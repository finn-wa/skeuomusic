import NavArrowButton from "../nav-arrow-button/NavArrowButton";

export function PlayerHeader() {
  return (
    <header class="player-header">
      <div class="header-button left">
        <NavArrowButton
          direction="left"
          text="<-"
          kind="primary"
          href="/music/player/library"
        />
      </div>

      <h1 class="h4 text-truncate">
        <span class="player-header-subtitle">Artist</span>
        <br />
        <span class="player-header-title">Song</span>
        <br />
        <span class="player-header-subtitle">Album</span>
      </h1>

      <div class="header-button right">
        <NavArrowButton
          direction="right"
          kind="primary"
          text={"="}
          href="/music/player/menu"
        />
      </div>
    </header>
  );
}
