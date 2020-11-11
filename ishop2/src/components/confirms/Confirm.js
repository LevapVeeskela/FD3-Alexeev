const Confirm = React.createClass({
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
        return d.div({
                className: `${SelectConfirmStyle(this.props.type)} confirmBox`,
                "role": "alert"
            },
            d.div({
                className: 'row'
            }, d.i({
                className: `${SelectConfirmIcon(this.props.type)} col-2`
            }), d.h5({
                className: 'textConfirm  col-10'
            }, this.props.text)),
            d.button({
                value: this.props.textButton,
                type: 'button',
                className: 'col-12 btn btn-outline-success',
                onClick: this.actionConfirm
            }, d.span(null, this.props.textButton)),
            d.button({
                value: 'Отмена',
                className: 'close',
                "data-dismiss": "alert",
                "aria-label": "Close",
                onClick: this.cancelConfirm
            }, d.span({
                "aria-hidden": "true"
            }, "\u00D7"))
        )
    }
})