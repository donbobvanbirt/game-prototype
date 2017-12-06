import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Icon, Table } from 'semantic-ui-react';
import styled from 'styled-components';

const industrialItems = {
  base: {
    cost: {
      steel: 25,
      energy: 75,
      carbon: 15,
    },
    icon: 'home',
    displayName: 'Base',
    description: '',
  },
  powerPlant: {
    cost: {
      steel: 250,
      copper: 75,
      energy: 150,
    },
    icon: 'lightning',
    displayName: 'Power Plant',
    description: '',
  },
  generator: {
    cost: {
      steel: 100,
      machineParts: 25,
      energy: 100,
    },
    icon: 'lightning',
    displayName: 'Generator',
    description: '',
  },
  steelFactory: {
    cost: {
      steel: 500,
      machineParts: 250,
      energy: 300,
    },
    icon: 'factory',
    displayName: 'Steel Factory',
    description: '',
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
    description: '',
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
    description: '',
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
    description: '',
  },
};

const TableLink = styled.a`
  cursor: pointer;
`;

class IndustryTable extends Component {
  build = (item) => {
    if (item === 'Base') return this.props.buildBase();
  }

  renderTableRow = ({ cost, icon, displayName }) => (
    <Table.Row disabled={false} key={`industry-row-${displayName}`}>
      <Table.Cell collapsing>
        <Icon name={icon} /> {displayName}
      </Table.Cell>
      <Table.Cell collapsing>level</Table.Cell>
      <Table.Cell>[description]</Table.Cell>
      <Table.Cell selectable>
        {/* <TableLink>
          Upgrade
        </TableLink> : */}
        <TableLink onClick={() => this.build(displayName)}>Build</TableLink>
      </Table.Cell>
    </Table.Row>
  )

  render() {
    return (
      <Table basic="very">
        <Table.Body>
          {Object.keys(industrialItems).map(item => (
            this.renderTableRow(industrialItems[item])
          ))}
        </Table.Body>
      </Table>
    );
  }
}

IndustryTable.propTypes = {
  buildBase: PropTypes.func.isRequired,
  controlled: PropTypes.bool.isRequired,
};

export default IndustryTable;
