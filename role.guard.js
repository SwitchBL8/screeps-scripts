var roleGuard = { 
    /** @param {Creep} creep **/
    run: function(creep) {
        army = creep.pos.findClosestByRange(FIND_HOSTILE_CREEPS);
        if(army) {
            creep.attack(army);
        } else {
            creep.moveTo(creep.pos.findClosestByRange(FIND_FLAGS));
        }
    }
};

module.exports = roleGuard;