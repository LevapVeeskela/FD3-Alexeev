var SelectConfirmStyle = function (type) {
    switch (type) {
        case ConfirmTypes.Warning:
            return ConfirmClassesName.Warning;
        case ConfirmTypes.Delete:
            return ConfirmClassesName.Delete;
        default:
            return ConfirmClassesName.Info;
    }
}

var SelectConfirmIcon = function (type) {
    switch (type) {
        case ConfirmTypes.Warning:
            return ConfirmIcons.Warning;
        case ConfirmTypes.Delete:
            return ConfirmIcons.Delete;
        default:
            return ConfirmIcons.Info;
    }
}