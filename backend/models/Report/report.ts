import SimpleLock from "../Lock/simpleLock";
import Order from "../Order/order";

class Report {
    private _orders: Array<Order>;
    private addOrderLock: SimpleLock;

    constructor() {
        this._orders = [];
        this.addOrderLock = new SimpleLock();
    }

    addOrder(order: Order) {
        while (!this.addOrderLock.acquire()) {

        }
        this._orders.push(order);
        this.addOrderLock.release();
    }

    get orders() {
        return this._orders.map(order => Order.getCopyOf(order));
    }
}

export default Report;
