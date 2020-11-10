var Confirm = React.createClass({
    displayName: 'Confirm',
    getDefaultProps: function () {
        return {
            textButton: 'Oк'
        }
    },
    actionConfirm: function () {
        this.props.csActionConfirm(this.props.item);
    },
    cancelConfirm: function () {
        this.props.csCancelConfirm();
    },
    render: function () {
        return React.DOM.div({
                className: `${SelectConfirmStyle(this.props.type)} confirmBox`,
                "role": "alert"
            },
            React.DOM.div({
                className: 'row'
            }, React.DOM.i({
                className: `${SelectConfirmIcon(this.props.type)} col-2`
            }), React.DOM.h5({
                className: 'textConfirm  col-10'
            }, this.props.text)),
            React.DOM.button({
                value: this.props.textButton,
                type: 'button',
                className: 'col-12 btn btn-outline-success',
                onClick: this.actionConfirm
            }, React.DOM.span(null, this.props.textButton)),
            React.DOM.button({
                value: 'Отмена',
                className: 'close',
                "data-dismiss": "alert",
                "aria-label": "Close",
                onClick: this.cancelConfirm
            }, React.DOM.span({
                "aria-hidden": "true"
            }, "\u00D7"))
        )
    }
})