let logs = []

module.exports = {

    log(data) {
        logs.push(data);
    },

    getLogs() {
        let tmp = logs;
        logs = [];
        return logs;
    }

}