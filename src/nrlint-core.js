module.exports = (RED) => {
    RED.plugins.registerPlugin('nrlint', {
        settings: {
            "*": { exportable: true }
        }
    });
};
