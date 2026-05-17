export interface RedirectionStrategy {
  redirect(targetUrl: string | URL): Promise<void>;
  onReturnFromRedirect?(): Promise<void>;
}
