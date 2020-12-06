import React, {Component} from 'react';

class HeaderTable extends Component {
  shouldComponentUpdate = (nextProps) => (JSON.stringify(nextProps) !== JSON.stringify(this.props));

  renderTableHeader = () => (this.props.headers.concat(this.props.additionalHedaers).map((key, index) => {
      return <th key={index}>
        {key.toUpperCase()}
      </th>
  }));
  
  render() {
    console.log('HeaderTable');
    return (<thead>
      <tr>
        {this.renderTableHeader()}
      </tr>
    </thead>);
  };
};

export default HeaderTable;
