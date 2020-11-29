import React from 'react';
const e = React.createElement;

class HeaderTable extends React.Component {

  renderTableHeader = () => {
    return  this.props.headers.concat(this.props.additionalHedaers).map((key, index) => {
      return <th key={index}>
        {key.toUpperCase()}
      </th>
    })
  }

  render() {
    return <thead>
      <tr>
        {this.renderTableHeader()}
      </tr>
    </thead>;
  };
};

export default HeaderTable;
