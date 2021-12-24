import { prettyNumber } from "../helpers/numbers";
import DonutChart from "react-donut-chart";
import { bbStyles } from "../helpers/circle-styles";
import { BB } from "../helpers/types";
import React from "react";

type PieData = {
  className: string;
  value: number;
};

type DonutChartProps = {
  stack: number;
  pot: number;
  data: PieData[];
};

const donutProps = {
  legend: false,
  width: 175,
  height: 175,
  strokeColor: "#ccc",
  clickToggle: false,
  selectedOffset: 0,
  emptyOffset: 0,
  toggledOffset: 0,
  className: "d-chart",
  startAngle: -105,
  formatValues: (values: number, total: number) => {
    return ``;
  },
};

const donutColors: { [key in BB["status"]]?: string[] } = {
  Preflop: [
    bbStyles.Preflop.svg.fill,
    bbStyles.Behind.svg.fill,
    bbStyles.VillainBehind.svg.fill,
  ],

  FlopCall: [
    bbStyles.Preflop.svg.fill,
    bbStyles.FlopBet.svg.fill,
    bbStyles.FlopCall.svg.fill,
    bbStyles.Behind.svg.fill,
    bbStyles.VillainBehind.svg.fill,
  ],

  TurnCall: [
    bbStyles.Preflop.svg.fill,
    bbStyles.FlopBet.svg.fill,
    bbStyles.FlopCall.svg.fill,
    bbStyles.TurnBet.svg.fill,
    bbStyles.TurnCall.svg.fill,
    bbStyles.Behind.svg.fill,
    bbStyles.VillainBehind.svg.fill,
  ],

  RiverCall: [
    bbStyles.Preflop.svg.fill,
    bbStyles.FlopBet.svg.fill,
    bbStyles.FlopCall.svg.fill,
    bbStyles.TurnBet.svg.fill,
    bbStyles.TurnCall.svg.fill,
    bbStyles.RiverBet.svg.fill,
    bbStyles.RiverCall.svg.fill,
    bbStyles.Behind.svg.fill,
    bbStyles.VillainBehind.svg.fill,
  ],
};

const dataSizeToColors: (dataSize: number) => string[] = function (
  dataSize: number
) {
  if (dataSize === 3) {
    return donutColors.Preflop as string[];
  }
  if (dataSize === 5) {
    return donutColors.FlopCall as string[];
  }
  if (dataSize === 7) {
    return donutColors.TurnCall as string[];
  }
  if (dataSize === 9) {
    return donutColors.RiverCall as string[];
  }

  return [];
};

const dataSizeToLabel: (dataSize: number) => string = function (
  dataSize: number
) {
  if (dataSize === 3) {
    return "preflop";
  } else if (dataSize === 5) {
    return "flop";
  } else if (dataSize === 7) {
    return "turn";
  }

  return "river";
};

const addLabel = (data: PieData[]) => {
  return data.map((d) => {
    return { ...d, label: "" };
  });
};

const DonutChartWrapper = (props: DonutChartProps) => {
  const { stack, pot, data } = props;
  const safeStack = stack > 0 ? stack : 0;
  const safePot = pot > 0 ? pot : 0;

  return (
    <div className="donut-ring">
      <div className="donut-ring-top">
        <DonutChart
          {...donutProps}
          colors={dataSizeToColors(data.length)}
          data={addLabel(data)}
        />
        <table className="donut-table">
          <tbody>
            <tr>
              <td className="spr-key">stack</td>
              <td className="spr-value">{safeStack.toFixed(0)}</td>
            </tr>
            <tr>
              <td className="spr-key">pot</td>
              <td className="spr-value">{safePot.toFixed(0)}</td>
            </tr>

            <tr>
              <td className="spr-key">spr</td>
              <td className="spr-value">
                <span className="output output-spr">
                  {safeStack > 0 ? prettyNumber(safeStack / pot) : ""}
                </span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div className="donut-ring-bottom">
        <div className="donut-ring-bottom-label">
          {dataSizeToLabel(data.length)}
        </div>
      </div>
    </div>
  );
};

export default DonutChartWrapper;
