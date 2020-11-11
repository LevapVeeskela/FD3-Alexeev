const HeaderTable = React.createClass({
    displayName: 'HeaderTable',
    render: function () {
        const headers = this.props.headers;
        function renderTableHeader() {
            headers.push('Control');
            return headers.map((key, index) => {
              return e('th', {
                key: index
              }, key.toUpperCase())
            })
          }
      return d.thead(null, d.tr(null, renderTableHeader()));
    },
  });