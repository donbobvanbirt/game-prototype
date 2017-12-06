import React from 'react';
import PropTypes from 'prop-types';
import { Modal, List, Header } from 'semantic-ui-react';
import styled from 'styled-components';

import IndustryTable from '../IndustryTable';

const ContentContainer = styled.div`
  with: 100%;
  margin-bottom: 21px;
`;

const HexInfoModal = ({ hex, close, buildBase }) => {
  const { status } = hex;
  const controlled = status === 'controlled';
  return (
    <Modal open={!!hex} onClose={close} closeIcon>
      <Modal.Header>
        {controlled ? 'Controlled' : 'Uncontrolled'} Area
      </Modal.Header>
      <Modal.Content image>
        <Modal.Description>

          <ContentContainer>
            {!controlled && <p>You must build a base to gain controll of this area</p>}
            <Header as="h3">Abundant in:</Header>
            <List>
              <List.Item>Iron</List.Item>
              <List.Item>Helium</List.Item>
            </List>
          </ContentContainer>

          <Header as="h3">Industry:</Header>
          <IndustryTable controlled={controlled} buildBase={buildBase} />

        </Modal.Description>
      </Modal.Content>
    </Modal>
  );
};

HexInfoModal.propTypes = {
  hex: PropTypes.object.isRequired,
  close: PropTypes.func.isRequired,
  buildBase: PropTypes.func.isRequired,
};

export default HexInfoModal;
