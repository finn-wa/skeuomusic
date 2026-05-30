import {
  NavTabAlbumIcon,
  NavTabArtistIcon,
  NavTabMoreIcon,
  NavTabPlaylistsIcon,
  NavTabSongsIcon,
} from "../icons/nav-tab-icons";
import NavTab from "../nav-tab/nav-tab";

export default function NavBar() {
  return (
    <nav className="bar">
      <NavTab route="/music/library/playlists" label="Playlists">
        <NavTabPlaylistsIcon />
      </NavTab>
      <NavTab route="/music/library/artists" label="Artists">
        <NavTabArtistIcon />
      </NavTab>
      <NavTab route="/music/library/songs" label="Songs">
        <NavTabSongsIcon />
      </NavTab>
      <NavTab route="/music/library/albums" label="Albums">
        <NavTabAlbumIcon />
      </NavTab>
      <NavTab route="/music/library/more" label="More">
        <NavTabMoreIcon />
      </NavTab>
    </nav>
  );
}
