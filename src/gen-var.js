import {createHash} from 'crypto';

// function to use for creating hashes
const SHA = 'sha1';

// generate a variable name from hashing the supplied file path
export default function genVar(filename) {
    var hash = createHash(SHA);
    hash.update(filename);
    return 'cov_' + parseInt(hash.digest('hex').substr(0, 12), 16).toString(36);
}
