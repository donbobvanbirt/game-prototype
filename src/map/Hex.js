import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

import { darkGray, gray, lightGray } from '../shared/basic/colors';

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

const Hex = ({
  status,
  onClick,
  // children,
}) => (
  <Container>
    <HexTop status={status} />
    <HexMiddle status={status} onClick={onClick}>
      {/* {children} */}
    </HexMiddle>
    <HexBottom status={status} />
  </Container>
);

Hex.defaultProps = {
  status: 'hidden',
  onClick: () => {},
};

Hex.propTypes = {
  status: PropTypes.string,
  onClick: PropTypes.func,
};

export default Hex;
