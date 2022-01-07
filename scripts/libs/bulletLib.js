const effectLib = require("libs/effectLib")
const statusLib = require("libs/statusLib")
const smallSkillArrow = extend(BasicBulletType, 7.5, 45, {
    height: 16,
    width: 8,
    lifetime: 29.33,
    lightOpacity: 0,
    trailLength: 4,
    trailWidth: 1,
    pierceCap: 50,
    pierce: true,
    layer: 98,
    shrinkY: 0,
    sprite: "mindus-skill-small-arrow",
    backColor: Color.valueOf("e58956"),
    frontColor: Color.valueOf("ffd2ae")
});
const pulseBullet = extend(BasicBulletType, 0, 0, "circle-bullet", {
    height: 8,
    width: 8,
    instantDisappear: true,
    status: StatusEffects.unmoving,
    statusDuration: 20,
    splashDamage: 15,
    splashDamageRadius: 110,
    lifeTime: 1,
    frontColor: Color.valueOf("ffffff00"),
    knockback: 16,
    trailColor: Pal.lancerLaser,
    backColor: Color.valueOf("ffffff00"),
    despawnEffect: effectLib.pulseWave
});
const pulseStunBullet = extend(BasicBulletType, 0, 0, "circle-bullet", {
    height: 8,
    width: 8,
    instantDisappear: true,
    status: statusLib.saltStun,
    statusDuration: 220,
    splashDamage: 35,
    splashDamageRadius: 110,
    lifeTime: 1,
    frontColor: Color.valueOf("ffffff00"),
    knockback: 16,
    trailColor: Pal.lancerLaser,
    backColor: Color.valueOf("ffffff00"),
    despawnEffect: effectLib.pulseWave
});
const siloBullet = extend(BasicBulletType, 5, 35, "shell", {
    height: 16,
    width: 6.5,
    splashDamage: 15,
    splashDamageRadius: 48,
    lifetime: 24,
    trailLength: 10,
    knockback: 4,
    trailColor: Pal.bulletYellowBack,
    trailWidth: 2.75,
    backColor: Pal.bulletYellowBack,
    hitEffect: Fx.flakExplosion,
    despawnEffect: Fx.flakExplosion,
    frontColor: Pal.bulletYellow
});
const domeSiloBullet = extend(EmpBulletType, {
    instantDisappear: true,
    healPercent: 55,
    radius: 180,
    damage: 15,
    status: StatusEffects.electrified,
    splashDamage: 45,
    splashDamageRadius: 180,
    timeDuration: 145,
    timeIncrease: 3.5,
    despawnEffect: effectLib.mendWave
});
const subOrb = extend(BasicBulletType, 3, 20, "circle-bullet", {
    height: 4,
    width: 4,
    trailLength: 10,
    trailWidth: 2,
    trailColor: Pal.lancerLaser,
    shrinkY: 0,
    hitEffect: Fx.none,
    despawnEffect: Fx.none,
    backColor: Pal.lancerLaser,
    lifetime: 60,
    homingPower: 0.3,
    homingRange: 120
})
const liOrb = extend(EmpBulletType, {
    lifetime: 120,
    speed: 1,
    damage: 25,
    shrinkY: 0,
    backColor: Color.valueOf("86b9e3"),
    frontColor: Pal.lancerLaser,
    radius: 30,
    hitPowerEffect: Fx.none,
    height: 16,
    width: 16,
    status: StatusEffects.shocked,
    collides: false,
    homingPower: 0.06,
    sprite: "circle-bullet",
    homingRange: 110,
    trailLength: 10,
    trailWidth: 8,
    trailColor: Pal.lancerLaser,
    splashDamageRadius: 30,
    splashDamage: 65,
    despawnEffect: effectLib.pulseEmpWave,
    reload: 0,
    update(bullet){
        this.super$update(bullet)
        if(Mathf.chance(0.1)){
            subOrb.create(bullet, bullet.team, bullet.x, bullet.y, Mathf.random(360), 1 , 1)
        }
    }
})
module.exports = {
    smallSkillArrow:smallSkillArrow,
    pulseBullet:pulseBullet,
    siloBullet:siloBullet,
    domeSiloBullet:domeSiloBullet,
    pulseStunBullet:pulseStunBullet,
    liOrb:liOrb
}