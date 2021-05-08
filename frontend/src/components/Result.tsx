import styled from "styled-components"




const Div = styled.div`
    background-color:#999999;
    padding:3rem;
    border-radius:20px;
    height:100vh;
    width:35vw;
    
    
    position:absolute;
    right:0;
    top:0;
    
`;

const DivContent = styled.div`
    background-color:lightgrey;
    height:100%;
    border-radius:20px;
    padding:3rem;
    display:flex;
    flex-direction:column;
    align-items:baseline;
    justify-content:center;
    color:#333;
   
    font-size:2rem;
`;

const sanitizeJson = (json: string) => {
    const separate = json.replace(/({|})/g, "").split(',')
    console.log(separate);

    return separate;
}

const Paragraph = styled.p`
     margin-left:4rem;
     color:#333;
`;


export default function Result(props: { json: string }) {
    return (
        <Div>
            <DivContent>
                {props.json ? '{' : ""}
                {sanitizeJson(props.json).map(line => {
                    return (
                        <Paragraph>{line}</Paragraph>
                    )
                })}
                {props.json ? '}' : ""}
            </DivContent>

        </Div>
    )
}