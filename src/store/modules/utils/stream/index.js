import RNFetchBlob from 'rn-fetch-blob';

export function readFile() {
    const fs = RNFetchBlob.fs;
    const { DocumentDir } = fs.dirs;
    const path = `${DocumentDir}/log.txt`;

    return new Promise((success, reject) => {
        fs.readStream(path, 'utf8')
            .then(stream => {
                let data = '';
                stream.open();
                stream.onData(chunk => {
                    data += chunk;
                });
                stream.onEnd(() => {
                    success(data);
                });
                stream.onError(error => {
                    success(null);
                });
            })
            .catch(error => {
                console.tron.log('Error ', error);
                success(null);
            });
    });
}

export function writeFile(log) {
    const fs = RNFetchBlob.fs;
    const { DocumentDir } = fs.dirs;
    const path = `${DocumentDir}/log.txt`;

    const string = JSON.stringify(log);
    const data = `[${string}]`;

    return new Promise((success, reject) => {
        fs.createFile(path, data, 'utf8');
        success();
    });
}

export function appendError(log, file) {
    const fs = RNFetchBlob.fs;
    const { DocumentDir } = fs.dirs;
    const path = `${DocumentDir}/log.txt`;
    // fs.unlink(path);

    const string = JSON.stringify(log);
    const saveData = file.split(']')[0];
    const data = `${saveData},${string}]`;

    return new Promise((success, reject) => {
        fs.writeStream(path, 'utf8')
            .then(stream => {
                stream.write(data);
                stream.close();
                success();
            })
            .catch(error => {
                success();
            });
    });
}
