function validate(arr) {
  return (arr[0] >= 0 && arr[1] >= 0 && arr[0] < 20 && arr[1] < 20);
}

function calculateNeighbors(x, y) {
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

function calculateAbundance() {
  const abundantResources = [];

  const commonNumber = Math.random();
  if (commonNumber < 0.15) {
    abundantResources.push('carbon');
  } else if (commonNumber < 0.3) {
    abundantResources.push('silicon');
  } else if (commonNumber < 0.5) {
    abundantResources.push('hydrogen');
  }

  const rareNumber = Math.random();
  if (rareNumber < 0.1) {
    abundantResources.push('iron');
  } else if (rareNumber < 0.22) {
    abundantResources.push('nickel');
  } else if (rareNumber < 0.34) {
    abundantResources.push('copper');
  } else if (rareNumber < 0.42) {
    abundantResources.push('silver');
  } else if (rareNumber < 0.46) {
    abundantResources.push('gold');
  } else if (rareNumber < 0.48) {
    abundantResources.push('platinum');
  }

  return abundantResources;
}

const defaultGrid = () => {
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
        buildings: {},
        resourceAbundance: calculateAbundance(),
      });
    }
    grid.push(row);
  }
  return grid;
};

module.exports = { calculateNeighbors, defaultGrid };
