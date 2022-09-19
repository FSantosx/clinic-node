import React from 'react';
import styled from 'styled-components';

const StyledCounter = styled.div`
  /* ... */
`;
const Paragraph = styled.p`
`;


export default class Navbar extends React.Component {
    render() {
    const str = "Nav";
        return (
            <StyledCounter>
                <Paragraph>{str}</Paragraph>
            </StyledCounter>
        );
  }
}