import React from 'react';
import PropTypes from 'prop-types';
import { Modal, Icon, List, Header } from 'semantic-ui-react';
import styled from 'styled-components';

const ContentContainer = styled.div`
  display: flex;
  flex-direction: row;
  with: 100%;
`;

const Content = styled.div`
  width: 48%;
`;

const HexInfoModal = ({ hex, close, buildBase }) => {
  const { status } = hex;
  const controlled = status === 'controlled';
  return (
    <Modal open={!!hex} onClose={close}>
      <Modal.Header>
        {controlled ? 'Controlled' : 'Uncontrolled'} Area
      </Modal.Header>
      <Modal.Content image>
        <Modal.Description>
          {!controlled && <p>Build a base to gain controll of this area</p>}
          <ContentContainer>
            <Content>
              <Header as="h3">Build:</Header>
              <List link>
                {!controlled &&
                  <List.Item onClick={buildBase} as="a">
                    <Icon name="home" /> Base
                  </List.Item>}
                <List.Item as="a"><Icon name="factory" /> Factory</List.Item>
                <List.Item as="a"><Icon name="university" /> Research facility</List.Item>
                <List.Item as="a"><Icon name="lightning" /> Power plant</List.Item>
              </List>

            </Content>
            <Content>
              <Header as="h3">Resources:</Header>
              <List>
                <List.Item>Low on Hydrogen</List.Item>
                <List.Item>Abundant in Iron</List.Item>
                <List.Item>Abundant in Helium</List.Item>
              </List>
            </Content>
          </ContentContainer>
        </Modal.Description>
      </Modal.Content>
    </Modal>
  );
};

HexInfoModal.propTypes = {
  hex: PropTypes.object.isRequired,
  close: PropTypes.func.isRequired,
};

export default HexInfoModal;
