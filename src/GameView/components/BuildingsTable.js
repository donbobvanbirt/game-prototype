import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  Icon,
  Table,
  // Popup,
  List,
} from 'semantic-ui-react';
// import styled from 'styled-components';

// const TableLink = styled.a`
//   cursor: pointer;
// `;

class BuildingsTable extends Component {
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
    icon,
    displayName,
    // description,
    level,
    // cost,
  }) => (
    <Table.Row disabled={false} key={`industry-row-${displayName}`}>
      <Table.Cell collapsing>
        <Icon name={icon} /> {displayName}
      </Table.Cell>
      <Table.Cell collapsing>
        {`level ${level}`}
      </Table.Cell>
      <Table.Cell />
      {/* <Table.Cell selectable>
        <Popup
          content={this.renderCostList(cost)}
          trigger={<TableLink onClick={() => {}}>Upgrade</TableLink>}
        />
      </Table.Cell> */}
    </Table.Row>
  );

  render() {
    const { buildings } = this.props;
    return (
      <Table basic="very">
        <Table.Body>
          {Object.keys(buildings).map(item => (
            this.renderTableRow(buildings[item])
          ))}
        </Table.Body>
      </Table>
    );
  }
}

BuildingsTable.propTypes = {
  buildings: PropTypes.object.isRequired,
  // controlled: PropTypes.bool.isRequired,
};

export default BuildingsTable;
