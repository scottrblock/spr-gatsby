import colors from "tailwind-colors";
import React from "react";

export const svgDropShadow = (
  <>
    <defs>
      <linearGradient id="preflopGradient" gradientTransform="rotate(90)">
        <stop offset="5%" stopColor={colors.green["400"]} />
        <stop offset="50%" stopColor={colors.green["500"]} />
        <stop offset="95%" stopColor={colors.green["400"]} />
      </linearGradient>

      <linearGradient id="flopBetGradient" gradientTransform="rotate(90)">
        <stop offset="5%" stopColor={colors.indigo["600"]} />
        <stop offset="50%" stopColor={colors.indigo["700"]} />
        <stop offset="95%" stopColor={colors.indigo["600"]} />
      </linearGradient>

      <linearGradient id="flopCallGradient" gradientTransform="rotate(90)">
        <stop offset="5%" stopColor={colors.orange["500"]} />
        <stop offset="50%" stopColor={colors.orange["600"]} />
        <stop offset="95%" stopColor={colors.orange["500"]} />
      </linearGradient>

      <linearGradient id="turnBetGradient" gradientTransform="rotate(90)">
        <stop offset="5%" stopColor={colors.purple["400"]} />
        <stop offset="50%" stopColor={colors.purple["500"]} />
        <stop offset="95%" stopColor={colors.purple["400"]} />
      </linearGradient>

      <linearGradient id="turnCallGradient" gradientTransform="rotate(90)">
        <stop offset="5%" stopColor={colors.yellow["500"]} />
        <stop offset="50%" stopColor={colors.yellow["600"]} />
        <stop offset="95%" stopColor={colors.yellow["500"]} />
      </linearGradient>

      <linearGradient id="turnCallGradient" gradientTransform="rotate(90)">
        <stop offset="5%" stopColor={colors.yellow["600"]} />
        <stop offset="50%" stopColor={colors.yellow["700"]} />
        <stop offset="95%" stopColor={colors.yellow["600"]} />
      </linearGradient>

      <linearGradient id="riverBetGradient" gradientTransform="rotate(90)">
        <stop offset="5%" stopColor={colors.pink["600"]} />
        <stop offset="50%" stopColor={colors.pink["700"]} />
        <stop offset="95%" stopColor={colors.pink["600"]} />
      </linearGradient>

      <linearGradient id="riverCallGradient" gradientTransform="rotate(90)">
        <stop offset="5%" stopColor={colors.red["800"]} />
        <stop offset="50%" stopColor={colors.red["900"]} />
        <stop offset="95%" stopColor={colors.red["800"]} />
      </linearGradient>

      <filter id="inset-shadow">
        <feOffset dx="0" dy="0" />
        <feGaussianBlur stdDeviation=".2" result="offset-blur" />
        <feComposite
          operator="out"
          in="SourceGraphic"
          in2="offset-blur"
          result="inverse"
        />
        <feFlood floodColor="black" floodOpacity=".75" result="color" />
        <feComposite operator="in" in="color" in2="inverse" result="shadow" />
        <feComposite operator="over" in="shadow" in2="SourceGraphic" />
      </filter>

      <filter id="inset-shadow-xl">
        <feOffset dx="0" dy="0" />
        <feGaussianBlur stdDeviation=".25" result="offset-blur" />
        <feComposite
          operator="out"
          in="SourceGraphic"
          in2="offset-blur"
          result="inverse"
        />
        <feFlood floodColor="black" floodOpacity=".75" result="color" />
        <feComposite operator="in" in="color" in2="inverse" result="shadow" />
        <feComposite operator="over" in="shadow" in2="SourceGraphic" />
      </filter>
    </defs>
  </>
);
