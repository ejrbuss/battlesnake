let logs = []

module.exports = {

    log(data) {
        logs.push(data);
        return data;
    },

    getLogs() {
        return logs;
    }

}