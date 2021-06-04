class Quadtree {
    constructor(level, bounds) {
        this.level = level;
        this.bounds = bounds;
        this.objects = new Set();
        this.nodes = []
    }
    clear() {
        this.objects.clear();
        for (var i = 0; i < this.nodes.length; i++) {
            if (this.nodes[i]) {
                this.nodes[i].clear();
                this.nodes[i] = null;
            }
        }
    }
    split() {
        var subWidth = this.bounds[2]/2;
        var subHeight = this.bounds[3]/2;
        var x = this.bounds[0];
        var y = this.bounds[1];
        this.nodes[0] = new Quadtree(this.level+1, [x + subWidth, y, subWidth, subHeight]);
        this.nodes[1] = new Quadtree(this.level+1, [x, y, subWidth, subHeight]);
        this.nodes[2] = new Quadtree(this.level+1, [x, y + subHeight, subWidth, subHeight]);
        this.nodes[3] = new Quadtree(this.level+1, [x + subWidth, y + subHeight, subWidth, subHeight]);
    }

    getIndex(node) {
        var px = node.x;
        var py = node.y;
        var pw = node.width;
        var ph = node.height;
        var indexes = [];
        var verticalMidpoint = this.bounds[0] + (this.bounds[2] / 2);
        var horizontalMidpoint = this.bounds[1] + (this.bounds[3] / 2);
        var inNorth = py < horizontalMidpoint;
        var inSouth = py+ph > horizontalMidpoint;
        var inWest = px < verticalMidpoint;
        var inEast = px+pw > verticalMidpoint;

        if (inNorth && inEast) {
            indexes.push(0);
        }
        if (inNorth && inWest) {
            indexes.push(1);
        }
        if (inSouth && inWest) {
            indexes.push(2);
        }
        if (inSouth && inEast) {
            indexes.push(3);
        }
        return indexes;
    }

    insert(node) {
        if (this.nodes[0]) {
            var indexes = this.getIndex(node);
            if (indexes.length > 0) {
                for (var i=0,l=indexes.length;i<l;i++) {
                    this.nodes[indexes[i]].insert(node);
                }
            }
            return;
        }

        this.objects.add(node);

        if (this.objects.size > 5 && this.level < 8) {
            if (this.nodes[0] == null) {
                this.split();
            }

            for (var obj of this.objects) {
                var indexes = this.getIndex(obj);
                for (var i=0,l=indexes.length;i<l;i++) {
                    this.nodes[indexes[i]].insert(obj);
                }
            }
            this.objects.clear();
        }
    }
    retrieve(returnObjects,node) {
        var indexes = this.getIndex(node);
        if (this.nodes[0]) {
            for(var i=0; i<indexes.length; i++) {
                this.nodes[indexes[i]].retrieve(returnObjects,node);
            }
        }
        for (var obj of this.objects) {
            returnObjects.add(obj);
        }
       return returnObjects;
     }
}

class ResultSet {
    constructor() {
        this.setMap = {};
        this.allSets = new Set();
    }
    add(nodes) {
        // Adds the given nodes to a Set and adds that set to the list of sets
        // each of those nodes is in.
        var set = new Set();
        set.id = Math.floor(Math.random()*100)
        this.allSets.add(set);
        for (var i=0;i<nodes.length;i++) {
            set.add(nodes[i]);
            if (this.setMap[nodes[i]] && this.setMap[nodes[i]] !== set) {
                // This node is already in a different set - copy that sets contents over
                // and update the map references
                var existingSet = this.setMap[nodes[i]];
                for (var id of existingSet) {
                    set.add(id);
                    this.setMap[id] = set;
                }
                this.allSets.delete(existingSet);
            }
            this.setMap[nodes[i]] = set;
        }
    }

    getSets() {
        return Array.from(this.allSets).filter(s => s.size > 0).map(set => Array.from(set));
    }
}


function getQTObject(node) {
    var labelShown = node.showLabel;
    var nw = (node.w || (labelShown?160:30)) + 10;
    var nh = (node.h || 30) + 5;
    var nx = node.x - nw/2;
    var ny = node.y - nh/2;
    return {n:node, x:nx, y: ny, width: nw, height: nh};
}

function testOverlap(obj1, obj2) {
    if (obj1.x >= obj2.x+obj2.width || obj2.x >= obj1.x+obj1.width) {
        return false;
    }
    if (obj1.y >= obj2.y+obj2.height || obj2.y >= obj1.y+obj1.height) {
        return false;
    }
    return true
}

module.exports = {
    meta: {
        type: "suggestion",
        severity: "warn",
        docs: {
            description: "ensure no nodes overlap"
        }
    },
    create: function(context, ruleConfig) {
        var quadTrees = {};
        var checked = {};
        var nodes = [];
        var candidates = new Set();
        var startTime;
        var endTime;
        return {
            start: function() {
            },
            node: function(node) {
                if (node.z) {
                    quadTrees[node.z] = quadTrees[node.z] || new Quadtree(0,[0,0,5000,5000])
                }
                if (node.hasOwnProperty('x') && node.hasOwnProperty('y')) {
                    quadTrees[node.z].insert(getQTObject(node));
                    nodes.push(node);
                }
            },
            end: function() {
                startTime = performance.now();
                var resultSet = new ResultSet();

                nodes.forEach(function(node) {
                    if (!checked[node.id]) {
                        var tree = quadTrees[node.z];
                        candidates.clear();
                        var thisNode = getQTObject(node);
                        var overlaps = [];
                        tree.retrieve(candidates, thisNode)
                        for (var obj of candidates) {
                            if (obj.n.id !== node.id) {
                                if (testOverlap(thisNode, obj)) {
                                    overlaps.push(obj.n.id);
                                }
                            }
                        }
                        if (overlaps.length > 0) {
                            overlaps.unshift(node.id);
                            resultSet.add(overlaps);
                        }
                    }
                });

                var overlappingSets = resultSet.getSets();
                overlappingSets.forEach(function(set) {
                    context.report({
                        location: set,
                        message: "Overlapping nodes"
                    });
                })
                endTime = performance.now();
                // console.log("overlapping took ",endTime - startTime);
            }

        }
    }
};
