export type BB = {
  status:
    | "Behind"
    | "VillainBehind"
    | "Preflop"
    | "FlopBet"
    | "FlopCall"
    | "TurnBet"
    | "TurnCall"
    | "RiverBet"
    | "RiverCall";
};

export type Grid = BB[][];

export const STAGES: { [key: string]: number } = { preflop: 0, flop: 1, turn: 2, river: 3 };
