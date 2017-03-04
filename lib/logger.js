let logs = []

module.exports = {

    log(data) {
        logs.push(data);
        return data;
    },

    clear() {
        logs = [];
        return { success : 'Logs cleared.' };
    },

    getLogs() {
        return logs;
    }

}