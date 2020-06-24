import styled from 'styled-components';

import colors from '../../../presets/colors';

export const WrapForm = styled.form`
  h2 { color: ${colors.texts}; margin-bottom: 25px; }

  ul {
    width: 100%;
    background-color: #e1e1e1;
    border: 1px solid #999;
    padding: 15px;
    list-style: none;

    li {
      display: flex;
      justify-content: space-between;
      align-items: center;
      color: ${colors.secondary};

      label { font-weight: bold;  }

      .right {
        display: flex;
        align-items: center;
        
        span { margin-right: 5px; color: ${colors.primary}; }
        svg { cursor: pointer; width: 15px; height: 15px; padding: 2px; background-color: ${colors.primary}; color: white; border-radius: 50%; }
      }
    }

    hr {
      margin: 10px 0;
    }
  }
`; 