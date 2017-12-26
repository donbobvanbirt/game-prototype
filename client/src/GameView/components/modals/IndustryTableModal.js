import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Icon, Table, Popup, List, Modal } from 'semantic-ui-react';
import styled from 'styled-components';

import { industrialItems } from '../../industrialItems';

const TableLink = styled.a`
  cursor: pointer;
`;

const AddIcon = styled(Icon)`
  cursor: pointer;
`;

class IndustryTableModal extends Component {
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
    type,
  }, item) => {
    const { buildings, controlled, canAfford } = this.props;

    if (buildings[item]) return null;

    const availableSpaces = 1;
    const spaceAvailable = Object.keys(buildings)
      .filter(building => buildings[building].type === type)
      .length < availableSpaces;

    const affordable = canAfford(cost);
    const canBuild = affordable &&
      (controlled || item === 'base') &&
      spaceAvailable;

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
      <Modal closeIcon trigger={<AddIcon name="add" />}>
        <Modal.Header>Build Industry</Modal.Header>
        <Modal.Content>
          <Modal.Description>
            <Table basic="very">
              <Table.Body>
                {Object.keys(industrialItems).map(item => (
                  this.renderTableRow(industrialItems[item], item)
                ))}
              </Table.Body>
            </Table>
          </Modal.Description>
        </Modal.Content>
      </Modal>
    );
  }
}

IndustryTableModal.defaultProps = {
  buildings: {},
};

IndustryTableModal.propTypes = {
  build: PropTypes.func.isRequired,
  buildings: PropTypes.object,
  controlled: PropTypes.bool.isRequired,
  canAfford: PropTypes.func.isRequired,
};

export default IndustryTableModal;
