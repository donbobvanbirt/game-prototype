import React, { Component } from 'react';
import { Dropdown, Menu } from 'semantic-ui-react';

export default class HeaderMenu extends Component {
  state = {}

  handleItemClick = (e, { name }) => this.setState({ activeItem: name })

  render() {
    const { activeItem } = this.state;

    return (
      <Menu inverted>
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
      </Menu>
    );
  }
}
