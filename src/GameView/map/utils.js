function validate(arr) {
  return (arr[0] >= 0 && arr[1] >= 0 && arr[0] < 20 && arr[1] < 20);
}

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

export const defaultGrid = () => {
  const grid = [];
  for (let x = 0; x < 20; x++) {
    const row = [];
    for (let y = 0; y < 20; y++) {
      const position = [x, y];
      const status = (position.join() === '8,8') ? 'visible' : 'hidden';
      row.push({
        position,
        status,
        number: (y + 1) + (x * 20),
      });
    }
    grid.push(row);
  }
  return grid;
};
