import React from 'react'
import styled from 'styled-components'

const ButtonDiv = styled.button`
    cursor: pointer;
    backgroundColor: grey;
    width: 100px;
    &:hover {
        backgroundColor: blue;
    }
`

const Button = ({ label, onClick }) => {
    return (
        <ButtonDiv onClick={() => onClick(label)}>
            {label}
        </ButtonDiv>
    )
}

export default Button