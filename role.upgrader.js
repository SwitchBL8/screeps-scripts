// role.upgrader
// Upgrade controller every 20000 ticks or lose a controller-level. Level 0 means no control over the room.
var roleUpgrader = {
    /** @param {Creep} creep **/
    run: function (creep) {
        if (creep.carry.energy < creep.carryCapacity && creep.memory.upgrading != true) {
            //var sources = creep.room.find(FIND_SOURCES);
            var closestSource = creep.pos.findClosestByRange(FIND_SOURCES);
            if (creep.harvest(closestSource) == ERR_NOT_IN_RANGE) {
                creep.moveTo(closestSource);
            }
        } else if (creep.carry.energy == creep.carryCapacity && creep.memory.upgrading != true) {
            creep.memory.upgrading = true;
        }
        if (creep.upgradeController(creep.room.controller) == ERR_NOT_IN_RANGE && creep.memory.upgrading == true) {
            creep.moveTo(creep.room.controller);
        }
        if (creep.memory.upgrading == true && creep.carry.energy == 0) {
            creep.memory.upgrading = false;
        }
    }
};
module.exports = roleUpgrader;