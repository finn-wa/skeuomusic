import type { RedirectionStrategy } from "./RedirectionStrategy";

export class DocumentLocationRedirectionStrategy implements RedirectionStrategy {
  public async redirect(targetUrl: string | URL): Promise<void> {
    document.location = targetUrl.toString();
  }

  public async onReturnFromRedirect(): Promise<void> {}
}
