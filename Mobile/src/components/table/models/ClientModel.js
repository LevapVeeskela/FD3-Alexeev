export const ClientModel = function (id, surname, name, patronymic, balance, active = true) {
    this.id = id;
    this.surname = surname;
    this.name = name;
    this.patronymic = patronymic;
    this.balance = balance;
    this.active = active;
}

ClientModel.prototype.defaultValues = function () {
    return new ClientModel(0, '', '', '', 0);
}