import * as React from "react";
import { connect } from "react-redux";

import { State } from "../models";

const BEE_PHRASES = [
  "noooo not the bees!",
  "getem off me getem off me",
  "aaaaaaghghghghhh",
  "ohhh no my eyes my eyes aggggghhhh",
];

type RandomFunction = () => number;

interface StatusEffectProps {
  random?: RandomFunction;
  statusEffects: string[];
}

export const StatusEffectBase: React.StatelessComponent<StatusEffectProps> = ({
  children,
  random = Math.random,
  statusEffects,
  ...rest
}) => {
  if (!statusEffects.length) {
    return <span>{children}</span>;
  }

  const panicking = statusEffects.includes("panic");
  const onFire = statusEffects.includes("fire");
  const confused = statusEffects.includes("confusion");
  const bees = statusEffects.includes("bees");

  let result = children;
  if (confused) {
    result = shuffleWords(random, result);
  }
  if (panicking) {
    result = panic(random, result);
  }
  if (bees) {
    result = beeAttack(random, result);
  }
  return (
    <span
      {...rest}
      style={Object.assign(
        {},
        onFire && styles.fire,
        panicking && styles.panic,
      )}
    >
      {result}
    </span>
  );
};

export function shuffleWords(
  random: RandomFunction,
  children: React.ReactNode,
): React.ReactNode {
  function shuffle(phrase: string) {
    if (phrase.length < 3) {
      return phrase;
    }
    const head = phrase[0];
    const tail = phrase[phrase.length - 1];
    const body = phrase.slice(1, phrase.length - 1).split("");
    let i = body.length;
    while (--i) {
      const j = Math.floor(random() * (i + 1));
      const a = body[i];
      body[i] = body[j];
      body[j] = a;
    }
    return head + body.join("") + tail;
  }

  return React.Children.map(children, child => {
    if (typeof child === "string") {
      return child
        .split(" ")
        .map(spaced => {
          return spaced
            .split(".")
            .map(dotted => {
              return dotted
                .split("-")
                .map(dashed => {
                  return shuffle(dashed);
                })
                .join("-");
            })
            .join(".");
        })
        .join(" ");
    }
    return child;
  });
}

export function panic(
  random: RandomFunction,
  children: React.ReactNode,
): React.ReactNode[] {
  return React.Children.map(children, child => {
    if (typeof child === "string") {
      return child
        .split(" ")
        .map(word => {
          if (random() < 0.05) {
            return "a".repeat(word.length);
          }
          if (word[word.length - 1] !== ".") {
            return word;
          }
          return word.substr(0, word.length - 1) + "!";
        })
        .join(" ");
    }
    return child;
  });
}

export function beeAttack(
  random: RandomFunction,
  children: React.ReactNode,
): React.ReactNode[] {
  return React.Children.map(children, child => {
    if (typeof child === "string") {
      return child
        .split(" ")
        .map(word => {
          if (word.length < 3) {
            return word;
          }
          if (random() < 0.1) {
            return "b" + "z".repeat(word.length - 1);
          }
          if (random() < 0.06) {
            return `${word} ${
              BEE_PHRASES[Math.floor(random() * BEE_PHRASES.length)]
            }`;
          }
          return word;
        })
        .join(" ");
    }
    return child;
  });
}

export const StatusEffect = connect(
  (state: State) => ({
    statusEffects: state.ui.statusEffects,
  }),
  {},
)(StatusEffectBase);

const styles = {
  fire: {
    color: "red",
  },
  panic: {
    textTransform: "uppercase",
  },
};
