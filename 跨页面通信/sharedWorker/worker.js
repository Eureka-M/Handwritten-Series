self.onconnect = (e) => {
    const ports = e.ports;

    ports.forEach(port => {
        port.onmessage = function (e) {
            port.postMessage(e.data);
        };
    }); 
};
