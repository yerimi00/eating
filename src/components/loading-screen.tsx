import styled from "styled-components"

export default function LoadingScreen() {
    
    const Wrapper = styled.div`
    display: flex;
    height: 100vh;
    justify-content: center;
    align-items: center;
    `

    const Text = styled.span`
    font-size: 24px;
    `
    
    return (
    <Wrapper>
        <Text>Loading...</Text>
    </Wrapper>
    )
}