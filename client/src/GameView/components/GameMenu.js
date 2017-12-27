import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { List, Menu } from 'semantic-ui-react';
import moment from 'moment';

import {
  black,
  lightGray,
  darkGray,
  green,
  red,
  yellow,
} from '../../shared/basic/colors';

const resourceList = [
  { name: 'Iron', value: 'iron' },
  { name: 'Nickel', value: 'nickel' },
  { name: 'Silver', value: 'silver' },
  { name: 'Gold', value: 'gold' },
  { name: 'Platinum', value: 'platinum' },
  { name: 'Carbon', value: 'carbon' },
  { name: 'Hydrogen', value: 'hydrogen' },
  { name: 'Silicon', value: 'silicon' },
  { name: 'Copper', value: 'copper' },
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
  min-height: 100%;
  background-color: ${black};
  overflow: auto;
  padding: 52.5px 24px 24px;
`;

const HideLink = styled.a`
  color: ${darkGray};
  cursor: pointer;
  font-size: 12px;
  font-style: italic;
  &:hover {
    color: ${lightGray};
  }
`;

const InnerContainer = styled.div`
  width: 100%;
  height: 100%;
  margin-top: 22px;
`;

const ResourceList = styled(List)`
  color: ${lightGray};
`;

const ListContainer = styled.div``;

const ResourceValue = styled(List.Content)`
  color: ${props => calculateColor(props.value)};
`;

const IncomeValue = styled(List.Content)`
  color: ${props => props.value > 0 ? green : red};
`;

class GameMenu extends Component {
  state = { activeItem: 'balances' }

  handleItemClick = (e, { name }) => this.setState({ activeItem: name });

  renderResourceList(listItems) {
    const { resources } = this.props;

    return (
      <ListContainer>
        <ResourceList>
          {
            listItems.map(({ name, value }) => (
              <List.Item key={`resource-list-item-${value}`}>
                {name}
                <ResourceValue floated="right" value={resources[value]}>
                  {Math.round(resources[value] * 100) / 100}
                </ResourceValue>
              </List.Item>
            ))
          }
        </ResourceList>
      </ListContainer>
    );
  }

  renderHistory() {
    return (
      <ListContainer>
        <ResourceList>
          {this.props.history.map((item) => {
            const { change, timestamp } = item;
            return (
              <List.Item key={`history-list-${timestamp}`}>
                {moment(timestamp).fromNow()}
                <List.List>
                  {Object.keys(change).map(resource => (
                    <List.Item key={`income-list-${timestamp}-${resource}`}>
                      {resource}
                      <IncomeValue floated="right" value={change[resource]}>
                        {Math.round(change[resource] * 100) / 100}
                      </IncomeValue>
                    </List.Item>
                  ))}
                </List.List>
              </List.Item>
            );
          })}
        </ResourceList>
      </ListContainer>
    );
  }

  render() {
    const { activeItem } = this.state;
    const { resources, history, toggle } = this.props;

    return (
      <Container>
        <HideLink onClick={toggle}>hide</HideLink>
        <Menu inverted>
          <Menu.Item name="balances" active={activeItem === 'balances'} onClick={this.handleItemClick} />
          <Menu.Item name="history" active={activeItem === 'history'} onClick={this.handleItemClick} />
        </Menu>
        {activeItem === 'balances' && !!resources &&
          <InnerContainer>
            {this.renderResourceList(resourceList)}
          </InnerContainer>}
        {activeItem === 'history' && !!history &&
          <InnerContainer>
            {this.renderHistory()}
          </InnerContainer>}
      </Container>
    );
  }
}

GameMenu.propTypes = {
  resources: PropTypes.object,
  history: PropTypes.array,
  toggle: PropTypes.func.isRequired,
};

export default GameMenu;
