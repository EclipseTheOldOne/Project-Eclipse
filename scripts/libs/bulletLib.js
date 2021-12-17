const effectLib = require("libs/effectLib")
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
    splashDamage: 15,
    splashDamageRadius: 110,
    lifeTime: 1,
    frontColor: Color.valueOf("ffffff00"),
    knockback: 16,
    trailColor: Pal.lancerLaser,
    backColor: Color.valueOf("ffffff00"),
    despawnEffect: effectLib.pulseWave
});
module.exports = {
    smallSkillArrow:smallSkillArrow,
    pulseBullet:pulseBullet
}