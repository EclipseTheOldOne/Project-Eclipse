const ammolib = require("libs/bulletLib")
const basicCrossBow = extend(ItemTurret, "crossbow", {})
basicCrossBow.buildType = () => extend(ItemTurret.ItemTurretBuild, basicCrossBow, {
    a: 0,
    shoot(type){
        this.super$shoot(type);
        this.a++
        print(basicCrossBow.tr2)
        if(this.a >= 3){ammolib.smallSkillArrow.create(this, this.team, this.x, this.y, this.rotation, 1 ,1); this.a = 0};
    },
    draw(){
        this.super$draw();
        Draw.alpha(this.reload / basicCrossBow.reloadTime);
        Draw.rect("mindus-small-arrow-copper", this.x + basicCrossBow.tr2.x, this.y + basicCrossBow.tr2.y, this.rotation - 90);
        Draw.alpha(1)
        Draw.rect("mindus-crossbow-top", this.x + basicCrossBow.tr2.x, this.y + basicCrossBow.tr2.y, this.rotation - 90);
    }
})
