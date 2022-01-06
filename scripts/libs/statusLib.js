const eLib = require("libs/effectLib")
const saltStun = extend(StatusEffect, "salt-stun", {
    reloadMultiplier: 0.01,
    speedMultiplier: 0.001,
    color: Pal.lancerLaser
})
const accelerated = extend(StatusEffect, "accelerated", {
    damageMultiplier: 1.2,
    speedMultiplier: 1.35,
    reloadMultiplier: 1.65,
    buildSpeedMultiplier: 2.5,
    color: Pal.redDust,
    effect: eLib.overdriveParticle
})
module.exports = {
    saltStun:saltStun,
    accelerated:accelerated
};