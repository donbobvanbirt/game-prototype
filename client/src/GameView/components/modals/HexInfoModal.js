import React from 'react';
import PropTypes from 'prop-types';
import { Modal, List, Header } from 'semantic-ui-react';
import styled from 'styled-components';
import { isEmpty } from 'lodash';

import IndustryTable from '../IndustryTable';
import BuildingsTable from '../BuildingsTable';

const ContentContainer = styled.div`
  with: 100%;
  margin-bottom: 21px;
`;

const HexInfoModal = ({
  hex,
  close,
  build,
  canAfford,
}) => {
  const { status, buildings, resourceAbundance } = hex;
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
            {resourceAbundance.length > 0 &&
              <div>
                <Header as="h3">Abundant in:</Header>
                <List>
                  {resourceAbundance.map((resource, i) => (
                    <List.Item key={`abundantResource-${i}`}>{resource}</List.Item>
                  ))}
                </List>
              </div>}
          </ContentContainer>

          {!isEmpty(buildings) &&
            <div>
              <Header as="h3">Industry:</Header>
              <BuildingsTable buildings={buildings} />
            </div>
          }

          <Header as="h3">Build:</Header>
          <IndustryTable
            controlled={controlled}
            build={build}
            buildings={buildings}
            canAfford={canAfford}
          />

        </Modal.Description>
      </Modal.Content>
    </Modal>
  );
};

HexInfoModal.propTypes = {
  hex: PropTypes.object.isRequired,
  close: PropTypes.func.isRequired,
  build: PropTypes.func.isRequired,
  canAfford: PropTypes.func.isRequired,
};

export default HexInfoModal;
