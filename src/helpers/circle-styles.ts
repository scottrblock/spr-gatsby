import { BB } from "./types";
import * as CSS from "csstype";
import colors from "tailwind-colors";

export const bbStyles: {
  [key in BB["status"]]: {
    svg: { fill: string; filter?: string };
    css: CSS.Properties;
    donutColors?: string[];
  };
} = {
  Behind: {
    svg: {
      fill: colors.blue["300"],
    },
    css: {
      color: colors.blue["300"],
    },
  },

  VillainBehind: {
    svg: {
      fill: colors.red["300"],
    },
    css: {
      color: colors.red["300"],
    },
  },

  Preflop: {
    svg: {
      fill: colors.green["400"],
      filter: "url(#inset-shadow)",
    },

    css: {
      color: colors.green["400"],
      borderColor: colors.green["400"],
    },
  },

  FlopBet: {
    svg: {
      fill: colors.indigo["600"],
      filter: "url(#inset-shadow)",
    },
    css: {
      color: colors.indigo["600"],
    },
  },

  FlopCall: {
    svg: {
      fill: colors.orange["500"],
      filter: "url(#inset-shadow)",
    },
    css: {
      color: colors.orange["500"],
    },
  },

  TurnBet: {
    svg: {
      fill: colors.purple["400"],
      filter: "url(#inset-shadow)",
    },
    css: {
      color: colors.purple["400"],
    },
  },

  TurnCall: {
    svg: {
      fill: colors.yellow["500"],
      filter: "url(#inset-shadow)",
    },
    css: {
      color: colors.yellow["500"],
    },
  },

  RiverBet: {
    svg: { fill: colors.pink["600"], filter: "url(#inset-shadow)" },
    css: {
      color: colors.pink["600"],
    },
  },

  RiverCall: {
    svg: { fill: colors.red["800"], filter: "url(#inset-shadow)" },
    css: { color: colors.red["800"] },
  },
};
