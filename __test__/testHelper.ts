// tslint:disable-next-line no-any
const glob: any = global;

glob.WebSocket = () => {
  return {
    onmessage() {
      // stubbed
    },
    onopen() {
      // stubbed
    },
    send() {
      // stubbed
    },
  };
};

glob.navigator = {
  userAgent:
    "Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/49.0.2454.85\
 Safari/537.36",
};

import "../client/polyfills";
