var roadRepairer = {
    run: function (creep) {

        if (creep.energy === 0) {
            var spawn = creep.pos.findClosest(FIND_MY_SPAWNS);
            if (!creep.pos.isNextTo(spawn)) {
                creep.moveTo(spawn);
            }
            if ((spawn) > [199]) {
                spwn.transferEnergy(creep);
            }
        }
        else {

            var roadToRepair = creep.pos.findClosest(FIND_STRUCTURES, {
                filter: function (object) {
                    if (object.structureType != STRUCTURE_ROAD) {
                        return false;
                    }
                    if (object.hits > object.hitsMax / 3) {
                        return false;
                    }
                    return true;
                }
            });
            if (creep.repair(roadToRepair) == ERR_NOT_IN_RANGE) {
                creep.moveTo(roadToRepair);
            }
        }
    }
};
module.exports = roadRepairer;