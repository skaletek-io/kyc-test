interface ErrorWithRedirect {
  redirectUrl?: string;
}

export function redirectOnError(error: ErrorWithRedirect): void {
  console.log("Redirect", { error }, error.redirectUrl);
  if (error.redirectUrl) {
    window.location.replace(error.redirectUrl);
  }
}
