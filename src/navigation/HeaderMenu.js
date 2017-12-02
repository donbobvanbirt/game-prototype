import React, { Component } from 'react';
import { Dropdown, Menu } from 'semantic-ui-react';
import styled from 'styled-components';

const CustomMenu = styled(Menu)`
  border-radius: 0 !important;
`;

export default class HeaderMenu extends Component {
  state = {}

  handleItemClick = (e, { name }) => this.setState({ activeItem: name })

  render() {
    const { activeItem } = this.state;

    return (
      <CustomMenu inverted>
        <Menu.Item header>The Game</Menu.Item>
        <Menu.Item name="market" active={activeItem === 'market'} onClick={this.handleItemClick} />
        <Menu.Item name="Stats" active={activeItem === 'Stats'} onClick={this.handleItemClick} />
        <Menu.Item name="tutorial" active={activeItem === 'tutorial'} onClick={this.handleItemClick} />

        <Menu.Menu position="right">
          <Dropdown item text="Language">
            <Dropdown.Menu>
              <Dropdown.Item>English</Dropdown.Item>
              <Dropdown.Item>Russian</Dropdown.Item>
              <Dropdown.Item>Spanish</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>

          <Menu.Item name="account" active={activeItem === 'account'} onClick={this.handleItemClick} />
        </Menu.Menu>
      </CustomMenu>
    );
  }
}
