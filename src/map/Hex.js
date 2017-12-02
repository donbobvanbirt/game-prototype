import React from 'react';
import styled from 'styled-components';

import { gray } from '../shared/basic/colors';

const Container = styled.div`
  float: left;
  margin-left: 3px;
  margin-bottom: -26px;
`;

const HexTop = styled.div`
  width: 0;
  border-bottom: 30px solid ${gray};
  border-left: 52px solid transparent;
  border-right: 52px solid transparent;
`;

const HexMiddle = styled.div`
  width: 104px;
  height: 60px;
  background-color: ${gray};
`;

const HexBottom = styled.div`
  width: 0;
  border-top: 30px solid ${gray};
  border-left: 52px solid transparent;
  border-right: 52px solid transparent;
`;

const Hex = () => (
  <Container>
    <HexTop />
    <HexMiddle />
    <HexBottom />
  </Container>
);

export default Hex;
