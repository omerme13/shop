import moment from 'moment';

class Order {
    constructor(id, items, totalPrice, date) {
        this.id = id;
        this.items = items;
        this.totalPrice = totalPrice;
        this.date = date;
    }

    get readableDate() {
        // return this.date.toString().split(' ').splice(0, 4).join(' ');
        return moment(this.date).format('MMM Do YYYY, hh:mm');
    }
}

export default Order;