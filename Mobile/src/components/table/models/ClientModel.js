export class ClientModel {
    constructor(id, surname, name, patronymic, balance, isShow = true) {
        this.id = id;
        this.surname = surname;
        this.name = name;
        this.patronymic = patronymic;
        this.balance = balance;
        this.isShow = isShow;
    }
    defaultValues() {
        return new ClientModel(0, '', '', '', 0);
    }
}

