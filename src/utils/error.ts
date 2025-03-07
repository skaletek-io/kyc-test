import { t } from "i18next";

// utils/errors.ts
interface SessionErrorOptions {
  redirectUrl?: string;
}

export class SessionError extends Error {
  public redirectUrl?: string;

  constructor(message: string, { redirectUrl }: SessionErrorOptions) {
    super(message);
    this.redirectUrl = redirectUrl;
  }
}

export function handleError(
  error: unknown,
  defaultMessage: string = t("error_occurred")
): never {
  if (error instanceof SessionError) {
    // Re-throw a new SessionError with the same details
    throw new SessionError(error.message, {
      redirectUrl: error.redirectUrl,
    });
  }

  // Otherwise, throw a generic error with a default or custom message
  throw new Error(defaultMessage);
}
