import React from 'react';
import PropTypes from 'prop-types';
import { Modal, Label, Icon } from 'semantic-ui-react';
import styled from 'styled-components';
import { isEmpty } from 'lodash';

import IndustryTableModal from './IndustryTableModal';

const Container = styled(Modal)`
  min-width: 250px;
`;

const ContentContainer = styled.div`
  with: 100%;
  margin-bottom: 21px;
`;

const IndustryListContainer = styled.div`
  display: flex;
  flex-direction: row;
  margin-bottom: 35px;
  flex-wrap: wrap;
`;

const IndustryItem = styled.div`
  padding: 0 3px;
  text-align: center;
  min-width: 50px;
  .icon-box {
    width: 100%;
    height: 50px;
    margin: auto;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 25px;
    cursor: default;
  }
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
    <Container open={!!hex} onClose={close} closeIcon>
      <Modal.Header>
        {controlled ? 'Controlled' : 'Uncontrolled'} Area
      </Modal.Header>
      <Modal.Content image>
        <Modal.Description>

          <ContentContainer>
            {!controlled && <p>You must build a base to gain controll of this area</p>}
          </ContentContainer>

          <IndustryListContainer>
            {!isEmpty(buildings) &&
              Object.keys(buildings).map((item, i) => {
                const building = buildings[item];
                const { icon, displayName } = building;
                return (
                  <IndustryItem key={`building-list-${i}`}>
                    <div className="icon-box">
                      <Icon name={icon} />
                    </div>
                    {displayName}
                  </IndustryItem>
                );
              })
            }

            <IndustryItem>
              <div className="icon-box">
                <IndustryTableModal
                  controlled={controlled}
                  build={build}
                  buildings={buildings}
                  canAfford={canAfford}
                />
              </div>
            </IndustryItem>
          </IndustryListContainer>

          {resourceAbundance.length > 0 &&
            <div>
              {resourceAbundance.map((resource, i) => (
                <Label key={`abundantResource-${i}`}>{resource}</Label>
              ))}
            </div>}

        </Modal.Description>
      </Modal.Content>
    </Container>
  );
};

HexInfoModal.propTypes = {
  hex: PropTypes.object.isRequired,
  close: PropTypes.func.isRequired,
  build: PropTypes.func.isRequired,
  canAfford: PropTypes.func.isRequired,
};

export default HexInfoModal;
