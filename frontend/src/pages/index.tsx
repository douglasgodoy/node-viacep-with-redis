import styled from 'styled-components';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import InputMask from 'react-input-mask';
import axios from 'axios';
import { useState } from 'react';
import Result from '../components/Result'



const DivMain = styled.div`
    width:80vw;
    margin-left:auto;
    margin-right:auto;
`;

const InputCep = styled(InputMask)`
    background-color:transparent;
    border: none;
    min-width: 260px;
    height: 32px;
    font-size: 2rem;

    &:focus {
        outline: none;
    }
`;

const DivForm = styled.div`
    display:flex;
    justify-content:center;
    align-items:center;
`;

const DivSearchCep = styled.div`
    background-color: lightgray;
    border-radius: 15px;
    padding: .3rem 1rem;
`;

const Awesome = styled(FontAwesomeIcon)`
    cursor:pointer;
`;

const sendRequest = async (value: string) => {
    try {
        const cep: string = value || "";
        if (!cep) return false;
        const sanitizeCep = cep.match(/[0-9]/g);
        if (sanitizeCep !== null && sanitizeCep.join("").length !== 8) return false;

        const initialTime = new Date().getTime();
        const { data } = await axios.post('http://localhost:3001/', { cep })
        data.timerReq = `${new Date().getTime() - initialTime}ms`;

        return data?.erro ? false : data;
    } catch (error) {
        console.log('error', error);

    }
}



export default function Main() {
    const [inputValue, setInputValue] = useState("");
    const [result, setResult] = useState("");

    const handleEnter = async (e: any) => {
        if (e.key === 'Enter') {
            const newValue = await sendRequest(inputValue);
            console.log(newValue);
            setResult(newValue);
        }
    }
    
    return (
        <DivMain>
            <DivForm>
                <DivSearchCep>
                    <InputCep mask="99999-999"
                        onBlur={e => setInputValue(e.target.value)}
                        onKeyUp={async (e) => {
                            const value = (e.target as HTMLInputElement).value
                            setInputValue(value);
                            await handleEnter(e)
                        }}
                    />
                    <Awesome
                        icon={faSearch}
                        size="lg"
                        fixedWidth
                        color="#263238"
                        onClick={async () => setResult(await sendRequest(inputValue))}
                    />
                </DivSearchCep>
            </DivForm>
            {result.length || result ? <Result json={JSON.stringify(result)} /> : ''}


        </DivMain>
    )
}