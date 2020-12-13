import React, {Component} from 'react';

class HeaderTable extends Component { // PureComponent не подходит так как при переключении компаний будет приходить всегда разная ссылка на объект, соответственно и хедер всегда будет срабатывать для перересовки
  shouldComponentUpdate = (nextProps) => (JSON.stringify(nextProps) !== JSON.stringify(this.props)); // нужна чтобы не перересовывать хедер, если свойства не поменялись

  renderTableHeader = () => (this.props.headers.concat(this.props.additionalHedaers.plus).filter(h => !this.props.additionalHedaers.minus.includes(h)).map((key, index) => {
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
