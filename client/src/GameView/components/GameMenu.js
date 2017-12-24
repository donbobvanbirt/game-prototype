import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { List } from 'semantic-ui-react';

import {
  black,
  lightGray,
  green,
  red,
  yellow,
} from '../../shared/basic/colors';

const resourceGroup1 = [
  { name: 'Iron', value: 'iron' },
  { name: 'Nickel', value: 'nickel' },
  { name: 'Silver', value: 'silver' },
  { name: 'Gold', value: 'gold' },
  { name: 'Platinum', value: 'platinum' },
];

const resourceGroup2 = [
  { name: 'Carbon', value: 'carbon' },
  { name: 'Hydrogen', value: 'hydrogen' },
  { name: 'Silicon', value: 'silicon' },
  { name: 'Copper', value: 'copper' },
];

const resourceGroup3 = [
  { name: 'Energy', value: 'energy' },
  { name: 'Steel', value: 'steel' },
  { name: 'Machine Parts', value: 'machineParts' },
  { name: 'Computer Hardware', value: 'computerHardware' },
];

const calculateColor = (value) => {
  if (value < 200) return red;
  if (value < 500) return yellow;
  return green;
};

const Container = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 150px;
  background-color: ${black};
`;

const InnerContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  margin-top: 22px;
`;

const ResourceList = styled(List)`
  color: ${lightGray};
`;

const ListContainer = styled.div``;

const ResourceValue = styled(List.Content)`
  color: ${props => calculateColor(props.value)};
`;

class GameMenu extends Component {
  state = {}

  renderList(listItems) {
    const { resources } = this.props;
    return (
      <ListContainer>
        <ResourceList>
          {
            listItems.map(({ name, value }) => (
              <List.Item key={`resource-list-item-${value}`}>
                <ResourceValue floated="right" value={resources[value]}>
                  {resources[value]}
                </ResourceValue>
                {name}
              </List.Item>
            ))
          }
        </ResourceList>
      </ListContainer>
    );
  }

  render() {
    return (
      <Container>
        {this.props.resources &&
          <InnerContainer>
            {this.renderList(resourceGroup1)}
            {this.renderList(resourceGroup2)}
            {this.renderList(resourceGroup3)}
          </InnerContainer>}
      </Container>
    );
  }
}

GameMenu.propTypes = {
  resources: PropTypes.object,
};

export default GameMenu;
