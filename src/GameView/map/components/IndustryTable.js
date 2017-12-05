import React from 'react';
import PropTypes from 'prop-types';
import { Icon, Table } from 'semantic-ui-react';
import styled from 'styled-components';

const TableLink = styled.a`
  cursor: pointer;
`;

const IndustryTable = ({ controlled, buildBase }) => (
  <Table basic="very">
    <Table.Body>
      <Table.Row disabled={false}>
        <Table.Cell collapsing>
          <Icon name="home" /> Base
        </Table.Cell>
        <Table.Cell collapsing>level</Table.Cell>
        <Table.Cell>[description]</Table.Cell>
        <Table.Cell selectable>
          {controlled ?
            <TableLink>
              Upgrade
            </TableLink> :
            <TableLink onClick={buildBase}>Build</TableLink>}
        </Table.Cell>
      </Table.Row>
      <Table.Row disabled={!controlled}>
        <Table.Cell collapsing>
          <Icon name="cubes" /> Mine
        </Table.Cell>
        <Table.Cell collapsing>level</Table.Cell>
        <Table.Cell>[description]</Table.Cell>
        <Table.Cell selectable>
          <TableLink>
            Build [cost]
          </TableLink>
        </Table.Cell>
      </Table.Row>
      <Table.Row disabled={!controlled}>
        <Table.Cell collapsing>
          <Icon name="factory" /> Factory
        </Table.Cell>
        <Table.Cell collapsing>level</Table.Cell>
        <Table.Cell>[description]</Table.Cell>
        <Table.Cell selectable>
          <TableLink>
            Build [cost]
          </TableLink>
        </Table.Cell>
      </Table.Row>
      <Table.Row disabled>
        <Table.Cell collapsing>
          <Icon name="flask" /> Research facility
        </Table.Cell>
        <Table.Cell collapsing>level</Table.Cell>
        <Table.Cell>[description]</Table.Cell>
        <Table.Cell selectable>
          <TableLink>
            [cost]
          </TableLink>
        </Table.Cell>
      </Table.Row>
      <Table.Row disabled>
        <Table.Cell collapsing>
          <Icon name="lightning" /> Power plant
        </Table.Cell>
        <Table.Cell collapsing>level</Table.Cell>
        <Table.Cell>[description]</Table.Cell>
        <Table.Cell selectable>
          <TableLink>
            [cost]
          </TableLink>
        </Table.Cell>
      </Table.Row>
    </Table.Body>
  </Table>
);

IndustryTable.propTypes = {
  buildBase: PropTypes.func.isRequired,
  controlled: PropTypes.bool.isRequired,
};

export default IndustryTable;
