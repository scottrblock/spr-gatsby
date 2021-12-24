import { BB, Grid } from "./types";

export const gridFromInteger = (startingNumber: number, status: BB["status"]): Grid => {
  const sqrtInt = Math.floor(Math.sqrt(startingNumber));

  const grid: Grid = new Array(sqrtInt).fill(null).map(() =>
    new Array(sqrtInt).fill({
      status: status,
    })
  );

  const leftovers = startingNumber - sqrtInt * sqrtInt;
  for (let i = 0; i < leftovers; i++) {
    if (i < sqrtInt) {
      grid[i][sqrtInt] = { status };
    } else {
      grid[i % sqrtInt][sqrtInt + 1] = { status };
    }
  }

  return grid;
};

export const addIntegerFromEnd = (base: Grid, newCircles: number, status: BB["status"], paintOver: BB["status"]) => {
  const grid: Grid = base.map((o) => [...o]);

  let rendered = 0;
  for (var x = grid.length - 1; x >= 0; x--) {
    const rows = grid[x];
    for (var y = rows.length - 1; y >= 0; y--) {
      if (rendered < newCircles && grid[x][y].status === paintOver) {
        grid[x][y] = { status };

        rendered++;
      }
    }
  }

  return grid;
};

export const transposeGrid = (base: Grid, newLayer: Grid, xOffset?: number, yOffset?: number): Grid => {
  const grid: Grid = base.map((o) => [...o]);
  let leftovers = 0;
  newLayer.forEach((oneD: BB[], i) => {
    oneD.forEach((bb: BB, j) => {
      const xIndex = i + (xOffset || 0);
      const yIndex = j + (yOffset || 0);

      if (xIndex >= grid.length || yIndex >= grid[xIndex].length) {
        leftovers++;
      } else {
        grid[xIndex][yIndex] = bb;
      }
    });
  });

  return grid;
};

export const addCirclesUnder = (
  startingGrid: Grid,
  parkUnder: BB["status"],
  newCircles: number,
  newStatus: BB["status"],
  paintOver: BB["status"]
): Grid => {
  const grid: Grid = startingGrid.map((o) => [...o]);

  const startingX = grid.findIndex((col) => col.filter((c) => c.status === parkUnder).length > 0);
  const startingY = grid[startingX].filter((c) => c.status === parkUnder).length;

  const endingY = startingY + parseInt(Math.sqrt(newCircles).toString());
  let remaining = newCircles;

  // debugger;
  for (var i = startingX; i < startingGrid.length; i++) {
    for (var j = startingY; j < endingY; j++) {
      if (remaining > 0 && grid[i][j]?.status === paintOver) {
        grid[i][j] = { status: newStatus };
        remaining = remaining - 1;
      }
    }
  }

  if (remaining > 0) {
    for (var i = 0; i < startingGrid.length; i++) {
      for (var j = 0; j < startingGrid[i].length; j++) {
        if (grid[i][j]?.status === paintOver && remaining > 0) {
          grid[i][j] = { status: newStatus };
          remaining = remaining - 1;
        }
      }
    }
  }

  return grid;
};

export const addAdjacentBox = (
  startingGrid: Grid,
  parkNextTo: BB["status"],
  newCircles: number,
  newStatus: BB["status"],
  paintOver: BB["status"]
): Grid => {
  const grid: Grid = startingGrid.map((o) => [...o]);

  const fullColumn = Math.max(...startingGrid.map((col) => col.filter((bb) => bb["status"] === parkNextTo).length));

  let remaining = newCircles;
  let up: Boolean = true;

  for (var i = 0; i < startingGrid.length; i++) {
    const col = startingGrid[i];
    const existing = col.filter((bb) => bb["status"] === parkNextTo).length;

    for (var j = up ? fullColumn : existing; up ? j >= 0 : j < col.length; up ? j-- : j++) {
      const bb: BB = col[j];

      if (j < fullColumn && bb?.status === paintOver && remaining > 0) {
        grid[i][j] = { status: newStatus };
        remaining = remaining - 1;
      }
    }

    up = !up;
  }

  if (remaining > 0) {
    for (var i = startingGrid.length - 1; i >= 0; i--) {
      const col = startingGrid[i];
      for (var j = 0; j < col.length / 2; j++) {
        const bb: BB = col[j];

        if (bb.status === paintOver && remaining > 0) {
          grid[i][j] = { status: newStatus };
          remaining--;
        }
      }
    }
  }

  if (remaining > 0) {
    for (var i = 0; i < startingGrid.length; i++) {
      const col = startingGrid[i];
      for (var j = 0; j < col.length; j++) {
        const bb: BB = col[j];

        if (bb.status === paintOver && remaining > 0) {
          grid[i][j] = { status: newStatus };
          remaining--;
        }
      }
    }
  }

  return grid;
};
