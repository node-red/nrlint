const should = require('chai').should();
const FMFlowSet = require('../../../lib/flowmanip/flowset');

describe('FMFlowSet object', function() {
    describe('constructor', function() {
        it('should instantiate', function() {
            const f = new FMFlowSet();
            f.should.have.a.property('flows');
            f.should.have.a.property('configs');
            f.should.have.a.property('subflows');
            f.should.have.a.property('links');
        });
    });
    describe('copyFlow()', function() {
        // TODO: to be implemented
    });
    describe('parseFlow()', function() {
        it('should parse an empty flow', function() {
            const fs = FMFlowSet.parseFlow([]);
            fs.should.have.a.property('flows').that.eql([]);
            fs.should.have.a.property('configs').that.eql([]);
            fs.should.have.a.property('subflows').that.eql([]);
            fs.should.have.a.property('links').that.eql([]);
        });
        it('should parse a single empty flow', function() {
            const flowsjson = '[{"id":"a","type":"tab","label":"Flow","disabled":false,"info":""}]';
            const fs = FMFlowSet.parseFlow(JSON.parse(flowsjson));
            fs.should.have.a.property('flows').that.have.lengthOf(1);
            fs.should.have.a.property('configs').that.eql([]);
            fs.should.have.a.property('subflows').that.eql([]);
            fs.should.have.a.property('links').that.eql([]);
        });
        it('should parse a flow contains a subflow and a config node.', function() {
            const flowsjson = '[{"id":"277e61b2.22c60e","type":"subflow","name":"Subflow 1","info":"","in":[{"x":60,"y":80,"wires":[{"id":"4301d3ba.735a9c"}]}],"out":[{"x":340,"y":80,"wires":[{"id":"4301d3ba.735a9c","port":0}]}]},{"id":"4301d3ba.735a9c","type":"function","z":"277e61b2.22c60e","name":"","func":"return msg;","outputs":1,"noerr":0,"initialize":"","finalize":"","x":200,"y":80,"wires":[[]]},{"id":"a9b8c2c.43c9e4","type":"tab","label":"Flow 2","disabled":false,"info":""},{"id":"30c7148b.918b9c","type":"comment","z":"a9b8c2c.43c9e4","name":"","info":"","x":130,"y":40,"wires":[]},{"id":"6396ec21.3c8f04","type":"link out","z":"a9b8c2c.43c9e4","name":"","links":["3fe64710.2e10b8"],"x":435,"y":100,"wires":[]},{"id":"3fe64710.2e10b8","type":"link in","z":"a9b8c2c.43c9e4","name":"","links":["6396ec21.3c8f04"],"x":525,"y":100,"wires":[["2fa0474.10921b8"]]},{"id":"2fa0474.10921b8","type":"debug","z":"a9b8c2c.43c9e4","name":"","active":true,"tosidebar":true,"console":false,"tostatus":false,"complete":"false","statusVal":"","statusType":"auto","x":670,"y":100,"wires":[]},{"id":"59f1f71f.7e1558","type":"subflow:277e61b2.22c60e","z":"a9b8c2c.43c9e4","x":300,"y":100,"wires":[["6396ec21.3c8f04"]]},{"id":"2a9dd73c.5d96c8","type":"websocket in","z":"a9b8c2c.43c9e4","name":"","server":"6e0a336b.d5603c","client":"","x":120,"y":100,"wires":[["59f1f71f.7e1558"]]},{"id":"6e0a336b.d5603c","type":"websocket-listener","z":"","path":"/ws/example","wholemsg":"false"}]';
            const fs = FMFlowSet.parseFlow(JSON.parse(flowsjson));
            fs.should.have.a.property('flows').that.have.lengthOf(1);
            fs.should.have.a.property('configs').that.have.lengthOf(1);
            fs.should.have.a.property('subflows').that.have.lengthOf(1);
            fs.should.have.a.property('links').that.have.lengthOf(4);
        });
    });
    describe('iterator', function() {
        it('should be able to iterate using for..of', function() {
            const flowsjson = '[{"id":"277e61b2.22c60e","type":"subflow","name":"Subflow 1","info":"","in":[{"x":60,"y":80,"wires":[{"id":"4301d3ba.735a9c"}]}],"out":[{"x":340,"y":80,"wires":[{"id":"4301d3ba.735a9c","port":0}]}]},{"id":"4301d3ba.735a9c","type":"function","z":"277e61b2.22c60e","name":"","func":"return msg;","outputs":1,"noerr":0,"initialize":"","finalize":"","x":200,"y":80,"wires":[[]]},{"id":"a9b8c2c.43c9e4","type":"tab","label":"Flow 2","disabled":false,"info":""},{"id":"30c7148b.918b9c","type":"comment","z":"a9b8c2c.43c9e4","name":"","info":"","x":130,"y":40,"wires":[]},{"id":"6396ec21.3c8f04","type":"link out","z":"a9b8c2c.43c9e4","name":"","links":["3fe64710.2e10b8"],"x":435,"y":100,"wires":[]},{"id":"3fe64710.2e10b8","type":"link in","z":"a9b8c2c.43c9e4","name":"","links":["6396ec21.3c8f04"],"x":525,"y":100,"wires":[["2fa0474.10921b8"]]},{"id":"2fa0474.10921b8","type":"debug","z":"a9b8c2c.43c9e4","name":"","active":true,"tosidebar":true,"console":false,"tostatus":false,"complete":"false","statusVal":"","statusType":"auto","x":670,"y":100,"wires":[]},{"id":"59f1f71f.7e1558","type":"subflow:277e61b2.22c60e","z":"a9b8c2c.43c9e4","x":300,"y":100,"wires":[["6396ec21.3c8f04"]]},{"id":"2a9dd73c.5d96c8","type":"websocket in","z":"a9b8c2c.43c9e4","name":"","server":"6e0a336b.d5603c","client":"","x":120,"y":100,"wires":[["59f1f71f.7e1558"]]},{"id":"6e0a336b.d5603c","type":"websocket-listener","z":"","path":"/ws/example","wholemsg":"false"}]';
            const fs = FMFlowSet.parseFlow(JSON.parse(flowsjson));
            const ids = [];
            for (const elem of fs) {
                ids.push(elem.id);
            }
            ids.should.have.lengthOf(8); // 6 ordinal nodes, 1 node in subflow, 1 config node.
            ids.should.have.members([
                "30c7148b.918b9c",  // comment
                "6396ec21.3c8f04",  // link out
                "3fe64710.2e10b8",  // link in
                "2fa0474.10921b8",  // debug
                "59f1f71f.7e1558",  // subflow instance
                "2a9dd73c.5d96c8",  // websocket in
                "4301d3ba.735a9c",  // function
                "6e0a336b.d5603c",  // config 
            ]);
        });
    });
    describe('getAllNodeArray()', function() {
        it('should return all nodes in array', function() {
            const flowsjson = '[{"id":"277e61b2.22c60e","type":"subflow","name":"Subflow 1","info":"","in":[{"x":60,"y":80,"wires":[{"id":"4301d3ba.735a9c"}]}],"out":[{"x":340,"y":80,"wires":[{"id":"4301d3ba.735a9c","port":0}]}]},{"id":"4301d3ba.735a9c","type":"function","z":"277e61b2.22c60e","name":"","func":"return msg;","outputs":1,"noerr":0,"initialize":"","finalize":"","x":200,"y":80,"wires":[[]]},{"id":"a9b8c2c.43c9e4","type":"tab","label":"Flow 2","disabled":false,"info":""},{"id":"30c7148b.918b9c","type":"comment","z":"a9b8c2c.43c9e4","name":"","info":"","x":130,"y":40,"wires":[]},{"id":"6396ec21.3c8f04","type":"link out","z":"a9b8c2c.43c9e4","name":"","links":["3fe64710.2e10b8"],"x":435,"y":100,"wires":[]},{"id":"3fe64710.2e10b8","type":"link in","z":"a9b8c2c.43c9e4","name":"","links":["6396ec21.3c8f04"],"x":525,"y":100,"wires":[["2fa0474.10921b8"]]},{"id":"2fa0474.10921b8","type":"debug","z":"a9b8c2c.43c9e4","name":"","active":true,"tosidebar":true,"console":false,"tostatus":false,"complete":"false","statusVal":"","statusType":"auto","x":670,"y":100,"wires":[]},{"id":"59f1f71f.7e1558","type":"subflow:277e61b2.22c60e","z":"a9b8c2c.43c9e4","x":300,"y":100,"wires":[["6396ec21.3c8f04"]]},{"id":"2a9dd73c.5d96c8","type":"websocket in","z":"a9b8c2c.43c9e4","name":"","server":"6e0a336b.d5603c","client":"","x":120,"y":100,"wires":[["59f1f71f.7e1558"]]},{"id":"6e0a336b.d5603c","type":"websocket-listener","z":"","path":"/ws/example","wholemsg":"false"}]';
            const fs = FMFlowSet.parseFlow(JSON.parse(flowsjson));
            const ids = fs.getAllNodesArray().map(e=>e.id);
            ids.should.have.lengthOf(8); // 6 ordinal nodes, 1 node in subflow, 1 config node.
            ids.should.have.members([
                "30c7148b.918b9c",  // comment
                "6396ec21.3c8f04",  // link out
                "3fe64710.2e10b8",  // link in
                "2fa0474.10921b8",  // debug
                "59f1f71f.7e1558",  // subflow instance
                "2a9dd73c.5d96c8",  // websocket in
                "4301d3ba.735a9c",  // function
                "6e0a336b.d5603c",  // config 
            ]);           
        });
    });
    describe('getNode()', function() {
        it('should find a ordinal node', function() {
            const flowsjson = '[{"id":"d160d387.cba87","type":"tab","label":"Flow 3","disabled":false,"info":""},{"id":"6625a34a.20696c","type":"function","z":"d160d387.cba87","name":"","func":"return msg;","outputs":1,"noerr":0,"initialize":"","finalize":"","x":200,"y":120,"wires":[[]]}]';
            const fs = FMFlowSet.parseFlow(JSON.parse(flowsjson));
            const nn = fs.getNode("6625a34a.20696c");
            nn.should.have.property('type', 'function');
        });
        it('should return undefined for undefined', function() {
            const flowsjson = '[{"id":"d160d387.cba87","type":"tab","label":"Flow 3","disabled":false,"info":""},{"id":"6625a34a.20696c","type":"function","z":"d160d387.cba87","name":"","func":"return msg;","outputs":1,"noerr":0,"initialize":"","finalize":"","x":200,"y":120,"wires":[[]]}]';
            const fs = FMFlowSet.parseFlow(JSON.parse(flowsjson));
            const nn = fs.getNode(); // undefined
            should.equal(nn, undefined);
        });
        it('should find a node in subflow', function() {
            const flowsjson = '[{"id":"80bf547b.d0db88","type":"subflow","name":"Subflow 2","info":"","in":[],"out":[]},{"id":"c0c18373.7659e","type":"delay","z":"80bf547b.d0db88","name":"","pauseType":"delay","timeout":"5","timeoutUnits":"seconds","rate":"1","nbRateUnits":"1","rateUnits":"second","randomFirst":"1","randomLast":"5","randomUnits":"seconds","drop":false,"x":190,"y":80,"wires":[[]]},{"id":"d160d387.cba87","type":"tab","label":"Flow 3","disabled":false,"info":""},{"id":"9a31894.b23be78","type":"subflow:80bf547b.d0db88","z":"d160d387.cba87","x":220,"y":120,"wires":[]}]';
            const fs = FMFlowSet.parseFlow(JSON.parse(flowsjson));
            const nn = fs.getNode("c0c18373.7659e"); // a node in a subflow template
            nn.should.have.property('type','delay');
        });
        it('should not find a config node', function() {
            const flowsjson = '[{"id":"bf76548.1a652a8","type":"tab","label":"Flow 4","disabled":false,"info":""},{"id":"8ef5ff0b.b12ba","type":"ui_text","z":"bf76548.1a652a8","group":"3a31fa63.5cb186","order":0,"width":0,"height":0,"name":"","label":"text","format":"{{msg.payload}}","layout":"row-spread","x":340,"y":140,"wires":[]},{"id":"3a31fa63.5cb186","type":"ui_group","z":"","name":"Default","tab":"cf33edd9.6775a","order":1,"disp":true,"width":"6","collapse":false},{"id":"cf33edd9.6775a","type":"ui_tab","z":"","name":"Home","icon":"dashboard","disabled":false,"hidden":false}]';
            const fs = FMFlowSet.parseFlow(JSON.parse(flowsjson));
            const nn = fs.getNode("3a31fa63.5cb186");
            should.equal(nn, undefined);
        });
        it('should not find a flow (a.k.a. tab, workspace)', function() {
            const flowsjson = '[{"id":"bf76548.1a652a8","type":"tab","label":"Flow 4","disabled":false,"info":""},{"id":"8ef5ff0b.b12ba","type":"ui_text","z":"bf76548.1a652a8","group":"3a31fa63.5cb186","order":0,"width":0,"height":0,"name":"","label":"text","format":"{{msg.payload}}","layout":"row-spread","x":340,"y":140,"wires":[]},{"id":"3a31fa63.5cb186","type":"ui_group","z":"","name":"Default","tab":"cf33edd9.6775a","order":1,"disp":true,"width":"6","collapse":false},{"id":"cf33edd9.6775a","type":"ui_tab","z":"","name":"Home","icon":"dashboard","disabled":false,"hidden":false}]';
            const fs = FMFlowSet.parseFlow(JSON.parse(flowsjson));
            const nn = fs.getNode("bf76548.1a652a8"); 
            should.equal(nn, undefined);
        });
    });
    describe('getFlow()', function() {
        it('should find a flow', function() {
            const flowsjson = '[{"id":"bf76548.1a652a8","type":"tab","label":"Flow 4","disabled":false,"info":""},{"id":"8ef5ff0b.b12ba","type":"ui_text","z":"bf76548.1a652a8","group":"3a31fa63.5cb186","order":0,"width":0,"height":0,"name":"","label":"text","format":"{{msg.payload}}","layout":"row-spread","x":340,"y":140,"wires":[]},{"id":"3a31fa63.5cb186","type":"ui_group","z":"","name":"Default","tab":"cf33edd9.6775a","order":1,"disp":true,"width":"6","collapse":false},{"id":"cf33edd9.6775a","type":"ui_tab","z":"","name":"Home","icon":"dashboard","disabled":false,"hidden":false}]';
            const fs = FMFlowSet.parseFlow(JSON.parse(flowsjson));
            const nn = fs.getFlow("bf76548.1a652a8"); 
            nn.should.have.property('type','tab');
        });
        it('should not find a ordinal node', function() {
            const flowsjson = '[{"id":"bf76548.1a652a8","type":"tab","label":"Flow 4","disabled":false,"info":""},{"id":"8ef5ff0b.b12ba","type":"ui_text","z":"bf76548.1a652a8","group":"3a31fa63.5cb186","order":0,"width":0,"height":0,"name":"","label":"text","format":"{{msg.payload}}","layout":"row-spread","x":340,"y":140,"wires":[]},{"id":"3a31fa63.5cb186","type":"ui_group","z":"","name":"Default","tab":"cf33edd9.6775a","order":1,"disp":true,"width":"6","collapse":false},{"id":"cf33edd9.6775a","type":"ui_tab","z":"","name":"Home","icon":"dashboard","disabled":false,"hidden":false}]';
            const fs = FMFlowSet.parseFlow(JSON.parse(flowsjson));
            const nn = fs.getFlow("8ef5ff0b.b12ba"); 
            should.equal(nn, undefined);
        });
        it('should return undefined for non-existing node', function() {
            const flowsjson = '[{"id":"bf76548.1a652a8","type":"tab","label":"Flow 4","disabled":false,"info":""},{"id":"8ef5ff0b.b12ba","type":"ui_text","z":"bf76548.1a652a8","group":"3a31fa63.5cb186","order":0,"width":0,"height":0,"name":"","label":"text","format":"{{msg.payload}}","layout":"row-spread","x":340,"y":140,"wires":[]},{"id":"3a31fa63.5cb186","type":"ui_group","z":"","name":"Default","tab":"cf33edd9.6775a","order":1,"disp":true,"width":"6","collapse":false},{"id":"cf33edd9.6775a","type":"ui_tab","z":"","name":"Home","icon":"dashboard","disabled":false,"hidden":false}]';
            const fs = FMFlowSet.parseFlow(JSON.parse(flowsjson));
            const nn = fs.getFlow(); 
            should.equal(nn, undefined);
        });
    });
    describe('getConfig()', function() {
        it('should find a config node', function() {
            const flowsjson = '[{"id":"277e61b2.22c60e","type":"subflow","name":"Subflow 1","info":"","in":[{"x":60,"y":80,"wires":[{"id":"4301d3ba.735a9c"}]}],"out":[{"x":340,"y":80,"wires":[{"id":"4301d3ba.735a9c","port":0}]}]},{"id":"4301d3ba.735a9c","type":"function","z":"277e61b2.22c60e","name":"","func":"return msg;","outputs":1,"noerr":0,"initialize":"","finalize":"","x":200,"y":80,"wires":[[]]},{"id":"a9b8c2c.43c9e4","type":"tab","label":"Flow 2","disabled":false,"info":""},{"id":"30c7148b.918b9c","type":"comment","z":"a9b8c2c.43c9e4","name":"","info":"","x":130,"y":40,"wires":[]},{"id":"6396ec21.3c8f04","type":"link out","z":"a9b8c2c.43c9e4","name":"","links":["3fe64710.2e10b8"],"x":435,"y":100,"wires":[]},{"id":"3fe64710.2e10b8","type":"link in","z":"a9b8c2c.43c9e4","name":"","links":["6396ec21.3c8f04"],"x":525,"y":100,"wires":[["2fa0474.10921b8"]]},{"id":"2fa0474.10921b8","type":"debug","z":"a9b8c2c.43c9e4","name":"","active":true,"tosidebar":true,"console":false,"tostatus":false,"complete":"false","statusVal":"","statusType":"auto","x":670,"y":100,"wires":[]},{"id":"59f1f71f.7e1558","type":"subflow:277e61b2.22c60e","z":"a9b8c2c.43c9e4","x":300,"y":100,"wires":[["6396ec21.3c8f04"]]},{"id":"2a9dd73c.5d96c8","type":"websocket in","z":"a9b8c2c.43c9e4","name":"","server":"6e0a336b.d5603c","client":"","x":120,"y":100,"wires":[["59f1f71f.7e1558"]]},{"id":"6e0a336b.d5603c","type":"websocket-listener","z":"","path":"/ws/example","wholemsg":"false"}]';
            const fs = FMFlowSet.parseFlow(JSON.parse(flowsjson));
            const nn = fs.getConfig("6e0a336b.d5603c"); 
            nn.should.have.property('type','websocket-listener');
        });
        it('should not find a ordinal node', function() {
            const flowsjson = '[{"id":"277e61b2.22c60e","type":"subflow","name":"Subflow 1","info":"","in":[{"x":60,"y":80,"wires":[{"id":"4301d3ba.735a9c"}]}],"out":[{"x":340,"y":80,"wires":[{"id":"4301d3ba.735a9c","port":0}]}]},{"id":"4301d3ba.735a9c","type":"function","z":"277e61b2.22c60e","name":"","func":"return msg;","outputs":1,"noerr":0,"initialize":"","finalize":"","x":200,"y":80,"wires":[[]]},{"id":"a9b8c2c.43c9e4","type":"tab","label":"Flow 2","disabled":false,"info":""},{"id":"30c7148b.918b9c","type":"comment","z":"a9b8c2c.43c9e4","name":"","info":"","x":130,"y":40,"wires":[]},{"id":"6396ec21.3c8f04","type":"link out","z":"a9b8c2c.43c9e4","name":"","links":["3fe64710.2e10b8"],"x":435,"y":100,"wires":[]},{"id":"3fe64710.2e10b8","type":"link in","z":"a9b8c2c.43c9e4","name":"","links":["6396ec21.3c8f04"],"x":525,"y":100,"wires":[["2fa0474.10921b8"]]},{"id":"2fa0474.10921b8","type":"debug","z":"a9b8c2c.43c9e4","name":"","active":true,"tosidebar":true,"console":false,"tostatus":false,"complete":"false","statusVal":"","statusType":"auto","x":670,"y":100,"wires":[]},{"id":"59f1f71f.7e1558","type":"subflow:277e61b2.22c60e","z":"a9b8c2c.43c9e4","x":300,"y":100,"wires":[["6396ec21.3c8f04"]]},{"id":"2a9dd73c.5d96c8","type":"websocket in","z":"a9b8c2c.43c9e4","name":"","server":"6e0a336b.d5603c","client":"","x":120,"y":100,"wires":[["59f1f71f.7e1558"]]},{"id":"6e0a336b.d5603c","type":"websocket-listener","z":"","path":"/ws/example","wholemsg":"false"}]';
            const fs = FMFlowSet.parseFlow(JSON.parse(flowsjson));
            const nn = fs.getConfig("4301d3ba.735a9c"); 
            should.equal(nn, undefined);
        });
    });
    describe('getSubflow()', function() {
        it('should find a subflow template', function() {
            const flowsjson = '[{"id":"277e61b2.22c60e","type":"subflow","name":"Subflow 1","info":"","in":[{"x":60,"y":80,"wires":[{"id":"4301d3ba.735a9c"}]}],"out":[{"x":340,"y":80,"wires":[{"id":"4301d3ba.735a9c","port":0}]}]},{"id":"4301d3ba.735a9c","type":"function","z":"277e61b2.22c60e","name":"","func":"return msg;","outputs":1,"noerr":0,"initialize":"","finalize":"","x":200,"y":80,"wires":[[]]},{"id":"a9b8c2c.43c9e4","type":"tab","label":"Flow 2","disabled":false,"info":""},{"id":"30c7148b.918b9c","type":"comment","z":"a9b8c2c.43c9e4","name":"","info":"","x":130,"y":40,"wires":[]},{"id":"6396ec21.3c8f04","type":"link out","z":"a9b8c2c.43c9e4","name":"","links":["3fe64710.2e10b8"],"x":435,"y":100,"wires":[]},{"id":"3fe64710.2e10b8","type":"link in","z":"a9b8c2c.43c9e4","name":"","links":["6396ec21.3c8f04"],"x":525,"y":100,"wires":[["2fa0474.10921b8"]]},{"id":"2fa0474.10921b8","type":"debug","z":"a9b8c2c.43c9e4","name":"","active":true,"tosidebar":true,"console":false,"tostatus":false,"complete":"false","statusVal":"","statusType":"auto","x":670,"y":100,"wires":[]},{"id":"59f1f71f.7e1558","type":"subflow:277e61b2.22c60e","z":"a9b8c2c.43c9e4","x":300,"y":100,"wires":[["6396ec21.3c8f04"]]},{"id":"2a9dd73c.5d96c8","type":"websocket in","z":"a9b8c2c.43c9e4","name":"","server":"6e0a336b.d5603c","client":"","x":120,"y":100,"wires":[["59f1f71f.7e1558"]]},{"id":"6e0a336b.d5603c","type":"websocket-listener","z":"","path":"/ws/example","wholemsg":"false"}]';
            const fs = FMFlowSet.parseFlow(JSON.parse(flowsjson));
            const nn = fs.getSubflow("277e61b2.22c60e");
            nn.should.have.property('type','subflow');
        });
        it('should not find a subflow instance node', function() {
            const flowsjson = '[{"id":"277e61b2.22c60e","type":"subflow","name":"Subflow 1","info":"","in":[{"x":60,"y":80,"wires":[{"id":"4301d3ba.735a9c"}]}],"out":[{"x":340,"y":80,"wires":[{"id":"4301d3ba.735a9c","port":0}]}]},{"id":"4301d3ba.735a9c","type":"function","z":"277e61b2.22c60e","name":"","func":"return msg;","outputs":1,"noerr":0,"initialize":"","finalize":"","x":200,"y":80,"wires":[[]]},{"id":"a9b8c2c.43c9e4","type":"tab","label":"Flow 2","disabled":false,"info":""},{"id":"30c7148b.918b9c","type":"comment","z":"a9b8c2c.43c9e4","name":"","info":"","x":130,"y":40,"wires":[]},{"id":"6396ec21.3c8f04","type":"link out","z":"a9b8c2c.43c9e4","name":"","links":["3fe64710.2e10b8"],"x":435,"y":100,"wires":[]},{"id":"3fe64710.2e10b8","type":"link in","z":"a9b8c2c.43c9e4","name":"","links":["6396ec21.3c8f04"],"x":525,"y":100,"wires":[["2fa0474.10921b8"]]},{"id":"2fa0474.10921b8","type":"debug","z":"a9b8c2c.43c9e4","name":"","active":true,"tosidebar":true,"console":false,"tostatus":false,"complete":"false","statusVal":"","statusType":"auto","x":670,"y":100,"wires":[]},{"id":"59f1f71f.7e1558","type":"subflow:277e61b2.22c60e","z":"a9b8c2c.43c9e4","x":300,"y":100,"wires":[["6396ec21.3c8f04"]]},{"id":"2a9dd73c.5d96c8","type":"websocket in","z":"a9b8c2c.43c9e4","name":"","server":"6e0a336b.d5603c","client":"","x":120,"y":100,"wires":[["59f1f71f.7e1558"]]},{"id":"6e0a336b.d5603c","type":"websocket-listener","z":"","path":"/ws/example","wholemsg":"false"}]';
            const fs = FMFlowSet.parseFlow(JSON.parse(flowsjson));
            const nn = fs.getSubflow("59f1f71f.7e1558"); 
            should.equal(nn, undefined);
        });
    });
    describe('prev()', function() {
        const flowsjson = '[{"id":"5abf1f55.0911a","type":"tab","label":"Flow 2","disabled":false,"info":""},{"id":"25b6da6d.25a316","type":"tab","label":"Flow 1","disabled":false,"info":""},{"id":"7dbe48e3.904488","type":"subflow","name":"Subflow 1","info":"","in":[{"x":60,"y":80,"wires":[{"id":"6907ef59.84531"}]}],"out":[{"x":540,"y":80,"wires":[{"id":"6717dc90.017cd4","port":0}]}]},{"id":"6277fe18.f0af4","type":"inject","z":"5abf1f55.0911a","name":"","props":[{"p":"payload"},{"p":"topic","vt":"str"}],"repeat":"","crontab":"","once":false,"onceDelay":0.1,"topic":"","payload":"","payloadType":"date","x":150,"y":100,"wires":[["71e4815c.5db14"]]},{"id":"71e4815c.5db14","type":"link out","z":"5abf1f55.0911a","name":"","links":["8cd549b1.819bf8"],"x":285,"y":100,"wires":[]},{"id":"8cd549b1.819bf8","type":"link in","z":"25b6da6d.25a316","name":"","links":["71e4815c.5db14"],"x":65,"y":80,"wires":[["ab649421.175438"]]},{"id":"6907ef59.84531","type":"delay","z":"7dbe48e3.904488","name":"","pauseType":"delay","timeout":"5","timeoutUnits":"seconds","rate":"1","nbRateUnits":"1","rateUnits":"second","randomFirst":"1","randomLast":"5","randomUnits":"seconds","drop":false,"x":200,"y":80,"wires":[["6717dc90.017cd4"]]},{"id":"6717dc90.017cd4","type":"trigger","z":"7dbe48e3.904488","name":"","op1":"1","op2":"0","op1type":"val","op2type":"val","duration":"250","extend":"false","units":"ms","reset":"","bytopic":"all","topic":"topic","outputs":1,"x":380,"y":80,"wires":[[]]},{"id":"8112d91e.84c8d8","type":"debug","z":"25b6da6d.25a316","name":"","active":true,"tosidebar":true,"console":false,"tostatus":false,"complete":"false","statusVal":"","statusType":"auto","x":470,"y":80,"wires":[]},{"id":"ab649421.175438","type":"subflow:7dbe48e3.904488","z":"25b6da6d.25a316","x":240,"y":80,"wires":[["8112d91e.84c8d8"]]}]';
        const fs = FMFlowSet.parseFlow(JSON.parse(flowsjson));
        it('should return empty list for non-existing Id', function() {
            const nn = fs.prev("notexist");
            nn.should.have.lengthOf(0);
        });
        it('should follow a ordinal link', function() {
            const nn = fs.prev("71e4815c.5db14");
            nn.should.have.members(["6277fe18.f0af4"]);
        });
        it('should follow link in/out node', function() {
            const nn = fs.prev("8cd549b1.819bf8");
            nn.should.have.members(["71e4815c.5db14"]);
        });
        it('should follow links in subflow template', function() {
            const nn = fs.prev("6717dc90.017cd4");
            nn.should.have.members(["6907ef59.84531"]);
        });
    });
    describe('next()', function() {
        const flowsjson = '[{"id":"5abf1f55.0911a","type":"tab","label":"Flow 2","disabled":false,"info":""},{"id":"25b6da6d.25a316","type":"tab","label":"Flow 1","disabled":false,"info":""},{"id":"7dbe48e3.904488","type":"subflow","name":"Subflow 1","info":"","in":[{"x":60,"y":80,"wires":[{"id":"6907ef59.84531"}]}],"out":[{"x":540,"y":80,"wires":[{"id":"6717dc90.017cd4","port":0}]}]},{"id":"6277fe18.f0af4","type":"inject","z":"5abf1f55.0911a","name":"","props":[{"p":"payload"},{"p":"topic","vt":"str"}],"repeat":"","crontab":"","once":false,"onceDelay":0.1,"topic":"","payload":"","payloadType":"date","x":150,"y":100,"wires":[["71e4815c.5db14"]]},{"id":"71e4815c.5db14","type":"link out","z":"5abf1f55.0911a","name":"","links":["8cd549b1.819bf8"],"x":285,"y":100,"wires":[]},{"id":"8cd549b1.819bf8","type":"link in","z":"25b6da6d.25a316","name":"","links":["71e4815c.5db14"],"x":65,"y":80,"wires":[["ab649421.175438"]]},{"id":"6907ef59.84531","type":"delay","z":"7dbe48e3.904488","name":"","pauseType":"delay","timeout":"5","timeoutUnits":"seconds","rate":"1","nbRateUnits":"1","rateUnits":"second","randomFirst":"1","randomLast":"5","randomUnits":"seconds","drop":false,"x":200,"y":80,"wires":[["6717dc90.017cd4"]]},{"id":"6717dc90.017cd4","type":"trigger","z":"7dbe48e3.904488","name":"","op1":"1","op2":"0","op1type":"val","op2type":"val","duration":"250","extend":"false","units":"ms","reset":"","bytopic":"all","topic":"topic","outputs":1,"x":380,"y":80,"wires":[[]]},{"id":"8112d91e.84c8d8","type":"debug","z":"25b6da6d.25a316","name":"","active":true,"tosidebar":true,"console":false,"tostatus":false,"complete":"false","statusVal":"","statusType":"auto","x":470,"y":80,"wires":[]},{"id":"ab649421.175438","type":"subflow:7dbe48e3.904488","z":"25b6da6d.25a316","x":240,"y":80,"wires":[["8112d91e.84c8d8"]]}]';
        const fs = FMFlowSet.parseFlow(JSON.parse(flowsjson));
        it('should return empty list for non-existing Id', function() {
            const nn = fs.next("notexist");
            nn.should.have.lengthOf(0);
        });
        it('should follow a ordinal link', function() {
            const nn = fs.next("6277fe18.f0af4");
            nn.should.have.members(["71e4815c.5db14"]);
        });
        it('should follow link in/out node', function() {
            const nn = fs.next("71e4815c.5db14");
            nn.should.have.members(["8cd549b1.819bf8"]);
        });
        it('should follow links in subflow template', function() {
            const nn = fs.next("6907ef59.84531");
            nn.should.have.members(["6717dc90.017cd4"]);
        });
    });
    // insert, remove, serialize: unimplemented
    describe('connected()', function() {
        const flowsjson = '[{"id":"7a95257d.29a44c","type":"tab","label":"Flow 3","disabled":false,"info":""},{"id":"d415f468.7ce8a8","type":"tab","label":"Flow 4","disabled":false,"info":""},{"id":"b149992d.eb9f68","type":"subflow","name":"Subflow 1","info":"","in":[{"x":40,"y":80,"wires":[{"id":"c3dd0e89.d0f65"}]}],"out":[{"x":360,"y":80,"wires":[{"id":"c3dd0e89.d0f65","port":0}]}]},{"id":"425c898b.d413c8","type":"comment","z":"7a95257d.29a44c","name":"simple","info":"","x":90,"y":60,"wires":[]},{"id":"964007fb.267128","type":"inject","z":"7a95257d.29a44c","name":"","props":[{"p":"payload"},{"p":"topic","vt":"str"}],"repeat":"","crontab":"","once":false,"onceDelay":0.1,"topic":"","payload":"","payloadType":"date","x":150,"y":120,"wires":[["a1aaca4d.faf618"]]},{"id":"a1aaca4d.faf618","type":"switch","z":"7a95257d.29a44c","name":"","property":"payload","propertyType":"msg","rules":[{"t":"eq","v":"","vt":"str"}],"checkall":"true","repair":false,"outputs":1,"x":340,"y":120,"wires":[["94f91d46.929d3"]]},{"id":"94f91d46.929d3","type":"debug","z":"7a95257d.29a44c","name":"","active":true,"tosidebar":true,"console":false,"tostatus":false,"complete":"false","statusVal":"","statusType":"auto","x":580,"y":120,"wires":[]},{"id":"62f2adc8.9a4e04","type":"comment","z":"7a95257d.29a44c","name":"link in/out","info":"","x":100,"y":200,"wires":[]},{"id":"f8c01552.3cec38","type":"range","z":"7a95257d.29a44c","minin":"0","maxin":"99","minout":"0","maxout":"255","action":"roll","round":true,"property":"payload","name":"","x":330,"y":260,"wires":[["8a301da0.18ea5"]]},{"id":"8a301da0.18ea5","type":"link out","z":"7a95257d.29a44c","name":"","links":["33d78e44.356e72"],"x":485,"y":260,"wires":[]},{"id":"33d78e44.356e72","type":"link in","z":"d415f468.7ce8a8","name":"","links":["8a301da0.18ea5"],"x":165,"y":240,"wires":[["126d55ec.4c4afa"]]},{"id":"126d55ec.4c4afa","type":"template","z":"d415f468.7ce8a8","name":"","field":"payload","fieldType":"msg","format":"handlebars","syntax":"mustache","template":"This is the payload: {{payload}} !","output":"str","x":370,"y":240,"wires":[[]]},{"id":"fa2321e6.e8f78","type":"inject","z":"7a95257d.29a44c","name":"","props":[{"p":"payload"},{"p":"topic","vt":"str"}],"repeat":"","crontab":"","once":false,"onceDelay":0.1,"topic":"","payload":"","payloadType":"date","x":150,"y":380,"wires":[["c6dbe45a.b395c8"]]},{"id":"c3dd0e89.d0f65","type":"change","z":"b149992d.eb9f68","name":"","rules":[{"t":"set","p":"payload","pt":"msg","to":"","tot":"str"}],"action":"","property":"","from":"","to":"","reg":false,"x":200,"y":80,"wires":[[]]},{"id":"62a9deb7.4d304","type":"debug","z":"7a95257d.29a44c","name":"","active":true,"tosidebar":true,"console":false,"tostatus":false,"complete":"false","statusVal":"","statusType":"auto","x":650,"y":380,"wires":[]},{"id":"ef23189c.c00ce8","type":"comment","z":"7a95257d.29a44c","name":"subflow","info":"","x":90,"y":320,"wires":[]},{"id":"c6dbe45a.b395c8","type":"subflow:b149992d.eb9f68","z":"7a95257d.29a44c","x":400,"y":380,"wires":[["62a9deb7.4d304"]]},{"id":"366428c5.bce3f8","type":"subflow:b149992d.eb9f68","z":"7a95257d.29a44c","name":"","x":400,"y":460,"wires":[["370947cc.db29e8"]]},{"id":"e7641e2f.cff1a","type":"trigger","z":"7a95257d.29a44c","name":"","op1":"1","op2":"0","op1type":"val","op2type":"val","duration":"250","extend":"false","units":"ms","reset":"","bytopic":"all","topic":"topic","outputs":1,"x":190,"y":460,"wires":[["366428c5.bce3f8"]]},{"id":"370947cc.db29e8","type":"rbe","z":"7a95257d.29a44c","name":"","func":"rbe","gap":"","start":"","inout":"out","property":"payload","x":610,"y":460,"wires":[[]]},{"id":"e1c61c63.74955","type":"comment","z":"7a95257d.29a44c","name":"loop","info":"","x":90,"y":540,"wires":[]},{"id":"e67ff6b9.417d88","type":"switch","z":"7a95257d.29a44c","name":"","property":"payload","propertyType":"msg","rules":[{"t":"eq","v":"","vt":"str"}],"checkall":"true","repair":false,"outputs":1,"x":390,"y":600,"wires":[["c4b3620f.5f20b"]]},{"id":"c4b3620f.5f20b","type":"change","z":"7a95257d.29a44c","name":"","rules":[{"t":"set","p":"payload","pt":"msg","to":"","tot":"str"}],"action":"","property":"","from":"","to":"","reg":false,"x":580,"y":600,"wires":[["e67ff6b9.417d88","c8d8270a.d5bb38"]]},{"id":"f9ad9672.3ee238","type":"inject","z":"7a95257d.29a44c","name":"","props":[{"p":"payload"},{"p":"topic","vt":"str"}],"repeat":"","crontab":"","once":false,"onceDelay":0.1,"topic":"","payload":"","payloadType":"date","x":180,"y":600,"wires":[["e67ff6b9.417d88"]]},{"id":"c8d8270a.d5bb38","type":"debug","z":"7a95257d.29a44c","name":"","active":true,"tosidebar":true,"console":false,"tostatus":false,"complete":"false","statusVal":"","statusType":"auto","x":840,"y":600,"wires":[]},{"id":"9fde1f5d.b78f3","type":"comment","z":"7a95257d.29a44c","name":"multi links","info":"","x":100,"y":680,"wires":[]},{"id":"6f31d999.786708","type":"switch","z":"7a95257d.29a44c","name":"","property":"payload","propertyType":"msg","rules":[{"t":"eq","v":"","vt":"str"}],"checkall":"true","repair":false,"outputs":1,"x":610,"y":740,"wires":[["4dde0b90.5530f4"]]},{"id":"ba2eeacc.2f8548","type":"batch","z":"7a95257d.29a44c","name":"","mode":"count","count":10,"overlap":0,"interval":10,"allowEmptySequence":false,"topics":[{"topic":""}],"x":610,"y":800,"wires":[["a7dd9baf.8ed778"]]},{"id":"b395ff72.ed96f","type":"function","z":"7a95257d.29a44c","name":"","func":"return msg;","outputs":2,"noerr":0,"initialize":"","finalize":"","x":340,"y":840,"wires":[["ba2eeacc.2f8548"],["3d98f29a.5792ee"]]},{"id":"3d98f29a.5792ee","type":"template","z":"7a95257d.29a44c","name":"","field":"payload","fieldType":"msg","format":"handlebars","syntax":"mustache","template":"This is the payload: {{payload}} !","output":"str","x":620,"y":860,"wires":[["42614951.82f768"]]},{"id":"4dde0b90.5530f4","type":"debug","z":"7a95257d.29a44c","name":"","active":true,"tosidebar":true,"console":false,"tostatus":false,"complete":"false","statusVal":"","statusType":"auto","x":810,"y":740,"wires":[]},{"id":"a7dd9baf.8ed778","type":"debug","z":"7a95257d.29a44c","name":"","active":true,"tosidebar":true,"console":false,"tostatus":false,"complete":"false","statusVal":"","statusType":"auto","x":810,"y":800,"wires":[]},{"id":"42614951.82f768","type":"debug","z":"7a95257d.29a44c","name":"","active":true,"tosidebar":true,"console":false,"tostatus":false,"complete":"false","statusVal":"","statusType":"auto","x":810,"y":860,"wires":[]},{"id":"27f8b385.602eac","type":"delay","z":"7a95257d.29a44c","name":"","pauseType":"delay","timeout":"5","timeoutUnits":"seconds","rate":"1","nbRateUnits":"1","rateUnits":"second","randomFirst":"1","randomLast":"5","randomUnits":"seconds","drop":false,"x":340,"y":760,"wires":[["6f31d999.786708","ba2eeacc.2f8548"]]},{"id":"8962e5da.6cf8a8","type":"inject","z":"7a95257d.29a44c","name":"","props":[{"p":"payload"},{"p":"topic","vt":"str"}],"repeat":"","crontab":"","once":false,"onceDelay":0.1,"topic":"","payload":"","payloadType":"date","x":150,"y":760,"wires":[["27f8b385.602eac"]]},{"id":"df7a5e8c.b937","type":"inject","z":"7a95257d.29a44c","name":"","props":[{"p":"payload"},{"p":"topic","vt":"str"}],"repeat":"","crontab":"","once":false,"onceDelay":0.1,"topic":"","payload":"","payloadType":"date","x":160,"y":840,"wires":[["b395ff72.ed96f"]]}]';
        const fs = FMFlowSet.parseFlow(JSON.parse(flowsjson));

        it('should return empty list for non-existing Id', function() {
            const nn = fs.connected("notexist");
            nn.should.have.lengthOf(0);
        });
        it('should enumerate connected nodes', function() {
            const nn = fs.connected("a1aaca4d.faf618");
            nn.should.have.members([
                "964007fb.267128",
                "a1aaca4d.faf618",
                "94f91d46.929d3"]);
        });
        it('should follow link in/out nodes', function() {
            const nn = fs.connected("33d78e44.356e72");
            nn.should.have.members([
                "33d78e44.356e72",
                "126d55ec.4c4afa",
                "8a301da0.18ea5",
                "f8c01552.3cec38"
            ]);
        });
        it('should follow a subflow instance, and not follow its containing nodes', function() {
            const nn = fs.connected("62a9deb7.4d304");
            nn.should.have.members([
                "62a9deb7.4d304",
                "c6dbe45a.b395c8",
                "fa2321e6.e8f78"
            ]);
        });
        it('should follow a flow even if it contains loops', function() {
            const nn = fs.connected("c4b3620f.5f20b");
            nn.should.have.members([
                "c4b3620f.5f20b",
                "f9ad9672.3ee238",
                "e67ff6b9.417d88",
                "c8d8270a.d5bb38"
            ]);
        });
        it('should follow multiple links on a single port', function() {
            const nn = fs.connected("ba2eeacc.2f8548");
            nn.should.have.members([
                "ba2eeacc.2f8548",
                "8962e5da.6cf8a8",
                "27f8b385.602eac",
                "6f31d999.786708",
                "4dde0b90.5530f4",
                "a7dd9baf.8ed778",
                "df7a5e8c.b937",
                "b395ff72.ed96f",
                "3d98f29a.5792ee",
                "42614951.82f768"
            ]);
        });
    });
    describe('downstream()', function() {
        const flowsjson = '[{"id":"7a95257d.29a44c","type":"tab","label":"Flow 3","disabled":false,"info":""},{"id":"d415f468.7ce8a8","type":"tab","label":"Flow 4","disabled":false,"info":""},{"id":"b149992d.eb9f68","type":"subflow","name":"Subflow 1","info":"","in":[{"x":40,"y":80,"wires":[{"id":"c3dd0e89.d0f65"}]}],"out":[{"x":360,"y":80,"wires":[{"id":"c3dd0e89.d0f65","port":0}]}]},{"id":"425c898b.d413c8","type":"comment","z":"7a95257d.29a44c","name":"simple","info":"","x":90,"y":60,"wires":[]},{"id":"964007fb.267128","type":"inject","z":"7a95257d.29a44c","name":"","props":[{"p":"payload"},{"p":"topic","vt":"str"}],"repeat":"","crontab":"","once":false,"onceDelay":0.1,"topic":"","payload":"","payloadType":"date","x":150,"y":120,"wires":[["a1aaca4d.faf618"]]},{"id":"a1aaca4d.faf618","type":"switch","z":"7a95257d.29a44c","name":"","property":"payload","propertyType":"msg","rules":[{"t":"eq","v":"","vt":"str"}],"checkall":"true","repair":false,"outputs":1,"x":340,"y":120,"wires":[["94f91d46.929d3"]]},{"id":"94f91d46.929d3","type":"debug","z":"7a95257d.29a44c","name":"","active":true,"tosidebar":true,"console":false,"tostatus":false,"complete":"false","statusVal":"","statusType":"auto","x":580,"y":120,"wires":[]},{"id":"62f2adc8.9a4e04","type":"comment","z":"7a95257d.29a44c","name":"link in/out","info":"","x":100,"y":200,"wires":[]},{"id":"f8c01552.3cec38","type":"range","z":"7a95257d.29a44c","minin":"0","maxin":"99","minout":"0","maxout":"255","action":"roll","round":true,"property":"payload","name":"","x":330,"y":260,"wires":[["8a301da0.18ea5"]]},{"id":"8a301da0.18ea5","type":"link out","z":"7a95257d.29a44c","name":"","links":["33d78e44.356e72"],"x":485,"y":260,"wires":[]},{"id":"33d78e44.356e72","type":"link in","z":"d415f468.7ce8a8","name":"","links":["8a301da0.18ea5"],"x":165,"y":240,"wires":[["126d55ec.4c4afa"]]},{"id":"126d55ec.4c4afa","type":"template","z":"d415f468.7ce8a8","name":"","field":"payload","fieldType":"msg","format":"handlebars","syntax":"mustache","template":"This is the payload: {{payload}} !","output":"str","x":370,"y":240,"wires":[[]]},{"id":"fa2321e6.e8f78","type":"inject","z":"7a95257d.29a44c","name":"","props":[{"p":"payload"},{"p":"topic","vt":"str"}],"repeat":"","crontab":"","once":false,"onceDelay":0.1,"topic":"","payload":"","payloadType":"date","x":150,"y":380,"wires":[["c6dbe45a.b395c8"]]},{"id":"c3dd0e89.d0f65","type":"change","z":"b149992d.eb9f68","name":"","rules":[{"t":"set","p":"payload","pt":"msg","to":"","tot":"str"}],"action":"","property":"","from":"","to":"","reg":false,"x":200,"y":80,"wires":[[]]},{"id":"62a9deb7.4d304","type":"debug","z":"7a95257d.29a44c","name":"","active":true,"tosidebar":true,"console":false,"tostatus":false,"complete":"false","statusVal":"","statusType":"auto","x":650,"y":380,"wires":[]},{"id":"ef23189c.c00ce8","type":"comment","z":"7a95257d.29a44c","name":"subflow","info":"","x":90,"y":320,"wires":[]},{"id":"c6dbe45a.b395c8","type":"subflow:b149992d.eb9f68","z":"7a95257d.29a44c","x":400,"y":380,"wires":[["62a9deb7.4d304"]]},{"id":"366428c5.bce3f8","type":"subflow:b149992d.eb9f68","z":"7a95257d.29a44c","name":"","x":400,"y":460,"wires":[["370947cc.db29e8"]]},{"id":"e7641e2f.cff1a","type":"trigger","z":"7a95257d.29a44c","name":"","op1":"1","op2":"0","op1type":"val","op2type":"val","duration":"250","extend":"false","units":"ms","reset":"","bytopic":"all","topic":"topic","outputs":1,"x":190,"y":460,"wires":[["366428c5.bce3f8"]]},{"id":"370947cc.db29e8","type":"rbe","z":"7a95257d.29a44c","name":"","func":"rbe","gap":"","start":"","inout":"out","property":"payload","x":610,"y":460,"wires":[[]]},{"id":"e1c61c63.74955","type":"comment","z":"7a95257d.29a44c","name":"loop","info":"","x":90,"y":540,"wires":[]},{"id":"e67ff6b9.417d88","type":"switch","z":"7a95257d.29a44c","name":"","property":"payload","propertyType":"msg","rules":[{"t":"eq","v":"","vt":"str"}],"checkall":"true","repair":false,"outputs":1,"x":390,"y":600,"wires":[["c4b3620f.5f20b"]]},{"id":"c4b3620f.5f20b","type":"change","z":"7a95257d.29a44c","name":"","rules":[{"t":"set","p":"payload","pt":"msg","to":"","tot":"str"}],"action":"","property":"","from":"","to":"","reg":false,"x":580,"y":600,"wires":[["e67ff6b9.417d88","c8d8270a.d5bb38"]]},{"id":"f9ad9672.3ee238","type":"inject","z":"7a95257d.29a44c","name":"","props":[{"p":"payload"},{"p":"topic","vt":"str"}],"repeat":"","crontab":"","once":false,"onceDelay":0.1,"topic":"","payload":"","payloadType":"date","x":180,"y":600,"wires":[["e67ff6b9.417d88"]]},{"id":"c8d8270a.d5bb38","type":"debug","z":"7a95257d.29a44c","name":"","active":true,"tosidebar":true,"console":false,"tostatus":false,"complete":"false","statusVal":"","statusType":"auto","x":840,"y":600,"wires":[]},{"id":"9fde1f5d.b78f3","type":"comment","z":"7a95257d.29a44c","name":"multi links","info":"","x":100,"y":680,"wires":[]},{"id":"6f31d999.786708","type":"switch","z":"7a95257d.29a44c","name":"","property":"payload","propertyType":"msg","rules":[{"t":"eq","v":"","vt":"str"}],"checkall":"true","repair":false,"outputs":1,"x":610,"y":740,"wires":[["4dde0b90.5530f4"]]},{"id":"ba2eeacc.2f8548","type":"batch","z":"7a95257d.29a44c","name":"","mode":"count","count":10,"overlap":0,"interval":10,"allowEmptySequence":false,"topics":[{"topic":""}],"x":610,"y":800,"wires":[["a7dd9baf.8ed778"]]},{"id":"b395ff72.ed96f","type":"function","z":"7a95257d.29a44c","name":"","func":"return msg;","outputs":2,"noerr":0,"initialize":"","finalize":"","x":340,"y":840,"wires":[["ba2eeacc.2f8548"],["3d98f29a.5792ee"]]},{"id":"3d98f29a.5792ee","type":"template","z":"7a95257d.29a44c","name":"","field":"payload","fieldType":"msg","format":"handlebars","syntax":"mustache","template":"This is the payload: {{payload}} !","output":"str","x":620,"y":860,"wires":[["42614951.82f768"]]},{"id":"4dde0b90.5530f4","type":"debug","z":"7a95257d.29a44c","name":"","active":true,"tosidebar":true,"console":false,"tostatus":false,"complete":"false","statusVal":"","statusType":"auto","x":810,"y":740,"wires":[]},{"id":"a7dd9baf.8ed778","type":"debug","z":"7a95257d.29a44c","name":"","active":true,"tosidebar":true,"console":false,"tostatus":false,"complete":"false","statusVal":"","statusType":"auto","x":810,"y":800,"wires":[]},{"id":"42614951.82f768","type":"debug","z":"7a95257d.29a44c","name":"","active":true,"tosidebar":true,"console":false,"tostatus":false,"complete":"false","statusVal":"","statusType":"auto","x":810,"y":860,"wires":[]},{"id":"27f8b385.602eac","type":"delay","z":"7a95257d.29a44c","name":"","pauseType":"delay","timeout":"5","timeoutUnits":"seconds","rate":"1","nbRateUnits":"1","rateUnits":"second","randomFirst":"1","randomLast":"5","randomUnits":"seconds","drop":false,"x":340,"y":760,"wires":[["6f31d999.786708","ba2eeacc.2f8548"]]},{"id":"8962e5da.6cf8a8","type":"inject","z":"7a95257d.29a44c","name":"","props":[{"p":"payload"},{"p":"topic","vt":"str"}],"repeat":"","crontab":"","once":false,"onceDelay":0.1,"topic":"","payload":"","payloadType":"date","x":150,"y":760,"wires":[["27f8b385.602eac"]]},{"id":"df7a5e8c.b937","type":"inject","z":"7a95257d.29a44c","name":"","props":[{"p":"payload"},{"p":"topic","vt":"str"}],"repeat":"","crontab":"","once":false,"onceDelay":0.1,"topic":"","payload":"","payloadType":"date","x":160,"y":840,"wires":[["b395ff72.ed96f"]]}]';
        const fs = FMFlowSet.parseFlow(JSON.parse(flowsjson));
        it('should return empty list for non-existing Id', function() {
            const nn = fs.downstream("notexist");
            nn.should.have.lengthOf(0);
        });
        it('should enumerate downstream nodes (include itself).', function() {
            const nn = fs.downstream("a1aaca4d.faf618");
            nn.should.have.members([
                "a1aaca4d.faf618",
                "94f91d46.929d3"
            ]);
        });
        it('should follow link in/out nodes', function() {
            const nn = fs.downstream("8a301da0.18ea5");
            nn.should.have.members([
                "8a301da0.18ea5",
                "33d78e44.356e72",
                "126d55ec.4c4afa",
            ]);
        });
        it('should follow a subflow instance, and not follow its containing nodes', function() {
            const nn = fs.downstream("fa2321e6.e8f78");
            nn.should.have.members([
                "62a9deb7.4d304",
                "c6dbe45a.b395c8",
                "fa2321e6.e8f78"
            ]);
        });
        it('should follow a flow even if it contains loops', function() {
            const nn = fs.downstream("c4b3620f.5f20b");
            nn.should.have.members([
                "c4b3620f.5f20b",
                "e67ff6b9.417d88",
                "c8d8270a.d5bb38"
            ]);
        });
        it('should follow multiple links on a single port', function() {
            const nn = fs.downstream("b395ff72.ed96f");
            nn.should.have.members([
                "b395ff72.ed96f",
                "ba2eeacc.2f8548",
                "a7dd9baf.8ed778",
                "3d98f29a.5792ee",
                "42614951.82f768"
            ]);
        });
    });
    describe('upstream()', function() {
        const flowsjson = '[{"id":"7a95257d.29a44c","type":"tab","label":"Flow 3","disabled":false,"info":""},{"id":"d415f468.7ce8a8","type":"tab","label":"Flow 4","disabled":false,"info":""},{"id":"b149992d.eb9f68","type":"subflow","name":"Subflow 1","info":"","in":[{"x":40,"y":80,"wires":[{"id":"c3dd0e89.d0f65"}]}],"out":[{"x":360,"y":80,"wires":[{"id":"c3dd0e89.d0f65","port":0}]}]},{"id":"425c898b.d413c8","type":"comment","z":"7a95257d.29a44c","name":"simple","info":"","x":90,"y":60,"wires":[]},{"id":"964007fb.267128","type":"inject","z":"7a95257d.29a44c","name":"","props":[{"p":"payload"},{"p":"topic","vt":"str"}],"repeat":"","crontab":"","once":false,"onceDelay":0.1,"topic":"","payload":"","payloadType":"date","x":150,"y":120,"wires":[["a1aaca4d.faf618"]]},{"id":"a1aaca4d.faf618","type":"switch","z":"7a95257d.29a44c","name":"","property":"payload","propertyType":"msg","rules":[{"t":"eq","v":"","vt":"str"}],"checkall":"true","repair":false,"outputs":1,"x":340,"y":120,"wires":[["94f91d46.929d3"]]},{"id":"94f91d46.929d3","type":"debug","z":"7a95257d.29a44c","name":"","active":true,"tosidebar":true,"console":false,"tostatus":false,"complete":"false","statusVal":"","statusType":"auto","x":580,"y":120,"wires":[]},{"id":"62f2adc8.9a4e04","type":"comment","z":"7a95257d.29a44c","name":"link in/out","info":"","x":100,"y":200,"wires":[]},{"id":"f8c01552.3cec38","type":"range","z":"7a95257d.29a44c","minin":"0","maxin":"99","minout":"0","maxout":"255","action":"roll","round":true,"property":"payload","name":"","x":330,"y":260,"wires":[["8a301da0.18ea5"]]},{"id":"8a301da0.18ea5","type":"link out","z":"7a95257d.29a44c","name":"","links":["33d78e44.356e72"],"x":485,"y":260,"wires":[]},{"id":"33d78e44.356e72","type":"link in","z":"d415f468.7ce8a8","name":"","links":["8a301da0.18ea5"],"x":165,"y":240,"wires":[["126d55ec.4c4afa"]]},{"id":"126d55ec.4c4afa","type":"template","z":"d415f468.7ce8a8","name":"","field":"payload","fieldType":"msg","format":"handlebars","syntax":"mustache","template":"This is the payload: {{payload}} !","output":"str","x":370,"y":240,"wires":[[]]},{"id":"fa2321e6.e8f78","type":"inject","z":"7a95257d.29a44c","name":"","props":[{"p":"payload"},{"p":"topic","vt":"str"}],"repeat":"","crontab":"","once":false,"onceDelay":0.1,"topic":"","payload":"","payloadType":"date","x":150,"y":380,"wires":[["c6dbe45a.b395c8"]]},{"id":"c3dd0e89.d0f65","type":"change","z":"b149992d.eb9f68","name":"","rules":[{"t":"set","p":"payload","pt":"msg","to":"","tot":"str"}],"action":"","property":"","from":"","to":"","reg":false,"x":200,"y":80,"wires":[[]]},{"id":"62a9deb7.4d304","type":"debug","z":"7a95257d.29a44c","name":"","active":true,"tosidebar":true,"console":false,"tostatus":false,"complete":"false","statusVal":"","statusType":"auto","x":650,"y":380,"wires":[]},{"id":"ef23189c.c00ce8","type":"comment","z":"7a95257d.29a44c","name":"subflow","info":"","x":90,"y":320,"wires":[]},{"id":"c6dbe45a.b395c8","type":"subflow:b149992d.eb9f68","z":"7a95257d.29a44c","x":400,"y":380,"wires":[["62a9deb7.4d304"]]},{"id":"366428c5.bce3f8","type":"subflow:b149992d.eb9f68","z":"7a95257d.29a44c","name":"","x":400,"y":460,"wires":[["370947cc.db29e8"]]},{"id":"e7641e2f.cff1a","type":"trigger","z":"7a95257d.29a44c","name":"","op1":"1","op2":"0","op1type":"val","op2type":"val","duration":"250","extend":"false","units":"ms","reset":"","bytopic":"all","topic":"topic","outputs":1,"x":190,"y":460,"wires":[["366428c5.bce3f8"]]},{"id":"370947cc.db29e8","type":"rbe","z":"7a95257d.29a44c","name":"","func":"rbe","gap":"","start":"","inout":"out","property":"payload","x":610,"y":460,"wires":[[]]},{"id":"e1c61c63.74955","type":"comment","z":"7a95257d.29a44c","name":"loop","info":"","x":90,"y":540,"wires":[]},{"id":"e67ff6b9.417d88","type":"switch","z":"7a95257d.29a44c","name":"","property":"payload","propertyType":"msg","rules":[{"t":"eq","v":"","vt":"str"}],"checkall":"true","repair":false,"outputs":1,"x":390,"y":600,"wires":[["c4b3620f.5f20b"]]},{"id":"c4b3620f.5f20b","type":"change","z":"7a95257d.29a44c","name":"","rules":[{"t":"set","p":"payload","pt":"msg","to":"","tot":"str"}],"action":"","property":"","from":"","to":"","reg":false,"x":580,"y":600,"wires":[["e67ff6b9.417d88","c8d8270a.d5bb38"]]},{"id":"f9ad9672.3ee238","type":"inject","z":"7a95257d.29a44c","name":"","props":[{"p":"payload"},{"p":"topic","vt":"str"}],"repeat":"","crontab":"","once":false,"onceDelay":0.1,"topic":"","payload":"","payloadType":"date","x":180,"y":600,"wires":[["e67ff6b9.417d88"]]},{"id":"c8d8270a.d5bb38","type":"debug","z":"7a95257d.29a44c","name":"","active":true,"tosidebar":true,"console":false,"tostatus":false,"complete":"false","statusVal":"","statusType":"auto","x":840,"y":600,"wires":[]},{"id":"9fde1f5d.b78f3","type":"comment","z":"7a95257d.29a44c","name":"multi links","info":"","x":100,"y":680,"wires":[]},{"id":"6f31d999.786708","type":"switch","z":"7a95257d.29a44c","name":"","property":"payload","propertyType":"msg","rules":[{"t":"eq","v":"","vt":"str"}],"checkall":"true","repair":false,"outputs":1,"x":610,"y":740,"wires":[["4dde0b90.5530f4"]]},{"id":"ba2eeacc.2f8548","type":"batch","z":"7a95257d.29a44c","name":"","mode":"count","count":10,"overlap":0,"interval":10,"allowEmptySequence":false,"topics":[{"topic":""}],"x":610,"y":800,"wires":[["a7dd9baf.8ed778"]]},{"id":"b395ff72.ed96f","type":"function","z":"7a95257d.29a44c","name":"","func":"return msg;","outputs":2,"noerr":0,"initialize":"","finalize":"","x":340,"y":840,"wires":[["ba2eeacc.2f8548"],["3d98f29a.5792ee"]]},{"id":"3d98f29a.5792ee","type":"template","z":"7a95257d.29a44c","name":"","field":"payload","fieldType":"msg","format":"handlebars","syntax":"mustache","template":"This is the payload: {{payload}} !","output":"str","x":620,"y":860,"wires":[["42614951.82f768"]]},{"id":"4dde0b90.5530f4","type":"debug","z":"7a95257d.29a44c","name":"","active":true,"tosidebar":true,"console":false,"tostatus":false,"complete":"false","statusVal":"","statusType":"auto","x":810,"y":740,"wires":[]},{"id":"a7dd9baf.8ed778","type":"debug","z":"7a95257d.29a44c","name":"","active":true,"tosidebar":true,"console":false,"tostatus":false,"complete":"false","statusVal":"","statusType":"auto","x":810,"y":800,"wires":[]},{"id":"42614951.82f768","type":"debug","z":"7a95257d.29a44c","name":"","active":true,"tosidebar":true,"console":false,"tostatus":false,"complete":"false","statusVal":"","statusType":"auto","x":810,"y":860,"wires":[]},{"id":"27f8b385.602eac","type":"delay","z":"7a95257d.29a44c","name":"","pauseType":"delay","timeout":"5","timeoutUnits":"seconds","rate":"1","nbRateUnits":"1","rateUnits":"second","randomFirst":"1","randomLast":"5","randomUnits":"seconds","drop":false,"x":340,"y":760,"wires":[["6f31d999.786708","ba2eeacc.2f8548"]]},{"id":"8962e5da.6cf8a8","type":"inject","z":"7a95257d.29a44c","name":"","props":[{"p":"payload"},{"p":"topic","vt":"str"}],"repeat":"","crontab":"","once":false,"onceDelay":0.1,"topic":"","payload":"","payloadType":"date","x":150,"y":760,"wires":[["27f8b385.602eac"]]},{"id":"df7a5e8c.b937","type":"inject","z":"7a95257d.29a44c","name":"","props":[{"p":"payload"},{"p":"topic","vt":"str"}],"repeat":"","crontab":"","once":false,"onceDelay":0.1,"topic":"","payload":"","payloadType":"date","x":160,"y":840,"wires":[["b395ff72.ed96f"]]}]';
        const fs = FMFlowSet.parseFlow(JSON.parse(flowsjson));
        it('should return empty list for non-existing Id', function() {
            const nn = fs.upstream("notexist");
            nn.should.have.lengthOf(0);
        });
        it('should enumerate downstream nodes (include itself).', function() {
            const nn = fs.upstream("a1aaca4d.faf618");
            nn.should.have.members([
                "a1aaca4d.faf618",
                "964007fb.267128"
            ]);
        });
        it('should follow link in/out nodes', function() {
            const nn = fs.upstream("33d78e44.356e72");
            nn.should.have.members([
                "33d78e44.356e72",
                "8a301da0.18ea5",
                "f8c01552.3cec38"
            ]);
        });
        it('should follow a subflow instance, and not follow its containing nodes', function() {
            const nn = fs.upstream("62a9deb7.4d304");
            nn.should.have.members([
                "62a9deb7.4d304",
                "c6dbe45a.b395c8",
                "fa2321e6.e8f78"
            ]);
        });
        it('should follow a flow even if it contains loops', function() {
            const nn = fs.upstream("e67ff6b9.417d88");
            nn.should.have.members([
                "c4b3620f.5f20b",
                "e67ff6b9.417d88",
                "f9ad9672.3ee238"
            ]);
        });
        it('should follow multiple links on a single port', function() {
            const nn = fs.upstream("ba2eeacc.2f8548");
            nn.should.have.members([
                "ba2eeacc.2f8548",
                "27f8b385.602eac",
                "8962e5da.6cf8a8",
                "b395ff72.ed96f",
                "df7a5e8c.b937"
            ]);
        });
    });
});