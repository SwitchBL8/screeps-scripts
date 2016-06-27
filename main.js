var roleHarvester = require('role.harvester');
var roleUpgrader = require('role.upgrader');
var roleBuilder = require('role.builder');
var roleGuard = require('role.guard');

//global.creepRoleCount = {};
global.countRoles = function() {
    global.creepRoleCount = { "harvester": 0, "builder": 0, "upgrader": 0, "guard": 0};
    for(var i in Game.creeps){
        global.creepRoleCount[Game.creeps[i].memory.role] += 1;
    }
};

global.GetCreepsByRole = function(role){
  var CreepList = [];
    for (var creepname in Game.creeps){
      if (Game.creeps[creepname].memory.role == role){
      CreepList.push(Game.creeps[creepname]);
    }
  }
  return CreepList
};

module.exports.loop = function () {

    
    for (var name in Game.creeps) {
        var creep = Game.creeps[name];
        if (creep.memory.role == 'harvester') { roleHarvester.run(creep); }
        if (creep.memory.role == 'upgrader') { roleUpgrader.run(creep); }
        if (creep.memory.role == 'builder') { roleBuilder.run(creep); }
        if( creep.memory.role == 'guard'){ roleGuard.run(creep);}
    }
    countRoles();
    if(global.creepRoleCount["harvester"] == 0) {
        Game.spawns.Home.createCreep([WORK, CARRY, MOVE], 'Harvester1', { role: 'harvester'});
    }
    if(global.creepRoleCount["builder"] < 2) {
        Game.spawns.Home.createCreep([WORK, CARRY, MOVE], 'Builder'.concat(global.creepRoleCount["builder"] + 1), { role: 'builder'});
    }

    if(global.creepRoleCount["upgrader"] < 2) {
        Game.spawns.Home.createCreep([WORK, WORK, CARRY, MOVE], 'Upgrader'.concat(global.creepRoleCount["upgrader"] + 1), { role: 'upgrader'});
    }
    if(global.creepRoleCount["guard"] < 3) {
        //console.log("Spawning guard: " + 
        Game.spawns.Home.createCreep([TOUGH, ATTACK, RANGED_ATTACK, MOVE], 'Guard'.concat(global.creepRoleCount["guard"] + 1) , { role: 'guard'});//);
    }
}
