function validate(arr) {
  return (arr[0] >= 0 && arr[1] >= 0 && arr[0] < 20 && arr[1] < 20);
}

export const defaultGrid = () => {
  const grid = [];
  const neighbors = calculateNeighbors(8, 8).map(pos => pos.join());
  for (let x = 0; x < 20; x++) {
    const row = [];
    for (let y = 0; y < 20; y++) {
      const position = [x, y];
      const status = (position.join() === '8,8') ? 'selected' :
        neighbors.indexOf(position.join()) > -1 ? 'bordered' : 'hidden';
      row.push({
        position,
        status,
      });
    }
    grid.push(row);
  }
  return grid;
};

export function calculateNeighbors(x, y) {
  if (x % 2 === 0) {
    // even
    return [
      [x - 1, y],
      [x, y - 1],
      [x + 1, y],
      [x + 1, y + 1],
      [x, y + 1],
      [x - 1, y + 1],
    ].filter(validate);
  }

  // odd
  return [
    [x - 1, y - 1],
    [x, y - 1],
    [x + 1, y],
    [x + 1, y - 1],
    [x, y + 1],
    [x - 1, y],
  ].filter(validate);
}

// export const grid = blankGrid.map((row, x) => (
//   row.map((hex, y) => ({
//     position: `${x}-${y}`,
//     status: 'hidden',
//     neighbors: calculateNeighbors(x, y),
//   }))
// ));
