import React from 'react';
const e = React.createElement;
const d = React.DOM;

const HeaderTable = React.createClass({
    displayName: 'HeaderTable',
    render: function () {
        const headers = this.props.headers.concat(this.props.additionalHedaers);
        function renderTableHeader() {
            return headers.map((key, index) => {
              return e('th', {
                key: index
              }, key.toUpperCase())
            })
          }
      return d.thead(null, d.tr(null, renderTableHeader()));
    },
  });

export default HeaderTable;
