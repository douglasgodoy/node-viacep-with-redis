import { createGlobalStyle } from 'styled-components';

export const GlobalStyles = createGlobalStyle`
  #root{
    height:100vh;
    background: #444;
    color:white;
    display:flex;
    align-items:center;
    justify-content:center;
  }
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }
  html {
    font-size: 62.5%;
    scroll-behavior: smooth;
    font-family: 'Montserrat', sans-serif;

  }
  body,button {
    font-size: 1.6rem;    
  }
  h1, h2, h3, h4, h5, h6,button {
    margin: '3.2rem' 0;
    color:white;
  }
  p {
    margin: '2.4rem' 0;
    color:white;
  }
  ul, ol {
    margin: '2.4rem';
    padding: '2.4rem';
    color:white;
    list-style-type: none;
  }
  .table {
    width: 100%;
    overflow-y: auto;
  }
  button{
    cursor:pointer;
  }
`;