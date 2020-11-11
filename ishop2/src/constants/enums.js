const ConfirmTypes = Object.freeze({
    Info: 1 << 0,
    Warning: 1 << 1,
    Delete: 1 << 2
});

const ConfirmClassesName = Object.freeze({
    Info: 'alert alert-info alert-dismissible fade  show',
    Warning: 'alert alert-warning alert-dismissible fade show',
    Delete: 'alert alert-danger alert-dismissible fade  show'
});

const ConfirmIcons = Object.freeze({
    Info: 'fa fa-question-circle fa-3x',
    Warning: 'fa fa-bullhorn fa-3x',
    Delete: 'fa fa-trash fa-3x'
});