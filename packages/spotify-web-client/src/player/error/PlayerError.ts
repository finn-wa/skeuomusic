import type { Errors } from "../enums/Errors";

export class PlayerError extends Error {
  override readonly name = "AnthemError";

  constructor(
    readonly code: (typeof Errors)[keyof typeof Errors],
    override readonly message: string,
  ) {
    super(message);
  }
}
