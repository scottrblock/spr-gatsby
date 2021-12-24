import { SyntheticEvent, useEffect, useState } from "react";
import React from "react";

import "../App.scss";
import { svgDropShadow } from "../helpers/svg-drop-shadow";
import { Grid, STAGES } from "../helpers/types";
import { bbStyles } from "../helpers/circle-styles";
import {
  gridFromInteger,
  addIntegerFromEnd,
  transposeGrid,
  addAdjacentBox,
  addCirclesUnder,
} from "../helpers/grid-helpers";
import { minMaxPercentage } from "../helpers/numbers";
import DonutChartWrapper from "../components/donut-chart-wrapper";
import Seo from "../components/seo";
import { useMixpanel } from "gatsby-plugin-mixpanel";

const IndexPage = () => {
  const mixpanel = useMixpanel();

  const [startingStack, setStartingStack] = useState(100);
  const [raiseSize, setRaiseSize] = useState(3.0);
  const [flopBetPercentage, setFlopBetPercentage] = useState(100);
  const [turnBetPercentage, setTurnBetPercentage] = useState(100);
  const [riverBetPercentage, setRiverBetPercentage] = useState(100);
  const [showThrough, setShowThrough] = useState(
    Object.keys(STAGES).length - 2
  );

  const potSizeHeadingToFlop = raiseSize * 2.0 + 1;
  const stackHeadingToFlop = startingStack - raiseSize;
  const villainStackHeadingToFlop = startingStack - raiseSize;
  const stackAndPotToFlop =
    potSizeHeadingToFlop + stackHeadingToFlop + villainStackHeadingToFlop;

  const { min: minFlopBet, max: maxFlopBet } = minMaxPercentage(
    potSizeHeadingToFlop,
    stackHeadingToFlop,
    true
  );

  const flopBet = (flopBetPercentage / 100.0) * potSizeHeadingToFlop;
  const potSizeHeadingToTurn = potSizeHeadingToFlop + 2 * flopBet;
  const stackHeadingToTurn = stackHeadingToFlop - flopBet;
  const villainStackHeadingToTurn = villainStackHeadingToFlop - flopBet;

  const { min: minTurnBet, max: maxTurnBet } = minMaxPercentage(
    potSizeHeadingToTurn,
    stackHeadingToTurn,
    true
  );

  const turnBet = (turnBetPercentage / 100.0) * potSizeHeadingToTurn;
  const roundedTurnBet = parseInt(turnBet.toFixed(1));
  const potSizeHeadingToRiver = potSizeHeadingToTurn + 2 * turnBet;
  const stackHeadingToRiver = stackHeadingToTurn - turnBet;
  const villainStackHeadingToRiver = villainStackHeadingToTurn - turnBet;

  const { min: minRiverBet, max: maxRiverBet } = minMaxPercentage(
    potSizeHeadingToRiver,
    stackHeadingToRiver,
    false
  );

  const riverBet = (riverBetPercentage / 100.0) * potSizeHeadingToRiver;
  const roundedRiverBet = parseInt(riverBet.toFixed(1));
  const finalPotSize = potSizeHeadingToRiver + 2 * riverBet;
  const finalStack = stackHeadingToRiver - riverBet;
  const finalVillainStack = villainStackHeadingToRiver - riverBet;

  useEffect(() => {
    setFlopBetPercentage(Math.min(100, maxFlopBet));
    setTurnBetPercentage(Math.min(100, maxTurnBet));
    setRiverBetPercentage(Math.min(100, maxRiverBet));
  }, [startingStack, raiseSize]);

  useEffect(() => {
    setTurnBetPercentage(Math.min(turnBetPercentage, maxTurnBet));
    setRiverBetPercentage(Math.min(riverBetPercentage, maxRiverBet));
  }, [flopBetPercentage]);

  useEffect(() => {
    setFlopBetPercentage(Math.min(flopBetPercentage, maxFlopBet));
    setRiverBetPercentage(Math.min(riverBetPercentage, maxRiverBet));
  }, [turnBetPercentage]);

  useEffect(() => {
    setFlopBetPercentage(Math.min(flopBetPercentage, maxFlopBet));
    setTurnBetPercentage(Math.min(turnBetPercentage, maxTurnBet));
  }, [riverBetPercentage]);

  const stackAndPotGrid: Grid = gridFromInteger(stackAndPotToFlop, "Behind");
  const preflopGrid: Grid = addIntegerFromEnd(
    stackAndPotGrid,
    villainStackHeadingToFlop,
    "VillainBehind",
    "Behind"
  );
  const heroPreGrid: Grid = gridFromInteger(potSizeHeadingToFlop, "Preflop");
  const preFlopPotAndBehindGrid: Grid = transposeGrid(preflopGrid, heroPreGrid);
  const flopBetGrid: Grid = addAdjacentBox(
    preFlopPotAndBehindGrid,
    "Preflop",
    flopBet,
    "FlopBet",
    "Behind"
  );
  const flopCallGrid: Grid = addAdjacentBox(
    flopBetGrid,
    "FlopBet",
    flopBet,
    "FlopCall",
    "VillainBehind"
  );
  const turnBetGrid: Grid = addCirclesUnder(
    flopCallGrid,
    "Preflop",
    roundedTurnBet,
    "TurnBet",
    "Behind"
  );
  const turnCallGrid: Grid = addCirclesUnder(
    turnBetGrid,
    "FlopCall",
    roundedTurnBet,
    "TurnCall",
    "VillainBehind"
  );
  const riverBetGrid: Grid = addIntegerFromEnd(
    turnCallGrid,
    roundedRiverBet,
    "RiverBet",
    "Behind"
  );
  const riverCallGrid: Grid = addIntegerFromEnd(
    riverBetGrid,
    roundedRiverBet,
    "RiverCall",
    "VillainBehind"
  );

  const gridByStatus: { [key: number]: Grid } = {
    0: preFlopPotAndBehindGrid,
    1: flopCallGrid,
    2: turnCallGrid,
    3: riverCallGrid,
  };

  const preflopDonutData = [
    { className: "pre-flop", value: potSizeHeadingToFlop },
  ];
  const behindDonutData = [
    { className: "hero-stack", value: stackHeadingToFlop },
    { className: "villain-stack", value: villainStackHeadingToFlop },
  ];
  const flopDonutData = [
    { className: "flop-bet", value: flopBet },
    { className: "flop-call", value: flopBet },
  ];
  const turnDonutData = [
    { className: "turn-bet", value: turnBet },
    { className: "turn-call", value: turnBet },
  ];
  const riverDonutData = [
    { className: "river-bet", value: riverBet },
    { className: "river-call", value: riverBet },
  ];

  const handleMagicButton = (e: SyntheticEvent) => {
    e.preventDefault();

    setShowThrough(3);
    const potSizeHeadingToFlop = raiseSize * 2.0 + 1;
    const rate = Math.pow(
      (startingStack * 2 + 1) / potSizeHeadingToFlop,
      1.0 / 3.0
    );
    const rawBetPercentage = ((rate - 1) / 2) * 100;
    const betPercentage = parseInt(rawBetPercentage.toFixed());

    const riverBetPercentage =
      rawBetPercentage - betPercentage > 0.24
        ? betPercentage + parseInt((startingStack / 100).toFixed())
        : betPercentage;

    setFlopBetPercentage(betPercentage);
    setTurnBetPercentage(betPercentage);
    setRiverBetPercentage(riverBetPercentage);
  };

  return (
    <div className="App">
      <Seo />
      <header className="App-header">
        <h1>visualize your stack to pot ratio</h1>
        <p>
          change your stack and bet sizes below to see how they affect your spr
        </p>
      </header>
      <main>
        <div className="top-container">
          <div className="radio">
            <div className="radio-title">show through </div>
            {Object.keys(STAGES).map((stage) => (
              <label key={`${stage}`}>
                <input
                  type="radio"
                  name="bet-type"
                  value={STAGES[stage]}
                  checked={showThrough === STAGES[stage]}
                  onChange={(e) => {
                    mixpanel?.track("changeShowThrough");
                    setShowThrough(parseInt(e.target.value));
                  }}
                />
                {stage}
              </label>
            ))}
          </div>
          <div className="top-cols">
            <div className="top-col top-col-right">
              <div className="donut-rings">
                <DonutChartWrapper
                  data={[...preflopDonutData, ...behindDonutData]}
                  stack={villainStackHeadingToFlop}
                  pot={potSizeHeadingToFlop}
                />
                {showThrough >= 1 && (
                  <DonutChartWrapper
                    data={[
                      ...preflopDonutData,
                      ...flopDonutData,
                      ...behindDonutData,
                    ]}
                    stack={villainStackHeadingToTurn}
                    pot={potSizeHeadingToTurn}
                  />
                )}
                {showThrough >= 2 && (
                  <DonutChartWrapper
                    data={[
                      ...preflopDonutData,
                      ...flopDonutData,
                      ...turnDonutData,
                      ...behindDonutData,
                    ]}
                    stack={villainStackHeadingToRiver}
                    pot={potSizeHeadingToRiver}
                  />
                )}

                {showThrough >= 3 && (
                  <DonutChartWrapper
                    data={[
                      ...preflopDonutData,
                      ...flopDonutData,
                      ...turnDonutData,
                      ...riverDonutData,
                      ...behindDonutData,
                    ]}
                    stack={finalVillainStack}
                    pot={finalPotSize}
                  />
                )}
              </div>
            </div>
          </div>
        </div>

        <div className="bottom-cols">
          <div className="bottom-col bottom-col-left">
            <div className="row">
              <button
                onClick={(e) => {
                  mixpanel?.track("clickGeometricGrowth");
                  handleMagicButton(e);
                }}
              >
                ✨ geometric growth of pot
              </button>
            </div>
            <div className="row">
              <div className="left-words">
                <span
                  className="display-text"
                  style={{ color: bbStyles.Behind?.css?.color }}
                >
                  you
                </span>{" "}
                &amp;{" "}
                <span
                  className="display-text"
                  style={{ color: bbStyles.VillainBehind?.css?.color }}
                >
                  villain
                </span>{" "}
                are
              </div>
              <input
                type="number"
                min={10}
                max={1000}
                step={5}
                value={startingStack}
                onFocus={(e) => mixpanel?.track("changeStartingStack")}
                onChange={(e) => setStartingStack(parseInt(e.target.value))}
              />
              bb effective
            </div>
            <div className="row">
              <div className="left-words">
                you{" "}
                <span className="display-text" style={bbStyles.Preflop?.css}>
                  raise to
                </span>
              </div>
              <input
                type="number"
                value={raiseSize}
                min={2}
                max={10}
                step={1}
                onFocus={(e) => mixpanel?.track("changeRaiseSize")}
                onChange={(e) => setRaiseSize(parseFloat(e.target.value))}
              />
              <span className="display-text" style={bbStyles.Preflop?.css}>
                bb and get called preflop
              </span>
            </div>
            {showThrough >= 1 && (
              <div className="row">
                <div className="left-words">you bet</div>
                <input
                  type="number"
                  value={flopBetPercentage}
                  min={minFlopBet}
                  max={maxFlopBet}
                  step={5}
                  onFocus={(e) => mixpanel?.track("changeFlopBet")}
                  onChange={(e) =>
                    setFlopBetPercentage(parseInt(e.target.value))
                  }
                />
                % pot{" "}
                <span style={bbStyles["FlopBet"]?.css} className="display-text">
                  on the flop
                </span>{" "}
                and{" "}
                <span style={bbStyles.FlopCall?.css} className="display-text">
                  get called
                </span>
              </div>
            )}

            {showThrough >= 2 && (
              <div className="row">
                <div className="left-words">you bet</div>
                <input
                  type="number"
                  value={turnBetPercentage}
                  min={minTurnBet}
                  max={maxTurnBet}
                  step={5}
                  onFocus={(e) => mixpanel?.track("changeTurnBet")}
                  onChange={(e) =>
                    setTurnBetPercentage(parseInt(e.target.value))
                  }
                />
                % pot{" "}
                <span style={bbStyles["TurnBet"]?.css} className="display-text">
                  on the turn
                </span>{" "}
                and{" "}
                <span style={bbStyles.TurnCall?.css} className="display-text">
                  get called
                </span>
              </div>
            )}
            {showThrough >= 3 && (
              <div className="row">
                <div className="left-words">you bet</div>
                <input
                  type="number"
                  value={riverBetPercentage}
                  min={minRiverBet}
                  max={maxRiverBet}
                  step={1}
                  onFocus={(e) => mixpanel?.track("changeRiverBet")}
                  onChange={(e) =>
                    setRiverBetPercentage(parseInt(e.target.value))
                  }
                />
                % pot{" "}
                <span style={bbStyles.RiverBet?.css} className="display-text">
                  on the river
                </span>{" "}
                and{" "}
                <span style={bbStyles.RiverCall?.css} className="display-text">
                  get called
                </span>
              </div>
            )}
          </div>
          <div className="bottom-col bottom-col-right">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox={`0 0 ${gridByStatus[showThrough].length} ${
                gridByStatus[showThrough].length + 3
              }`}
            >
              {svgDropShadow}

              {gridByStatus[showThrough].map((row, x) =>
                row.map((bb, y) => {
                  const r = 1;
                  return (
                    <circle
                      key={`${x}-${y}`}
                      cx={r * x + 0.5}
                      cy={r * y + 0.5}
                      r={`${r / 2}`}
                      {...bbStyles[bb.status].svg}
                    />
                  );
                })
              )}
            </svg>
          </div>
        </div>
      </main>
      <footer>
        <div>
          <p>this site is built with React.js and heavily utilizes SVGs</p>
          <p>you might notice there are some rounding errors</p>
          <p>
            the source code is{" "}
            <a href="https://github.com/scottrblock/spr-gatsby">
              available here
            </a>
          </p>
          <p>
            for custom visualizations or advertising, please{" "}
            <a href="mailto:hello@stacktopotratio.com">get in touch</a>
          </p>
        </div>
      </footer>
    </div>
  );
};

export default IndexPage;
