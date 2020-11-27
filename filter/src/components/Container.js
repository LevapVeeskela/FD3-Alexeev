const Container = React.createClass({
  displayName: 'Container',
  getInitialState: function () {
    return {
      dataRows: [...Data],
      isSort: false,
      sought: ''
    }
  },
  reset: function () {
    this.setState({
      dataRows: [...Data],
      isSort: false,
      sought: ''
    })
  },
  sort: function () {
    if(!this.state.isSort){
      this.setState({
        dataRows: this.state.dataRows.sort(),
        isSort: !this.state.isSort
      })
      return;
    }
    this.setState({
      dataRows: [...Data.filter(row => row.includes(this.state.sought))],
      isSort: !this.state.isSort
    })
  },
  search: function (EO) {
    if(EO.target.value){
      this.setState({
        dataRows: this.state.dataRows.filter(row => row.includes(EO.target.value)),
        sought: EO.target.value
      })
      return;
    } 
    
    this.setState({
      dataRows: [...Data],
      sought: ''
    })
  },
  render: function () {
    const checkbox = d.input({
      className: '',
      type: 'checkbox',
      checked: this.state.isSort,
      onClick: this.sort
    });
    const input = d.input({
      type: 'text',
      className: 'form-control',
      value: this.state.sought,
      onChange: this.search,
      placeholder: 'Поиск...'
    });
    const button = d.button({
      className: 'btn btn-primery',
      onClick: this.reset
    }, d.span(null, 'сброс'));
    const textarea = d.textarea({
      className: 'block-textarea form-control',
      rows: '5',
      value: this.state.dataRows.join('\n'),
    })

    return d.div({
      className: 'container col-lg-4 col-sm-5'
    }, d.div({
      className: 'input-group mb-3'
    }, d.div({
      className: 'input-group-prepend'
    }, d.div({
      className: 'input-group-text'
    }, checkbox)), input, button), textarea)
  },
});
