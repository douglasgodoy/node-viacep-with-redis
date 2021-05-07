import styled from 'styled-components';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import InputMask from 'react-input-mask';

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

export default function Main() {
    return (
        <DivMain>
            <DivForm>
                <DivSearchCep>
                    <InputCep mask="99999-999" />
                    <Awesome
                        icon={faSearch}
                        size="lg"
                        fixedWidth
                        color="#263238"
                        onClick={e => console.log('passou')}
                    />
                </DivSearchCep>
            </DivForm>

        </DivMain>
    )
}