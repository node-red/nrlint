const should = require('chai').should();
const FMNode = require('../../../lib/flowmanip/node');

describe('FMNode object tests', function() {
    describe('Constructor', function() {
        it('should be instantiated without argument', function() {
            const aFMNode = new FMNode();
            aFMNode.should.be.a('object');
            aFMNode.should.have.property('id');
        });
        it('should be instantiated with id', function() {
            const id = "dummyId";
            const aFMNode = new FMNode(id);
            aFMNode.should.be.a('object');
            aFMNode.should.have.property('id', id);
        });
    });

    describe('connection', function() {
        it('should connect an existing port to next node', function() {
            const n1 = new FMNode();
            const n2 = new FMNode();
            n1.wires = [[]];  // one output port, no connection.
            const result = n1.connectTo(0, n2);
            should.equal(result,true);
            n1.should.have.property('wires').that.eql([[n2.id]]);
        });
        it('should not connect non-existing port to next node', function() {
            const n1 = new FMNode();
            const n2 = new FMNode();
            n1.wires = [[]]; // one output port, no connection.
            const result = n1.connectTo(1, n2);
            should.equal(result, false);
            n1.should.have.property('wires').that.eql([[]]);
        });
        it('should disconnect two nodes', function() {
            const n1 = new FMNode();
            const n2 = new FMNode();
            n1.wires = [[]];  // one output port, no connection.
            n1.connectTo(0, n2);
            const result = n1.disconnectTo(0, n2);
            should.equal(result, true);
            n1.should.have.property('wires').that.eql([[]]);
        });
        it('should disconnect all occurrences in wires', function() {
            const n1 = new FMNode();
            const n2 = new FMNode();
            const n3 = new FMNode();
            n1.wires = [[],[],[]]; // three output port, no connection.
            n1.connectTo(0, n2);
            n1.connectTo(1, n3);
            n1.connectTo(1, n2);
            n1.connectTo(2, n2);
            const result = n1.disconnectTo(-1, n2);
            should.equal(result, true);
            n1.should.have.property('wires').that.eql([[],[n3.id],[]]);
        });
        it('should fail when the port is not exist', function() {
            const n1 = new FMNode();
            const n2 = new FMNode();
            n1.wires = [[],[]]; // two output port, no connection.
            n1.connectTo(0,n2);
            const result = n1.disconnectTo(2,n2);
            should.equal(result, false);
            n1.should.have.property('wires').that.eql([[n2.id],[]]);
        });
    });
});