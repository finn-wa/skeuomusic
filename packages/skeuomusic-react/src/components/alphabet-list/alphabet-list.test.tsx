import type { Item } from "@/shared/types";
import { renderWithRouter } from "@/test/router-utils";
import { describe, expect, it } from "vitest";
import { userEvent } from "vitest/browser";
import AlphabetList, { type ItemRendererProps } from "./alphabet-list";
import { LETTERS } from "./letters";

type RenderedScreen = Awaited<ReturnType<typeof renderWithRouter>>;

/** Build a list of items with stable, unique ids derived from their position. */
function makeItems(names: string[]): Item[] {
  return names.map((name, i) => ({ id: String(i), name }));
}

/** A promise that can be resolved imperatively, for exercising the Suspense fallback. */
function deferred<T>() {
  let resolve!: (value: T) => void;
  const promise = new Promise<T>((r) => {
    resolve = r;
  });
  return { promise, resolve };
}

function searchBox(screen: RenderedScreen) {
  return screen.getByRole("searchbox", { name: "Search" });
}

/** The names of every rendered list item, in DOM (i.e. grouped + sorted) order. */
function itemNames(screen: RenderedScreen): string[] {
  return screen
    .getByTestId(/^list-item-/)
    .elements()
    .map((el) => el.textContent?.trim() ?? "");
}

describe("AlphabetList", () => {
  describe("items prop", () => {
    it("shows the loading fallback while the items promise is pending", async () => {
      const { promise, resolve } = deferred<Item[]>();
      const screen = await renderWithRouter(
        <AlphabetList items={promise} noun="Album" />,
      );

      await expect.element(screen.getByText("Loading...")).toBeVisible();

      resolve(makeItems(["Abbey Road"]));
      await expect.element(screen.getByText("Abbey Road")).toBeVisible();
    });

    it("renders the resolved items once the promise settles", async () => {
      const items = Promise.resolve(makeItems(["Nevermind", "OK Computer"]));
      const screen = await renderWithRouter(<AlphabetList items={items} noun="Album" />);

      await expect.element(screen.getByText("Nevermind")).toBeVisible();
      await expect.element(screen.getByText("OK Computer")).toBeVisible();
    });
  });

  describe("noun prop", () => {
    it("pluralises a string noun by appending 's' in the item-count footer", async () => {
      const items = Promise.resolve(makeItems(["Aja", "Blue", "Computer"]));
      const screen = await renderWithRouter(<AlphabetList items={items} noun="Album" />);
      await expect.element(screen.getByText("3 Albums")).toBeVisible();
    });

    it("uses the singular noun in the item-count footer when there is exactly one item", async () => {
      const items = Promise.resolve(makeItems(["Aja"]));
      const screen = await renderWithRouter(<AlphabetList items={items} noun="Album" />);
      await expect.element(screen.getByText("1 Album")).toBeVisible();
    });

    it("uses the plural form of a {singular, plural} noun for an irregular plural", async () => {
      const items = Promise.resolve(makeItems(["Aja", "Blue"]));
      const screen = await renderWithRouter(
        <AlphabetList
          items={items}
          noun={{ singular: "Library", plural: "Libraries" }}
        />,
      );
      await expect.element(screen.getByText("2 Libraries")).toBeVisible();
    });

    it("uses the singular form of a {singular, plural} noun when there is exactly one item", async () => {
      const items = Promise.resolve(makeItems(["Aja"]));
      const screen = await renderWithRouter(
        <AlphabetList
          items={items}
          noun={{ singular: "Library", plural: "Libraries" }}
        />,
      );
      await expect.element(screen.getByText("1 Library")).toBeVisible();
    });

    it("uses the plural noun in the empty-list message", async () => {
      const items = Promise.resolve<Item[]>([]);
      const screen = await renderWithRouter(<AlphabetList items={items} noun="Album" />);
      await expect.element(screen.getByText("No Albums")).toBeVisible();
    });
  });

  describe("hideItemCount prop", () => {
    it("renders the item-count footer by default", async () => {
      const items = Promise.resolve(makeItems(["Aja", "Blue"]));
      const screen = await renderWithRouter(<AlphabetList items={items} noun="Album" />);
      await expect.element(screen.getByText("2 Albums")).toBeVisible();
    });

    it("hides the item-count footer when hideItemCount is true", async () => {
      const items = Promise.resolve(makeItems(["Aja", "Blue"]));
      const screen = await renderWithRouter(
        <AlphabetList items={items} noun="Album" hideItemCount />,
      );
      // wait for the list to render, then assert the footer is absent
      await expect.element(screen.getByTestId("list-item-0")).toBeVisible();
      await expect.element(screen.getByText("2 Albums")).not.toBeInTheDocument();
    });
  });

  describe("hideIndex prop", () => {
    it("renders the alphabet index by default", async () => {
      const items = Promise.resolve(makeItems(["Aja"]));
      const screen = await renderWithRouter(<AlphabetList items={items} noun="Album" />);
      await expect
        .element(screen.getByRole("navigation", { name: "List index" }))
        .toBeVisible();
    });

    it("hides the alphabet index when hideIndex is true", async () => {
      const items = Promise.resolve(makeItems(["Aja"]));
      const screen = await renderWithRouter(
        <AlphabetList items={items} noun="Album" hideIndex />,
      );
      await expect.element(screen.getByText("Aja")).toBeVisible();
      await expect
        .element(screen.getByRole("navigation", { name: "List index" }))
        .not.toBeInTheDocument();
    });
  });

  describe("AlphabetIndex", () => {
    it("renders an index entry for every letter A-Z and #", async () => {
      const items = Promise.resolve(makeItems(["Aja"]));
      const screen = await renderWithRouter(<AlphabetList items={items} noun="Album" />);
      const index = screen.getByRole("navigation", { name: "List index" });
      await expect.element(index).toBeVisible();
      const labels = index
        .getByRole("link")
        .elements()
        .map((el) => el.textContent);
      expect(labels).toEqual([...LETTERS]);
    });

    it("each link's href targets the id of a section in the list", async () => {
      const items = Promise.resolve(makeItems(["Aja"]));
      const screen = await renderWithRouter(<AlphabetList items={items} noun="Album" />);
      const index = screen.getByRole("navigation", { name: "List index" });
      await expect.element(screen.getByTestId("list-item-0")).toBeVisible();

      const hrefs = index
        .getByRole("link")
        .elements()
        .map((el) => el.getAttribute("href"));

      for (const href of hrefs) {
        const id = href!.slice(1);
        expect(screen.container.querySelector(`[id="${id}"]`)).not.toBeNull();
      }
    });
  });

  describe("itemComponent prop", () => {
    function CustomItem({ item, hide }: ItemRendererProps<Item>) {
      return (
        <li data-testid={`custom-${item.id}`} data-hide={String(!!hide)}>
          {item.name}
        </li>
      );
    }

    it("renders items with the default ListItem when no itemComponent is given", async () => {
      const items = Promise.resolve(makeItems(["Aja"]));
      const screen = await renderWithRouter(<AlphabetList items={items} noun="Album" />);
      await expect.element(screen.getByTestId("list-item-0")).toBeVisible();
    });

    it("renders items with a custom itemComponent when provided", async () => {
      const items = Promise.resolve(makeItems(["Aja"]));
      const screen = await renderWithRouter(
        <AlphabetList items={items} noun="Album" itemComponent={CustomItem} />,
      );

      await expect.element(screen.getByTestId("custom-0")).toBeVisible();
      // the default ListItem should not be used
      await expect.element(screen.getByTestId("list-item-0")).not.toBeInTheDocument();
    });

    it("passes hide=true to the itemComponent for filtered-out items", async () => {
      const items = Promise.resolve(makeItems(["Apple", "Banana"]));
      const screen = await renderWithRouter(
        <AlphabetList items={items} noun="Fruit" itemComponent={CustomItem} />,
      );

      await userEvent.fill(searchBox(screen), "apple");

      await expect
        .element(screen.getByTestId("custom-1"))
        .toHaveAttribute("data-hide", "true");
      await expect
        .element(screen.getByTestId("custom-0"))
        .toHaveAttribute("data-hide", "false");
    });
  });

  describe("sorting", () => {
    it("renders items in alphabetical order regardless of input order", async () => {
      const items = Promise.resolve(makeItems(["Cherry", "Apple", "Banana"]));
      const screen = await renderWithRouter(<AlphabetList items={items} noun="Fruit" />);
      await expect.poll(() => itemNames(screen)).toEqual(["Apple", "Banana", "Cherry"]);
    });

    it("sorts case-insensitively", async () => {
      const items = Promise.resolve(makeItems(["banana", "Apple", "CHERRY"]));
      const screen = await renderWithRouter(<AlphabetList items={items} noun="Fruit" />);
      await expect.poll(() => itemNames(screen)).toEqual(["Apple", "banana", "CHERRY"]);
    });

    it("sorts within a letter group by the full name", async () => {
      const items = Promise.resolve(makeItems(["Avocado", "Ant", "Apple"]));
      const screen = await renderWithRouter(<AlphabetList items={items} noun="Thing" />);
      await expect.poll(() => itemNames(screen)).toEqual(["Ant", "Apple", "Avocado"]);
    });

    it("ignores leading and trailing whitespace when sorting", async () => {
      const items = Promise.resolve(makeItems(["   Zebra", "alpha"]));
      const screen = await renderWithRouter(<AlphabetList items={items} noun="Thing" />);
      await expect.poll(() => itemNames(screen)).toEqual(["alpha", "Zebra"]);
    });

    it("places numeric/symbol-led items in the trailing # group", async () => {
      const items = Promise.resolve(makeItems(["Apple", "123 Live", "Zoo"]));
      const screen = await renderWithRouter(<AlphabetList items={items} noun="Thing" />);
      // "#" group is rendered last, so the number-led item comes after Z
      await expect.poll(() => itemNames(screen)).toEqual(["Apple", "Zoo", "123 Live"]);
    });
  });

  describe("grouping", () => {
    it("places each item under the section for its first letter", async () => {
      const items = Promise.resolve(makeItems(["Apple", "Banana"]));
      const screen = await renderWithRouter(<AlphabetList items={items} noun="Fruit" />);

      await expect
        .element(screen.getByTestId("list-section-A").getByTestId("list-item-0"))
        .toBeVisible();
      await expect
        .element(screen.getByTestId("list-section-B").getByTestId("list-item-1"))
        .toBeVisible();
    });

    it("groups items starting with a number or symbol under the # section", async () => {
      const items = Promise.resolve(makeItems(["123 Live", "$pecial"]));
      const screen = await renderWithRouter(<AlphabetList items={items} noun="Thing" />);

      const hashSection = screen.getByTestId("list-section-#");
      await expect.element(hashSection.getByTestId("list-item-0")).toBeVisible();
      await expect.element(hashSection.getByTestId("list-item-1")).toBeVisible();
    });

    it("labels the # section header as 123", async () => {
      const items = Promise.resolve(makeItems(["9 to 5"]));
      const screen = await renderWithRouter(<AlphabetList items={items} noun="Thing" />);
      await expect
        .element(screen.getByTestId("list-section-#").getByText("123"))
        .toBeVisible();
    });

    it("labels alphabetic section headers with the letter itself", async () => {
      const items = Promise.resolve(makeItems(["Apple"]));
      const screen = await renderWithRouter(<AlphabetList items={items} noun="Fruit" />);
      await expect
        .element(screen.getByTestId("list-section-A").getByText("A", { exact: true }))
        .toBeVisible();
    });

    it("always renders all 27 list sections so the index can jump to any letter", async () => {
      const items = Promise.resolve(makeItems(["Apple"]));
      const screen = await renderWithRouter(<AlphabetList items={items} noun="Fruit" />);
      await expect.element(screen.getByTestId("list-item-0")).toBeVisible();
      const sectionIds = screen
        .getByTestId(/^list-section-/)
        .elements()
        .map((el) => el.getAttribute("data-testid"));
      expect(sectionIds).toEqual(LETTERS.map((letter) => `list-section-${letter}`));
    });
  });

  describe("filtering", () => {
    it("hides items that do not match the search query", async () => {
      const items = Promise.resolve(makeItems(["Apple", "Banana", "Cherry"]));
      const screen = await renderWithRouter(<AlphabetList items={items} noun="Fruit" />);

      await userEvent.fill(searchBox(screen), "banana");

      await expect.element(screen.getByTestId("list-item-1")).toBeVisible();
      await expect.element(screen.getByTestId("list-item-0")).not.toBeVisible();
      await expect.element(screen.getByTestId("list-item-2")).not.toBeVisible();
    });

    it("matches anywhere in the name, not only the start", async () => {
      const items = Promise.resolve(makeItems(["Banana", "Grape"]));
      const screen = await renderWithRouter(<AlphabetList items={items} noun="Fruit" />);

      await userEvent.fill(searchBox(screen), "ana");

      await expect.element(screen.getByTestId("list-item-0")).toBeVisible();
      await expect.element(screen.getByTestId("list-item-1")).not.toBeVisible();
    });

    it("matches case-insensitively", async () => {
      const items = Promise.resolve(makeItems(["Apple", "Banana"]));
      const screen = await renderWithRouter(<AlphabetList items={items} noun="Fruit" />);

      await userEvent.fill(searchBox(screen), "APPLE");

      await expect.element(screen.getByTestId("list-item-0")).toBeVisible();
      await expect.element(screen.getByTestId("list-item-1")).not.toBeVisible();
    });

    it("trims surrounding whitespace from the query before matching", async () => {
      const items = Promise.resolve(makeItems(["Banana", "Grape"]));
      const screen = await renderWithRouter(<AlphabetList items={items} noun="Fruit" />);

      await userEvent.fill(searchBox(screen), "  banana  ");

      await expect.element(screen.getByTestId("list-item-0")).toBeVisible();
      await expect.element(screen.getByTestId("list-item-1")).not.toBeVisible();
    });

    it("shows a 'No Results' message when nothing matches but items exist", async () => {
      const items = Promise.resolve(makeItems(["Apple", "Banana"]));
      const screen = await renderWithRouter(<AlphabetList items={items} noun="Fruit" />);

      await userEvent.fill(searchBox(screen), "zzz");

      await expect.element(screen.getByText("No Results")).toBeVisible();
    });

    it("restores all items when the search is cleared", async () => {
      const items = Promise.resolve(makeItems(["Apple", "Banana", "Cherry"]));
      const screen = await renderWithRouter(<AlphabetList items={items} noun="Fruit" />);

      await userEvent.fill(searchBox(screen), "banana");
      await expect.element(screen.getByTestId("list-item-0")).not.toBeVisible();

      await userEvent.click(screen.getByRole("button", { name: "Clear search" }));
      await expect.element(screen.getByTestId("list-item-0")).toBeVisible();
      await expect.element(screen.getByTestId("list-item-1")).toBeVisible();
      await expect.element(screen.getByTestId("list-item-2")).toBeVisible();
    });

    it("hides section headers with no matching items but keeps the section present", async () => {
      const items = Promise.resolve(makeItems(["Apple", "Banana"]));
      const screen = await renderWithRouter(<AlphabetList items={items} noun="Fruit" />);

      await userEvent.fill(searchBox(screen), "apple");

      // The B section is kept (so the index can still jump to it) but its header is hidden
      await expect.element(screen.getByTestId("list-section-B")).toBeInTheDocument();
      await expect
        .element(screen.getByTestId("list-section-B").getByText("B", { exact: true }))
        .not.toBeVisible();
      // The matching A section header stays visible
      await expect
        .element(screen.getByTestId("list-section-A").getByText("A", { exact: true }))
        .toBeVisible();
    });

    it("reports the match count as 'Results' in the footer while searching", async () => {
      const items = Promise.resolve(makeItems(["Apple", "Apricot", "Banana"]));
      const screen = await renderWithRouter(<AlphabetList items={items} noun="Fruit" />);

      await userEvent.fill(searchBox(screen), "ap");

      await expect.element(screen.getByText("2 Results")).toBeVisible();
    });
  });

  describe("duplicate names", () => {
    it("counts items that share a name independently in the footer", async () => {
      const items = Promise.resolve([
        { id: "a", name: "Echoes" },
        { id: "b", name: "Echoes" },
      ]);
      const screen = await renderWithRouter(<AlphabetList items={items} noun="Album" />);

      await expect.element(screen.getByTestId("list-item-a")).toBeVisible();
      await expect.element(screen.getByTestId("list-item-b")).toBeVisible();
      // Both items are counted, rather than collapsing to a single "1 Albums"
      await expect.element(screen.getByText("2 Albums")).toBeVisible();
    });

    it("keeps every duplicate-named item visible when the name matches the search", async () => {
      const items = Promise.resolve([
        { id: "a", name: "Echoes" },
        { id: "b", name: "Echoes" },
        { id: "c", name: "Animals" },
      ]);
      const screen = await renderWithRouter(<AlphabetList items={items} noun="Album" />);

      await userEvent.fill(searchBox(screen), "echoes");

      await expect.element(screen.getByTestId("list-item-a")).toBeVisible();
      await expect.element(screen.getByTestId("list-item-b")).toBeVisible();
      await expect.element(screen.getByTestId("list-item-c")).not.toBeVisible();
      await expect.element(screen.getByText("2 Results")).toBeVisible();
    });
  });

  describe("empty list", () => {
    it("shows a 'No <noun>' message when there are no items", async () => {
      const items = Promise.resolve<Item[]>([]);
      const screen = await renderWithRouter(<AlphabetList items={items} noun="Song" />);
      await expect.element(screen.getByText("No Songs")).toBeVisible();
    });
  });
});
