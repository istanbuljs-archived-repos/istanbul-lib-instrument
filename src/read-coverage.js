import genVar from './gen-var';
import { parse } from 'babylon';
import traverse from 'babel-traverse';
import * as t from 'babel-types';

export default function readInitialCoverage (code, filename) {
    if (typeof code !== 'string') {
        throw new Error('Code must be a string');
    }

    // Parse as leniently as possible
    const ast = parse(code, {
        allowImportExportEverywhere: true,
        allowReturnOutsideFunction: true,
        allowSuperOutsideMethod: true,
        sourceType: "script", // I think ?
        plugins: ["*"]
    });

    const varName = genVar(filename);
    let covPath;
    traverse(ast, {
        VariableDeclarator: function (path) {
            if (t.isIdentifier(path.node.id) && path.node.id.name === varName) {
                covPath = path.get('init');
                path.stop();
            }
        }
    });

    if (!covPath) {
        return null;
    }

    const binding = covPath.get('callee.body').scope.getOwnBinding("coverageData");
    if (!binding) {
        return null;
    }

    const dataPath = binding.path.get('init');
    const coverageData = dataPath.evaluate();
    if (!coverageData.confident) {
        return null;
    }

    return coverageData.value;
}
