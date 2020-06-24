import styled from 'styled-components';

import colors from '../../presets/colors';

export const Container = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.1);

  form {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 40px 20px;
    background-color: white;
    border: 1px solid #f1f1f1;
    border-radius: 10px;
    width: 30%;

    input {
      width: 60%;
      height: 50px;
      border: 1px solid #e0e0e0;
      border-radius: 10px;
      padding: 0 10px;
      margin: 25px 0 0;
    }

    button {
      width: 60%;
      margin-top: 25px;
      padding: 10px 0;
      font-size: 18px;
      color: white;
      background-color: ${colors.primary};
      border: 0;
      border-radius: 10px;
      text-transform: uppercase;
    }

  }
`;
