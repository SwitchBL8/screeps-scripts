var roleBuilder = {

    /** @param {Creep} creep **/
    run: function (creep) {

		if (creep.memory.building && creep.carry.energy == 0) {
            creep.memory.building = false;
		}
		if (!creep.memory.building && creep.carry.energy == creep.carryCapacity) {
			creep.memory.building = true;
		}

		if (creep.memory.building) {
			//var targets = creep.room.find(FIND_CONSTRUCTION_SITES);
            var targets = creep.pos.findClosestByRange(FIND_CONSTRUCTION_SITES);
            if (targets){//.length) {
                if (creep.build(targets) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(targets);
                }
            }
		}
		else {
			var closestSource = creep.pos.findClosestByRange(FIND_SOURCES);
            if(creep.harvest(closestSource) == ERR_NOT_IN_RANGE) {
                creep.moveTo(closestSource);
            }
		}
	}
};

module.exports = roleBuilder;
