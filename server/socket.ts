import "./polyfills";

import WebSocket from "ws";
import { flatten, last, union } from "lodash";

import * as messageActions from "./actions/messageActions";
import configureStore from "./configureStore";
import { State, TransactionState } from "./models";
import { Store } from "redux";

import fixtureAttackBees from "./fixtures/fixtureAttackBees";
import fixtureAttackedByBees from "./fixtures/fixtureAttackedByBees";
import fixtureAttackEnemyFailure from "./fixtures/fixtureAttackEnemyFailure";
import fixtureAttackEnemySuccess from "./fixtures/fixtureAttackEnemySuccess";
import fixtureBeesGone from "./fixtures/fixtureBeesGone";
import fixtureBeesPanic from "./fixtures/fixtureBeesPanic";
import fixtureBeesPanicGone from "./fixtures/fixtureBeesPanicGone";
import fixtureEnemyAttack from "./fixtures/fixtureEnemyAttack";
import fixtureInventoryAdd from "./fixtures/fixtureInventoryAdd";
import fixtureInventoryRemove from "./fixtures/fixtureInventoryRemove";
import fixtureMovePlayer from "./fixtures/fixtureMovePlayer";
import fixtureMovePlayerBack from "./fixtures/fixtureMovePlayerBack";
import fixtureNotConfused from "./fixtures/fixtureNotConfused";
import fixtureNotOnFire from "./fixtures/fixtureNotOnFire";
import fixtureNotPanicking from "./fixtures/fixtureNotPanicking";
import fixtureOpenContainer from "./fixtures/fixtureOpenContainer";
import fixtureOpenUnlockedContainer from "./fixtures/fixtureOpenUnlockedContainer";
import fixtureOtherPlayerSay from "./fixtures/fixtureOtherPlayerSay";
import fixturePanicking from "./fixtures/fixturePanicking";
import fixturePlayerSay from "./fixtures/fixturePlayerSay";
import fixtureUnlockContainer from "./fixtures/fixtureUnlockContainer";

import fixtureServerState from "./fixtures/fixtureServerState";

interface MessageOptions {
  initial?: boolean;
}

interface Message {
  payload?: {
    command?: string;
  };
}

const startServer = server => {
  const webSocketServer = new WebSocket.Server({ server });
  const store = configureStore();
  store.dispatch(messageActions.setState(fixtureServerState));
  webSocketServer.on("connection", (socket) => socketHandler(socket, store));
}

const socketHandler = (webSocket: WebSocket, store: Store<State>) => {
  const userId = "17";
  let currentTransactions: TransactionState;
  sendMessage(webSocket, getInitialState(store.getState(), userId), {
    initial: true,
  });

  const unsubscribe = store.subscribe(() => {
    const newTransactions = store.getState().transactions;
    if (currentTransactions === newTransactions) {
      return;
    }

    const transaction = last(newTransactions);
    if (transaction.owner === userId) {
      sendMessage(webSocket, {
        entities: transaction.entities,
        message: transaction.messages.owner,
      });
    }
  });

  webSocket.on("message", message => {
    const command = parseMessage(message);
    if (!command) {
      return;
    }

    switch (command) {
      case "attack hiro":
      case "kill hiro":
        sendMessage(webSocket, fixtureAttackEnemySuccess);
        return setTimeout(() => {
          sendMessage(webSocket, fixtureEnemyAttack);
          setTimeout(() => {
            sendMessage(webSocket, fixtureNotConfused);
          }, 15000);
        }, 2000);
      case "attack raven":
      case "kill raven":
        sendMessage(webSocket, fixtureAttackEnemyFailure);
        return setTimeout(() => {
          sendMessage(webSocket, fixturePanicking);
          setTimeout(() => {
            sendMessage(webSocket, fixtureNotOnFire);
            setTimeout(() => {
              sendMessage(webSocket, fixtureNotPanicking);
            }, 10000);
          }, 10000);
        }, 5000);
      case "attack bees":
      case "kill bees":
        sendMessage(webSocket, fixtureAttackBees);
        return setTimeout(() => {
          sendMessage(webSocket, fixtureAttackedByBees);
          setTimeout(() => {
            sendMessage(webSocket, fixtureBeesPanic);
            setTimeout(() => {
              sendMessage(webSocket, fixtureBeesGone);
              setTimeout(() => {
                sendMessage(webSocket, fixtureBeesPanicGone);
              }, 15000);
            }, 15000);
          }, 5000);
        }, 3000);
      case "n":
      case "north":
      case "walk n":
      case "walk north":
      case "run":
        return sendMessage(webSocket, fixtureMovePlayer);
      case "s":
      case "south":
      case "walk s":
      case "walk south":
        return sendMessage(webSocket, fixtureMovePlayerBack);
      case "open small-mailbox":
      case "open floor/small-mailbox":
        return sendMessage(webSocket, fixtureOpenContainer);
      case "open usb-drive":
      case "open floor/usb-drive":
        return sendMessage(webSocket, fixtureOpenUnlockedContainer);
      case "help":
        return sendMessage(webSocket, {
          message: `Available commands:
            attack hiro
            attack raven
            attack bees
            transfer self/docs/readme.txt to self/hacks
            n
            north
            s
            south
            use tmp
            take tmp
            say something`,
        });
      case "use tmp":
        return sendMessage(webSocket, fixtureInventoryRemove);
      case "say something":
        sendMessage(webSocket, fixturePlayerSay);
        return setTimeout(() => {
          sendMessage(webSocket, fixtureOtherPlayerSay);
        }, 1000);
      case "take tmp":
        return sendMessage(webSocket, fixtureInventoryAdd);
      case "unlock usb-drive":
      case "unlock floor/usb-drive":
        return sendMessage(webSocket, fixtureUnlockContainer);
      default:
        if (/^(transfer|move|take|drop|give)/.test(command)) {
          // tslint:disable-next-line no-any
          return store.dispatch<any>(
            messageActions.parseCommand(command, userId),
          );
        }
        return sendMessage(webSocket, {
          message: `I don't know how to ${command}.`,
        });
    }
  });

  webSocket.on("close", () => {
    unsubscribe();
    webSocket.removeAllListeners("on");
    webSocket.removeAllListeners("close");
    webSocket.removeAllListeners("message");
  });
});

function getInitialState(state: State, userId: string) {
  function getEntityTree(entityIds: string[]): string[] {
    return flatten(
      entityIds.map(entityId => {
        const entity = state.entities[entityId];
        return entity.entities.length
          ? getEntityTree(entity.entities).concat(entityId)
          : entityId;
      }),
    ) as string[];
  }

  const user = state.entities[userId];
  // TODO add "parentId" to entities and it'll fix a lot of these linear operations... at the cost
  // of larger state deltas
  const location = Object.values(state.entities).find(entity =>
    entity.entities.includes(userId),
  );
  const ids = union(
    union([userId, location.id], getEntityTree(user.entities)),
    getEntityTree(location.entities),
  );
  return {
    availableCommands: state.command.available,
    entities: Object.keys(state.entities).filter(id => ids.includes(id)),
    location: location.set(
      "entities",
      location.entities.filter(entityId => entityId !== userId),
    ),
    message: location.description,
    player: userId,
  };
}

function parseMessage(jsonMessage: string): string | null {
  try {
    const message: Message = JSON.parse(jsonMessage);
    return message.payload.command.trim().toLowerCase();
  } catch (err) {
    return null;
  }
}

// TODO reconcile immutable message with JS fixtures to get rid of any type
// (after replacing all fixtures)
// tslint:disable-next-line no-any
function sendMessage(
  webSocket: WebSocket,
  payload: any,
  opts: MessageOptions = {},
) {
  webSocket.send(
    JSON.stringify({
      meta: {
        initial: opts.initial,
      },
      payload,
    }),
  );
}
