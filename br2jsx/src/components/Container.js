  import React from 'react';

  import BR2JSX from './BR2JSX/BR2JSX';

  class Container extends React.Component {
    render() {
      let text="первый<br>второй<br/>третий<br />последний";

      return  (
        <BR2JSX
        text={text}>
        </BR2JSX>
      )
    }
  };

  export default Container; 