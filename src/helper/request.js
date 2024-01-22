class Request {
    constructor() {
        this.body = null;
        this.req = null;
        this.res = null;
        this.next = null
        this.user = null
    }

    setArgs(req, res, next) {
        this.body = req?.body
        this.req = req;
        this.res = res;
        this.next = next
    }

    setLocalUser(user) {
        this.user = user
    }
}

const request = new Request()
module.exports = request;