const HeaderTable = React.createClass({
    displayName: 'HeaderTable',
    render: function () {
        const headers = this.props.headers;
        function renderTableHeader() {
            headers.push('Control');
            return headers.map((key, index) => {
              return React.createElement('th', {
                key: index
              }, key.toUpperCase())
            })
          }
      return React.DOM.thead(null, React.DOM.tr(null, renderTableHeader()));
    },
  });