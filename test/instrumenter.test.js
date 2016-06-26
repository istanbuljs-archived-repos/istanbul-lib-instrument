/* globals describe, it */

import {readFileSync} from 'fs';
import Instrumenter from '../src/instrumenter';

require('chai').should();

describe('Instrumenter', function () {
    describe('getPreambleString', function () {
        it('returns generated preamble code', function () {
            const instrumenter = new Instrumenter();
            const preamble = instrumenter.getPreamble(
                readFileSync('./test/fixtures/instrument-me.js', 'utf-8'),
                './test/fixtures/instrument-me.js'
            );
            preamble.should.match(/instrument-me\.js/);
            preamble.should.match(/__coverage__/);
        });
    });
});
