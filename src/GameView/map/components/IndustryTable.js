import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Icon, Table, Popup, List } from 'semantic-ui-react';
import styled from 'styled-components';

import { industrialItems } from '../utils';

const TableLink = styled.a`
  cursor: pointer;
`;

class IndustryTable extends Component {
  renderCostList = costObj => (
    <List>
      {Object.keys(costObj).map((item, i) => (
        <List.Item key={`cost-list-item-${i}`}>
          {`- ${costObj[item]} ${item}`}
        </List.Item>
      ))}
    </List>
  );

  renderTableRow = ({
    cost,
    icon,
    displayName,
    description,
  }, item) => {
    const { buildings, controlled, canAfford } = this.props;

    const affordable = canAfford(cost);
    const canBuild = affordable && (controlled || item === 'base');

    if (buildings[item]) return null;

    return (
      <Table.Row disabled={!canBuild} key={`industry-row-${displayName}`}>
        <Table.Cell collapsing>
          <Icon name={icon} /> {displayName}
        </Table.Cell>
        <Table.Cell>{description}</Table.Cell>
        {
          canBuild ?
            <Table.Cell selectable>
              <Popup
                content={this.renderCostList(cost)}
                trigger={<TableLink onClick={() => this.props.build(item)}>Build</TableLink>}
              />
            </Table.Cell> :
            <Table.Cell />
        }
      </Table.Row>
    );
  }

  render() {
    return (
      <Table basic="very">
        <Table.Body>
          {Object.keys(industrialItems).map(item => (
            this.renderTableRow(industrialItems[item], item)
          ))}
        </Table.Body>
      </Table>
    );
  }
}

IndustryTable.propTypes = {
  build: PropTypes.func.isRequired,
  buildings: PropTypes.object.isRequired,
  controlled: PropTypes.bool.isRequired,
  canAfford: PropTypes.func.isRequired,
};

export default IndustryTable;
