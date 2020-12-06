import React, {PureComponent} from 'react';

class HeaderTable extends PureComponent {

  renderTableHeader = () => {
    return  this.props.headers.concat(this.props.additionalHedaers).map((key, index) => {
      return <th key={index}>
        {key.toUpperCase()}
      </th>
    })
  }
  shouldComponentUpdate()
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
