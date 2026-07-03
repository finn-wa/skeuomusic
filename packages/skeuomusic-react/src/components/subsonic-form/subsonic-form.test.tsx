import { describe, expect, it, vi } from "vitest";
import { render } from "vitest-browser-react";
import { userEvent } from "vitest/browser";
import SubsonicForm, { SUBSONIC_FORM_ID, type SubsonicFormValue } from "./subsonic-form";

const noop = () => {};

describe("SubsonicForm", () => {
  describe("rendering", () => {
    it("renders the form with the expected id", async () => {
      const screen = await render(<SubsonicForm onSubmit={noop} setIsValid={noop} />);
      await expect
        .element(screen.getByRole("button", { name: "Submit" }))
        .toBeInTheDocument();
      expect(document.getElementById(SUBSONIC_FORM_ID)).not.toBeNull();
    });

    it("renders all four form controls with empty defaults", async () => {
      const screen = await render(<SubsonicForm onSubmit={noop} setIsValid={noop} />);
      await expect.element(screen.getByLabelText("Server URL")).toHaveValue("");
      await expect.element(screen.getByLabelText("User Name")).toHaveValue("");
      await expect
        .element(screen.getByLabelText("Password", { exact: true }))
        .toHaveValue("");
      await expect.element(screen.getByLabelText("Save password")).not.toBeChecked();
    });
  });

  describe("Server URL control", () => {
    it("is required, is a text input, and shows a placeholder", async () => {
      const screen = await render(<SubsonicForm onSubmit={noop} setIsValid={noop} />);
      const url = screen.getByLabelText("Server URL");
      await expect.element(url).toHaveAttribute("required");
      await expect.element(url).toHaveAttribute("type", "text");
      await expect
        .element(url)
        .toHaveAttribute("placeholder", "https://demo.navidrome.org");
    });

    it("updates its value as the user types", async () => {
      const screen = await render(<SubsonicForm onSubmit={noop} setIsValid={noop} />);
      const url = screen.getByLabelText("Server URL");
      await userEvent.fill(url, "https://music.example.com");
      await expect.element(url).toHaveValue("https://music.example.com");
    });
  });

  describe("User Name control", () => {
    it("is required, is a text input, and shows a placeholder", async () => {
      const screen = await render(<SubsonicForm onSubmit={noop} setIsValid={noop} />);
      const username = screen.getByLabelText("User Name");
      await expect.element(username).toHaveAttribute("required");
      await expect.element(username).toHaveAttribute("type", "text");
      await expect.element(username).toHaveAttribute("placeholder", "demo");
    });

    it("updates its value as the user types", async () => {
      const screen = await render(<SubsonicForm onSubmit={noop} setIsValid={noop} />);
      const username = screen.getByLabelText("User Name");
      await userEvent.fill(username, "alice");
      await expect.element(username).toHaveValue("alice");
    });
  });

  describe("Password control", () => {
    it("is required and is a password input", async () => {
      const screen = await render(<SubsonicForm onSubmit={noop} setIsValid={noop} />);
      const password = screen.getByLabelText("Password", { exact: true });
      await expect.element(password).toHaveAttribute("required");
      await expect.element(password).toHaveAttribute("type", "password");
    });

    it("updates its value as the user types", async () => {
      const screen = await render(<SubsonicForm onSubmit={noop} setIsValid={noop} />);
      const password = screen.getByLabelText("Password", { exact: true });
      await userEvent.fill(password, "hunter2");
      await expect.element(password).toHaveValue("hunter2");
    });

    it("shows the 'demo' placeholder when no password is saved", async () => {
      const screen = await render(<SubsonicForm onSubmit={noop} setIsValid={noop} />);
      await expect
        .element(screen.getByLabelText("Password", { exact: true }))
        .toHaveAttribute("placeholder", "demo");
    });

    it("shows the 'Saved' placeholder when a password was previously saved", async () => {
      const screen = await render(
        <SubsonicForm
          onSubmit={noop}
          setIsValid={noop}
          initialState={{ dangerouslySavePassword: true }}
        />,
      );
      await expect
        .element(screen.getByLabelText("Password", { exact: true }))
        .toHaveAttribute("placeholder", "Saved");
    });
  });

  describe("Save password control", () => {
    it("is an unchecked checkbox by default", async () => {
      const screen = await render(<SubsonicForm onSubmit={noop} setIsValid={noop} />);
      const checkbox = screen.getByLabelText("Save password");
      await expect.element(checkbox).toHaveAttribute("type", "checkbox");
      await expect.element(checkbox).not.toBeChecked();
    });

    it("toggles when clicked", async () => {
      const screen = await render(<SubsonicForm onSubmit={noop} setIsValid={noop} />);
      const checkbox = screen.getByLabelText("Save password");
      await userEvent.click(checkbox);
      await expect.element(checkbox).toBeChecked();
      await userEvent.click(checkbox);
      await expect.element(checkbox).not.toBeChecked();
    });
  });

  describe("initialState prop", () => {
    it("populates the url, username and save-password controls", async () => {
      const screen = await render(
        <SubsonicForm
          onSubmit={noop}
          setIsValid={noop}
          initialState={{
            url: "https://saved.example.com",
            username: "bob",
            dangerouslySavePassword: true,
          }}
        />,
      );
      await expect
        .element(screen.getByLabelText("Server URL"))
        .toHaveValue("https://saved.example.com");
      await expect.element(screen.getByLabelText("User Name")).toHaveValue("bob");
      await expect.element(screen.getByLabelText("Save password")).toBeChecked();
    });

    it("never pre-fills the password field, even when a password is saved", async () => {
      const screen = await render(
        <SubsonicForm
          onSubmit={noop}
          setIsValid={noop}
          initialState={{ dangerouslySavePassword: true }}
        />,
      );
      await expect
        .element(screen.getByLabelText("Password", { exact: true }))
        .toHaveValue("");
    });
  });

  describe("onSubmit prop", () => {
    it("is called with the current form values when submitted", async () => {
      const onSubmit = vi.fn<(value: SubsonicFormValue) => void>();
      const screen = await render(<SubsonicForm onSubmit={onSubmit} setIsValid={noop} />);
      await userEvent.fill(
        screen.getByLabelText("Server URL"),
        "https://music.example.com",
      );
      await userEvent.fill(screen.getByLabelText("User Name"), "alice");
      await userEvent.fill(screen.getByLabelText("Password", { exact: true }), "hunter2");
      await userEvent.click(screen.getByLabelText("Save password"));
      await userEvent.click(screen.getByRole("button", { name: "Submit" }));

      await expect
        .poll(() => onSubmit)
        .toHaveBeenCalledWith({
          url: "https://music.example.com",
          username: "alice",
          password: "hunter2",
          dangerouslySavePassword: true,
        });
    });

    it("submits values seeded from initialState without further edits", async () => {
      const onSubmit = vi.fn<(value: SubsonicFormValue) => void>();
      const screen = await render(
        <SubsonicForm
          onSubmit={onSubmit}
          setIsValid={noop}
          initialState={{ url: "https://saved.example.com", username: "bob" }}
        />,
      );
      await userEvent.fill(screen.getByLabelText("Password", { exact: true }), "secret");
      await userEvent.click(screen.getByRole("button", { name: "Submit" }));

      await expect
        .poll(() => onSubmit)
        .toHaveBeenCalledWith({
          url: "https://saved.example.com",
          username: "bob",
          password: "secret",
          dangerouslySavePassword: false,
        });
    });
  });

  describe("submit button", () => {
    it('reads "Submit" and is enabled while idle', async () => {
      const screen = await render(<SubsonicForm onSubmit={noop} setIsValid={noop} />);
      await expect.element(screen.getByRole("button", { name: "Submit" })).toBeEnabled();
    });

    it('shows "Submitting..." and is disabled while onSubmit is pending', async () => {
      let resolveSubmit!: () => void;
      const onSubmit = vi.fn<() => Promise<void>>(
        () =>
          new Promise<void>((resolve) => {
            resolveSubmit = resolve;
          }),
      );
      const screen = await render(<SubsonicForm onSubmit={onSubmit} setIsValid={noop} />);
      // Fill the required fields so the form can submit.
      await userEvent.fill(screen.getByLabelText("Server URL"), "https://x.example");
      await userEvent.fill(screen.getByLabelText("User Name"), "alice");
      await userEvent.fill(screen.getByLabelText("Password", { exact: true }), "pw");
      await userEvent.click(screen.getByRole("button", { name: "Submit" }));

      const submitting = screen.getByRole("button", { name: "Submitting..." });
      await expect.element(submitting).toBeDisabled();

      resolveSubmit();
      await expect.element(screen.getByRole("button", { name: "Submit" })).toBeEnabled();
    });
  });
});
