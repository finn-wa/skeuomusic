import { NavTabMoreIcon, NavTabSongsIcon } from "../icons/NavTabIcons";
import NavTab from "../nav-tab/NavTab";

export function NavBar() {
  return (
    <nav class="bar">
      <NavTab route="/music/library/playlists" label="Playlists">
        <NavTabMoreIcon />
      </NavTab>
      <NavTab route="/music/library/artists" label="Artists">
        <NavTabSongsIcon />
      </NavTab>
      <NavTab route="/music/library/songs" label="Songs">
        <NavTabSongsIcon />
      </NavTab>
      <NavTab route="/music/library/albums" label="Albums">
        <NavTabSongsIcon />
      </NavTab>
      <NavTab route="/music/library/more" label="More">
        <NavTabMoreIcon />
      </NavTab>
    </nav>
  );
}
