const should = require('chai').should();
const FMConfig = require('../../../lib/flowmanip/config');

describe('FMConfig object', function() {
    describe('constructor', function () {
        it('should instantiate without id and name', function () {
            const f = new FMConfig();
            f.should.have.a.property('id');
            f.should.have.a.property('type').that.eql('');
        });
        it('should use id and name arguments', function () {
            const id = 'dummyId';
            const f = new FMConfig(id);
            f.should.have.a.property('id').that.eql(id);
        });
    });
});