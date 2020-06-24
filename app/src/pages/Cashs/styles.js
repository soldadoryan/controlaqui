import styled from 'styled-components';

import colors from '../../presets/colors';

export const Page = styled.div`
  .containercash {
    .painelcash {
      margin-top: 25px;

      .total {
        width: 100%;
        display: flex;
        justify-content: flex-end;
        margin-top: 25px;

        span {
          padding: 10px 20px;
          background-color: ${colors.primary};
          color: white;
          display: block;
          width: 25%;
          border-radius: 10px;
      
          b {
            margin-right: 10px;
          }
        }
        
      }
    }
  }
`;