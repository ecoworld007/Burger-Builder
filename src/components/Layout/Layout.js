import React from 'react';
import Aux from '../../hoc/Aux';
const layout = (props) => {
  return (
    <Aux>
      <div>
      Toolbar, Sidebar, Backdrop
    </div>
    <main>
      <p>{props.children}</p>
    </main>
    </Aux>
  );
}

export default layout;