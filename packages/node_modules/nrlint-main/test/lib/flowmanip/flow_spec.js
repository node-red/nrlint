const should = require('chai').should();
const FMFlow = require('../../../lib/flowmanip/flow');
const FMNode = require('../../../lib/flowmanip/node');

describe('FMFlow object', function() {
    describe('constructor', function() {
        it('should instanciate without id and name', function() {
            const f = new FMFlow();
            f.should.have.a.property('id');
            f.should.have.a.property('name').that.eql("");
            f.should.have.a.property('nodes').that.eql([]);
        });
        it('should use id and name arguments', function() {
            const id = "dummyId";
            const name = "dummyName";
            const f = new FMFlow(id, name);
            f.should.have.a.property('id').that.eql(id);
            f.should.have.a.property('name').that.eql(name);
            f.should.have.a.property('nodes').that.eql([]);            
        });
    });
    describe('iterator', function() {
        it('should be able to iterate using for..of', function() {
            const f = new FMFlow();
            const n1 = new FMNode();
            const n2 = new FMNode();
            const n3 = new FMNode();
            f.addNode(n1);
            f.addNode(n2);
            f.addNode(n3);
            let acc = [];
            for (const n of f) {
                acc.push(n);
            }
            acc.should.have.members([n1, n2, n3]);
        });
    });
    describe('addNode()', function() {
        it('should not add duplicated node', function() {
            const f = new FMFlow();
            const n1 = new FMNode();
            const n2 = new FMNode();
            f.addNode(n1);
            f.addNode(n1);
            f.addNode(n2);
            [...f].should.have.lengthOf(2);
            [...f].should.have.members([n1, n2]);
        });
    });

    describe('getNode()', function() {
        it('should be able to find a node', function() {
            const f = new FMFlow();
            const nid = "dummyId";
            const n1 = new FMNode(nid);
            f.addNode(n1);
            const result = f.getNode(nid);
            result.should.be.an('object');
            result.should.have.property('id').that.eql(nid);
        });
        it('should return undefined if a node is not found', function() {
            const f = new FMFlow();
            const n1 = new FMNode();
            f.addNode(n1);
            const result = f.getNode("otherId");
            should.not.exist(result);
        });
    });

    describe('next()', function() {
        it('should find only nexthop nodes', function() {
            const f = new FMFlow();
            const n1 = new FMNode(); n1.wires = [[]];
            const n2 = new FMNode(); n2.wires = [[]];
            const n3 = new FMNode(); n3.wires = [[]];
            const n4 = new FMNode(); n4.wires = [[]];
            n1.connectTo(0, n2);
            n1.connectTo(0, n3);
            f.addNode(n1);
            f.addNode(n2);
            f.addNode(n3);
            f.addNode(n4);
            const result = f.next(n1.id);
            result.should.be.an('array');
            result.should.have.lengthOf(2);
            result.should.have.members([n2.id, n3.id]);
        });
    });

    describe('prev()', function() {
        it('should find only previous hop nodes', function() {
            const f = new FMFlow();
            const n1 = new FMNode(); n1.wires = [[]];
            const n2 = new FMNode(); n2.wires = [[]];
            const n3 = new FMNode(); n3.wires = [[]];
            const n4 = new FMNode(); n4.wires = [[]];
            n1.connectTo(0, n3);
            n2.connectTo(0, n3);
            f.addNode(n1);
            f.addNode(n2);
            f.addNode(n3);
            f.addNode(n4);
            const result = f.prev(n3.id);
            result.should.be.an('array');
            result.should.have.lengthOf(2);
            result.should.have.members([n1.id,n2.id]);
        });
    });

    describe('insert()', function() {
        it('should insert a node between two nodes', function() {
            const f = new FMFlow();
            const n1 = new FMNode(); n1.wires = [[]];
            const n2 = new FMNode(); n2.wires = [[]];
            const n3 = new FMNode(); n3.wires = [[]];
            n1.connectTo(0,n2);
            f.addNode(n1);
            f.addNode(n2);
            f.insert(n3, 0, n1.id, 0, n2.id);
            [...f].should.have.lengthOf(3);
            [...f].should.have.members([n1,n2,n3]);
            f.next(n1.id).should.be.eql([n3.id]);
            f.next(n3.id).should.be.eql([n2.id]);
            f.prev(n2.id).should.be.eql([n3.id]);
            f.prev(n3.id).should.be.eql([n1.id]);
        });
        it('should prepend a node in front of another node', function() {
            const f = new FMFlow();
            const n1 = new FMNode(); n1.wires = [[]];
            const n2 = new FMNode(); n2.wires = [[]];
            f.addNode(n2);
            f.insert(n1, 0, null, 0, n2.id);
            [...f].should.have.lengthOf(2);
            [...f].should.have.members([n1,n2]);
            f.next(n1.id).should.be.eql([n2.id]);
            f.prev(n2.id).should.be.eql([n1.id]);
        });
        it('should append node after another node', function() {
            const f = new FMFlow();
            const n1 = new FMNode(); n1.wires = [[]];
            const n2 = new FMNode(); n2.wires = [[]];
            f.addNode(n1);
            f.insert(n2, 0, n1.id, 0, null);
            [...f].should.have.lengthOf(2);
            [...f].should.have.members([n1,n2]);
            f.next(n1.id).should.be.eql([n2.id]);
            f.prev(n2.id).should.be.eql([n1.id]);            
        });
    });

    describe('remove()', function() {
        it('should remove an existing node', function() {
            const f = new FMFlow();
            const n1 = new FMNode(); n1.wires = [[]];
            const n2 = new FMNode(); n2.wires = [[]];
            f.addNode(n1);
            f.insert(n2, 0, n1.id, 0, null);
            f.remove(n2.id).should.be.eql(n2);
            [...f].should.have.lengthOf(1);
            [...f].should.have.members([n1]);
            f.next(n1.id).should.be.eql([]);
        });
        it('should not remove non-existing node', function() {
            const f = new FMFlow();
            const n1 = new FMNode(); n1.wires = [[]];
            const n2 = new FMNode(); n2.wires = [[]];
            const n3 = new FMNode(); n2.wires = [[]];
            f.addNode(n1);
            f.insert(n2, 0, n1.id, 0, null);
            f.remove(n3.id);
            [...f].should.have.lengthOf(2);
            [...f].should.have.members([n1,n2]);
            f.next(n1.id).should.be.eql([n2.id]);
        });
    });
});