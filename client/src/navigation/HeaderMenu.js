import React, { Component } from 'react';
import { Menu, Icon } from 'semantic-ui-react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const CustomMenu = styled(Menu)`
  border-radius: 0 !important;
  z-index: 999;
  position: absolute;
  left: 0;
  right: 0;
`;

export default class HeaderMenu extends Component {
  state = {}

  handleItemClick = (e, { name }) => this.setState({ activeItem: name })

  render() {
    const { activeItem } = this.state;
    const { toggleSideMenu } = this.props;

    return (
      <CustomMenu inverted>
        <Menu.Item header>The Game</Menu.Item>
        <Menu.Item name="market" active={activeItem === 'market'} onClick={this.handleItemClick} />
        <Menu.Item name="Stats" active={activeItem === 'Stats'} onClick={this.handleItemClick} />
        <Menu.Item name="tutorial" active={activeItem === 'tutorial'} onClick={this.handleItemClick} />

        <Menu.Menu position="right">
          {!!toggleSideMenu &&
            <Menu.Item name="account" onClick={toggleSideMenu} >
              <Icon name="bars" />
            </Menu.Item>}
        </Menu.Menu>
      </CustomMenu>
    );
  }
}

HeaderMenu.propTypes = {
  toggleSideMenu: PropTypes.func,
};
