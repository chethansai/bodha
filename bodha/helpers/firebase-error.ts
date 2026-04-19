export function formatFirebaseError(error: unknown, fallbackMessage: string): string {
  if (!(error instanceof Error)) {
    return fallbackMessage;
  }

  const message = error.message.trim();

  if (!__DEV__) {
    return fallbackMessage;
  }

  if (!message) {
    return fallbackMessage;
  }

  return `${fallbackMessage} ${message}`;
}