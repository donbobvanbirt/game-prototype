// const express = require('express');

const Game = require('./Game');

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

function getRevenue(_id) {
  Game.findOne({ _id })
    .then(({ resources, grid }) => {
      const newResources = resources;
      const income = {};
      const expence = {};
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

                let canAfford = true;
                if (cost) {
                  Object.keys(cost).forEach((resource) => {
                    const resourceExpence = cost[resource] * production;
                    const newBallance = newResources[resource] - resourceExpence;
                    if (newBallance < 0) {
                      canAfford = false;
                    }
                    if (canAfford) {
                      expence[resource] = expence[resource] ? expence[resource] + resourceExpence : resourceExpence;
                      newResources[resource] = newBallance;
                    }
                  })
                }

                if (canAfford) {
                  income[output] = income[output] ? income[output] + production : production;
                  newResources[output] = newResources[output] + production;

                  console.log(`${output} production:`, production);
                }
              }
            })
          }
        })
      })
      console.log('income:', income);
      console.log('expence:', expence);
      console.log('newResources:', newResources);
      // return newResources;
      // Game.findOneAndUpdate(
      //   { _id },
      //   { $set: { resources: newResources } },
      //   { new: true },
      // )
    })
    // .then((resources) => {
    //   console.log('_id:', _id);
    //   console.log('resources:', resources);
    //   // Game.findOneAndUpdate(
    //   //   { _id },
    //   //   { $set: { resources: resources } },
    //   //   { new: true },
    //   // )
    // })
    // .then(game => console.log('game:', game))
    // .catch(err => console.error('error updating resources income', err));
}

module.exports = getRevenue;
