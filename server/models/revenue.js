const Game = require('./Game');

const AWAY_INTERVAL = process.env.AWAY_INTERVAL;
const TURN_INTERVAL = process.env.TURN_INTERVAL;

const resourceMultiplier = {
  energy: 1,
  iron: 2,
  gold: 0.5,
  silver: 0.75,
  nickel: 2.5,
  carbon: 5,
  hydrogen: 10,
  platinum: 0.25,
  silicon: 8,
  copper: 4,
  steel: 2.5,
  machineParts: 1,
  computerHardware: 1,
}

const resourceList = [
  'energy',
  'iron',
  'gold',
  'silver',
  'nickel',
  'carbon',
  'hydrogen',
  'platinum',
  'silicon',
  'copper',
  'steel',
  'machineParts',
  'computerHardware',
];

const buildingRevenue = {
  'ironMine': {
    cost: null,
    output: "iron",
    levelBonus: { 1: 1 },
  },
  'goldMine': {
    cost: null,
    output: "gold",
    levelBonus: { 1: 1 },
  },
  'silverMine': {
    cost: null,
    output: "silver",
    levelBonus: { 1: 1 },
  },
  'nickelMine': {
    cost: null,
    output: "nickel",
    levelBonus: { 1: 1 },
  },
  'carbonMine': {
    cost: null,
    output: "carbon",
    levelBonus: { 1: 1 },
  },
  'hydrogenMine': {
    cost: null,
    output: "hydrogen",
    levelBonus: { 1: 1 },
  },
  'platinumMine': {
    cost: null,
    output: "platinum",
    levelBonus: { 1: 1 },
  },
  'siliconMine': {
    cost: null,
    output: "silicon",
    levelBonus: { 1: 1 },
  },
  'copperMine': {
    cost: null,
    output: "copper",
    levelBonus: { 1: 1 },
  },
  'powerPlant': {
    cost: { carbon: 0.5 },
    output: "energy",
    levelBonus: { 1: 1 },
    staticSupply: true,
  },
  'generator': {
    cost: { hydrogen: 1.5 },
    output: "energy",
    levelBonus: { 1: 0.5 },
    staticSupply: true,
  },
  'steelFactory': {
    cost: {
      iron: 1.25,
      nickel: 1,
      silver: 0.25,
      energy: 1,
    },
    output: "steel",
    levelBonus: { 1: 1 },
    staticSupply: true,
  },
  'industrialSuppliesFactory': {
    cost: {
      silicon: 15,
      copper: 12,
      steel: 6,
      energy: 20,
    },
    output: "machineParts",
    levelBonus: { 1: 1 },
    staticSupply: true,
  },
  'computerHardwareFactory': {
    cost: {
      silicon: 50,
      copper: 20,
      gold: 5,
      silver: 8,
      platinum: 4,
      energy: 45,
    },
    output: "computerHardware",
    levelBonus: { 1: 1 },
    staticSupply: true,
  },
  'solarFarm': {
    cost: null,
    output: "energy",
    levelBonus: { 1: 5 },
    staticSupply: true,
  },
}

const producingBuildings = Object.keys(buildingRevenue);

function canAfford(cost, availableResources, production) {
  // console.log('production in canAfford:', production);
  const neededResources = Object.keys(cost);
  let affordable = true;

  for (let i = 0; i < neededResources.length; i++) {
    const resource = neededResources[i];
    if (availableResources[resource] - (cost[resource] * production) < 0) {
      // console.log('resource:', resource);
      // console.log('available - cost:', availableResources[resource] - (cost[resource] * production));
      affordable = false;
    }
  }

  // console.log('cost:', cost);
  // console.log('availableResources:', availableResources);
  // console.log('affordable:', affordable);
  return affordable;
}

function getRevenue(_id) {
  Game.findOne({ _id }, (err, game) => {
    if (err) console.error('error finding game', err);

    const { resources, grid, history } = game;
    const gameHistory = history || [];
    const newResources = resources;
    const income = {};
    const expence = {};
    const change = {};

    grid.forEach((row) => {
      row.forEach((hex) => {
        const { status, resourceAbundance, buildings } = hex;
        if (status === "controlled") {
          Object.keys(buildings).forEach((building) => {
            if (producingBuildings.indexOf(building) > -1) {
              const { level } = buildings[building];
              const { cost, output, levelBonus, staticSupply } = buildingRevenue[building];
              const multiplier = resourceMultiplier[output];
              const techBonus = 1;
              const hexBonus = resourceAbundance.indexOf(multiplier) > -1 ?
                3 :
                1;
              const levelBonusMultiplier = levelBonus[level] || 1;
              const randomMultiplier = staticSupply ? 1 : Math.random();

              const production = randomMultiplier * hexBonus * techBonus * multiplier * levelBonusMultiplier;

              if (cost && canAfford(cost, resources, production)) {
                Object.keys(cost).forEach((resource) => {
                  const resourceExpence = cost[resource] * production;
                  const newBallance = newResources[resource] - resourceExpence;

                  expence[resource] = expence[resource] ? expence[resource] + resourceExpence : resourceExpence;
                  newResources[resource] = newBallance;

                })
                // console.log('output:', output);
                // console.log('production:', production);
                income[output] = income[output] ? income[output] + production : production;
                newResources[output] = newResources[output] + production;
              }

              if (!cost) {
                income[output] = income[output] ? income[output] + production : production;
                newResources[output] = newResources[output] + production;
              }
            }
          })
        }
      })
    });

    resourceList.forEach((item) => {
      const increase = income[item] || 0;
      const decrease = expence[item] || 0;

      const diff = increase - decrease;
      if (diff) {
        change[item] = diff;
      }
    });

    console.log('timestamp:', Date.now());
    console.log('change:', change);
    console.log('newResources:', newResources);
    // console.log('income:', income);
    // console.log('expence:', expence);
    if (Object.keys(change).length) {
      gameHistory.unshift({ timestamp: Date.now(), change });
    }

    game.resources = newResources;
    game.active = true;
    game.history = gameHistory.slice(0, 50);

    game.save((err, newGame) => {
      if (err => console.error('error saving game:', err));
    })
  })
}

function findGameTimeInterval(_id, cb) {
  Game.findOne({ _id }, (err, game) => {
    if (err) {
      console.error('error finding game', err);
      return cb('error finding game');
    }

    const { lastSeen } = game;

    if (Date.now() - lastSeen > AWAY_INTERVAL) {
      game.active = false;

      game.save((err, newGame) => {
        if (err) {
          console.error('error saving game:', err)
          cb(err);
          return;
        }
      });
      cb('game is inactive');
    } else {
      cb();
    }
  });
}

function findGameActiveStatus(_id, cb) {
  Game.findOne({ _id }, (err, game) => {
    if (err) {
      console.error('error finding game', err);
      return cb('error finding game');
    }

    const { active, history } = game;
    const lastUpdated = (history && history[0]) ? history[0].timestamp : 0;

    game.lastSeen = Date.now();
    game.save((err, newGame) => {
      if (err) {
        console.error('error saving game:', err)
        cb(err);
        return;
      }

      if (active && (game.lastSeen - lastUpdated) < (TURN_INTERVAL * 1.2)) {
        return cb('game is already active');
      } else {
        return cb();
      }
    })
  });
}

function counter(_id) {
  findGameTimeInterval(_id, (err) => {
    if (err) {
      console.log(err);
    } else {
      // console.log('about to getRevenue');
      getRevenue(_id);

      setTimeout(() => {
        counter(_id);
      }, TURN_INTERVAL);
    }
  })
}

function setCounter(_id) {
  findGameActiveStatus(_id, (err) => {
    if (err) {
      console.log(err);
    } else {
      counter(_id)
    }
  })
}

module.exports = setCounter;
