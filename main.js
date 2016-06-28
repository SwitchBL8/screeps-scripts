var roleHarvester = require('role.harvester');
var roleUpgrader = require('role.upgrader');
var roleBuilder = require('role.builder');
var roleGuard = require('role.guard');
var roleRoadRepairer = require('role.roadrepairer');

//global.creepRoleCount = {};
global.countRoles = function() {
    global.creepRoleCount = { "harvester": 0, "builder": 0, "upgrader": 0, "guard": 0, "roadrepairer": 0};
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

global.removeDeadCreeps = function() {
    for(var name in Memory.creeps) {
           if(!Game.creeps[name]) {
               delete Memory.creeps[name];
           }
       }
}

module.exports.loop = function () {

    global.removeDeadCreeps();
    for (var name in Game.creeps) {
        var creep = Game.creeps[name];
        if (creep.memory.role == 'harvester') { roleHarvester.run(creep); }
        if (creep.memory.role == 'upgrader') { roleUpgrader.run(creep); }
        if (creep.memory.role == 'builder') { roleBuilder.run(creep); }
        if( creep.memory.role == 'guard'){ roleGuard.run(creep);}
        if( creep.memory.role == 'roadrepairer'){ roleRoadRepairer.run(creep);}
    }
    countRoles();
    var now = new Date();
    var creepSuffix = now.getDate() + now.getHours();
    if(global.creepRoleCount["harvester"] < 2) {
        Game.spawns.Home.createCreep([WORK, CARRY, MOVE, MOVE], 'Harvester'.concat(creepSuffix), { role: 'harvester'});
    }
    if(global.creepRoleCount["builder"] < 2) {
        Game.spawns.Home.createCreep([WORK, CARRY, MOVE], 'Builder'.concat(creepSuffix), { role: 'builder'});
    }

    if(global.creepRoleCount["upgrader"] < 2) {
        Game.spawns.Home.createCreep([WORK, WORK, CARRY, MOVE], 'Upgrader'.concat(creepSuffix), { role: 'upgrader'});
    }
    if(global.creepRoleCount["roadrepairer"] < 2) {
        Game.spawns.Home.createCreep([WORK, WORK, CARRY, MOVE], 'RoadRepairer'.concat(creepSuffix), { role: 'roadrepairer'});
    }
    if(global.creepRoleCount["guard"] < 2) {
        //console.log("Spawning guard: " + 
        Game.spawns.Home.createCreep([TOUGH, ATTACK, RANGED_ATTACK, MOVE], 'Guard'.concat(creepSuffix) , { role: 'guard'});//);
    }
}
