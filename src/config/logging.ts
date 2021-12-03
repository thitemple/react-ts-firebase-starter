const DEFAULT_NAMESPACE = "Client";

function info(message: string | unknown, namespace?: string): void {
  if (typeof message === "string") {
    console.log(
      `[${getDate()}] [${namespace ?? DEFAULT_NAMESPACE}] [INFO] ${message}`
    );
  } else {
    console.log(
      `[${getDate()}] [${namespace ?? DEFAULT_NAMESPACE}] [INFO]`,
      message
    );
  }
}

function warn(message: string | unknown, namespace?: string): void {
  if (typeof message === "string") {
    console.log(
      `[${getDate()}] [${namespace ?? DEFAULT_NAMESPACE}] [WARN] ${message}`
    );
  } else {
    console.log(
      `[${getDate()}] [${namespace ?? DEFAULT_NAMESPACE}] [WARN]`,
      message
    );
  }
}

function error(message: string | unknown, namespace?: string): void {
  if (typeof message === "string") {
    console.log(
      `[${getDate()}] [${namespace ?? DEFAULT_NAMESPACE}] [ERROR] ${message}`
    );
  } else {
    console.log(
      `[${getDate()}] [${namespace ?? DEFAULT_NAMESPACE}] [ERROR]`,
      message
    );
  }
}

function getDate(): string {
  return new Date().toISOString();
}

const logging = { info, warn, error };

export default logging;
