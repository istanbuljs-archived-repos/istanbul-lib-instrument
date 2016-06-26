/* globals describe, it */

import {getPreambleString} from '../src/visitor';

require('chai').should();

describe('Visitor', function () {
    describe('getPreambleString', function () {
        it('returns generated preamble code', function () {
            const preamble = getPreambleString('batman.js');
            preamble.should.match(/batman\.js/);
            preamble.should.match(/__coverage__/);
        });
    });
});
