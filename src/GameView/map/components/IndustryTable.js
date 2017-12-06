import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Icon, Table, Popup, List } from 'semantic-ui-react';
import styled from 'styled-components';

import { industrialItems } from '../utils';

const TableLink = styled.a`
  cursor: pointer;
`;

class IndustryTable extends Component {
  // build = (item) => {
  //   if (item === 'Base') return this.props.buildBase();
  //   return null;
  // }

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
  }, item) => (
    <Table.Row disabled={false} key={`industry-row-${displayName}`}>
      <Table.Cell collapsing>
        <Icon name={icon} /> {displayName}
      </Table.Cell>
      <Table.Cell collapsing>[level]</Table.Cell>
      <Table.Cell>{description}</Table.Cell>
      <Table.Cell textAlign="right" selectable>
        {/* <TableLink>
          Upgrade
        </TableLink> : */}
        <Popup
          content={this.renderCostList(cost)}
          trigger={<TableLink onClick={() => this.props.build(item)}>Build</TableLink>}
        />

      </Table.Cell>
    </Table.Row>
  )

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
  // controlled: PropTypes.bool.isRequired,
};

export default IndustryTable;
