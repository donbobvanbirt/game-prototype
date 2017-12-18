import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { Icon } from 'semantic-ui-react';

import { darkGray, gray, lightGray } from '../../shared/basic/colors';

const colors = {
  controlled: lightGray,
  hidden: darkGray,
  visible: gray,
};

const Container = styled.div`
  float: left;
  margin-left: 3px;
  margin-bottom: -26px;
`;

const HexTop = styled.div`
  width: 0;
  border-bottom: 30px solid ${props => colors[props.status]};
  border-left: 52px solid transparent;
  border-right: 52px solid transparent;
`;

const HexMiddle = styled.div`
  width: 104px;
  height: 60px;
  background-color: ${props => colors[props.status]};
`;

const HexBottom = styled.div`
  width: 0;
  border-top: 30px solid ${props => colors[props.status]};
  border-left: 52px solid transparent;
  border-right: 52px solid transparent;
`;

const BuildingIcons = (buildingsObj) => {
  const buildings = Object.keys(buildingsObj);
  if (!buildings.length) return null;

  return buildings.map((building, i) => (
    <Icon name={buildingsObj[building].icon} key={`building-icon-${i}`} />
  ));
};

const Hex = ({
  status,
  onClick,
  buildings,
}) => (
  <Container>
    <HexTop status={status} />
    <HexMiddle status={status} onClick={onClick}>
      {BuildingIcons(buildings)}
    </HexMiddle>
    <HexBottom status={status} />
  </Container>
);

Hex.defaultProps = {
  buildings: {},
};

Hex.propTypes = {
  status: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
  buildings: PropTypes.object,
};

export default Hex;
