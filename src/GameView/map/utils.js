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
        buildings: {},
      });
    }
    grid.push(row);
  }
  return grid;
};


export const industrialItems = {
  base: {
    cost: {
      steel: 25,
      energy: 75,
      carbon: 15,
    },
    icon: 'home',
    displayName: 'Base',
    description: 'Required to gain controll',
    type: 'base',
  },
  ironMine: {
    cost: {
      steel: 35,
      energy: 50,
    },
    icon: 'cubes',
    displayName: 'Iron Mine',
    description: 'Mines iron from your astroid',
    type: 'mine',
  },
  goldMine: {
    cost: {
      steel: 35,
      energy: 50,
    },
    icon: 'cubes',
    displayName: 'Gold Mine',
    description: 'Mines gold from your astroid',
    type: 'mine',
  },
  silverMine: {
    cost: {
      steel: 35,
      energy: 50,
    },
    icon: 'cubes',
    displayName: 'Silver Mine',
    description: 'Mines silver from your astroid',
    type: 'mine',
  },
  nickelMine: {
    cost: {
      steel: 35,
      energy: 50,
    },
    icon: 'cubes',
    displayName: 'Nickel Mine',
    description: 'Mines nickel from your astroid',
    type: 'mine',
  },
  carbonMine: {
    cost: {
      steel: 35,
      energy: 50,
    },
    icon: 'cubes',
    displayName: 'Carbon Mine',
    description: 'Mines carbon from your astroid',
    type: 'mine',
  },
  hydrogenMine: {
    cost: {
      steel: 35,
      energy: 50,
    },
    icon: 'cubes',
    displayName: 'Hydrogen Mine',
    description: 'Mines hydrogen from your astroid',
    type: 'mine',
  },
  platinumMine: {
    cost: {
      steel: 35,
      energy: 50,
    },
    icon: 'cubes',
    displayName: 'Platinum Mine',
    description: 'Mines platinum from your astroid',
    type: 'mine',
  },
  siliconMine: {
    cost: {
      steel: 35,
      energy: 50,
    },
    icon: 'cubes',
    displayName: 'Silicon Mine',
    description: 'Mines silicon from your astroid',
    type: 'mine',
  },
  copperMine: {
    cost: {
      steel: 35,
      energy: 50,
    },
    icon: 'cubes',
    displayName: 'Copper Mine',
    description: 'Mines copper from your astroid',
    type: 'mine',
  },
  powerPlant: {
    cost: {
      steel: 250,
      copper: 75,
      energy: 150,
    },
    icon: 'lightning',
    displayName: 'Power Plant',
    description: 'Converts carbon into energy',
    type: 'power',
  },
  generator: {
    cost: {
      steel: 100,
      machineParts: 25,
      energy: 100,
    },
    icon: 'lightning',
    displayName: 'Generator',
    description: 'Converts hydrogen into energy',
    type: 'power',
  },
  steelFactory: {
    cost: {
      steel: 500,
      machineParts: 250,
      energy: 300,
    },
    icon: 'factory',
    displayName: 'Steel Factory',
    description: 'Converts iron, nickel, and silver into steel',
    type: 'factory',
  },
  industrialSuppliesFactory: {
    cost: {
      steel: 750,
      machineParts: 350,
      computerHardware: 50,
      silver: 50,
      energy: 500,
    },
    icon: 'factory',
    displayName: 'Industrial Supplies Factory',
    description: 'Manufactures machine parts',
    type: 'factory',
  },
  computerHardwareFactory: {
    cost: {
      steel: 500,
      machineParts: 300,
      computerHardware: 200,
      gold: 200,
      silver: 250,
      platinum: 100,
      energy: 550,
    },
    icon: 'factory',
    displayName: 'Computer Hardware Factory',
    description: 'Manufactures computer hardware',
    type: 'factory',
  },
  solarFarm: {
    cost: {
      steel: 200,
      silicon: 2000,
      computerHardware: 150,
      copper: 200,
      platinum: 50,
      energy: 450,
    },
    icon: 'lightning',
    displayName: 'Solar Farm',
    description: 'Produces energy',
    type: 'power',
  },
};
