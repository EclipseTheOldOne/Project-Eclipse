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
})
module.exports = {
    smallSkillArrow:smallSkillArrow
}