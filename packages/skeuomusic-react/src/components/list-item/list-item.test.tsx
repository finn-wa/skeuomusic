import type { ItemWithLink } from "./list-item";
import { renderWithRouter } from "@/test/router-utils";
import { describe, expect, it } from "vitest";
import ListItem from "./list-item";

const item: ItemWithLink = { id: "42", name: "Abbey Road" };

describe("ListItem", () => {
  it("renders the item name", async () => {
    const screen = await renderWithRouter(<ListItem item={item} />);
    await expect.element(screen.getByText("Abbey Road")).toBeVisible();
  });

  it("derives the testid from the item id", async () => {
    const screen = await renderWithRouter(<ListItem item={item} />);
    await expect.element(screen.getByTestId("list-item-42")).toBeVisible();
  });

  it("renders the name as plain text (no link) when href is absent", async () => {
    const screen = await renderWithRouter(<ListItem item={item} />);
    await expect.element(screen.getByText("Abbey Road")).toBeVisible();
    await expect.element(screen.getByRole("link")).not.toBeInTheDocument();
  });

  it("renders a link to the href when one is given", async () => {
    const screen = await renderWithRouter(
      <ListItem item={{ ...item, href: "/albums/42" }} />,
    );
    await expect
      .element(screen.getByRole("link", { name: "Abbey Road" }))
      .toHaveAttribute("href", "/albums/42");
  });

  it("hides the item when hide is true", async () => {
    const screen = await renderWithRouter(<ListItem item={item} hide />);
    await expect.element(screen.getByTestId("list-item-42")).not.toBeVisible();
  });

  it("shows the item when hide is false", async () => {
    const screen = await renderWithRouter(<ListItem item={item} hide={false} />);
    await expect.element(screen.getByTestId("list-item-42")).toBeVisible();
  });
});
