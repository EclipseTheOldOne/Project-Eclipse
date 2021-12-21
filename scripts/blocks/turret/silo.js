const lib = require("libs/bulletLib")
const scatterSilo = extend(Turret, "scatter-silo", {
    canReplace(other){
        this.super$canReplace(other);
        return other == Blocks.container
    },
    setBars(){
        this.super$setBars()
        this.bars.add("reload", entity => new Bar(
            () => "Reload",
            () => Pal.bulletYellowBack,
            () => entity.reload
        ))
    },
    drawPlace(x, y, rotation, valid){
        this.super$drawPlace(x, y, rotation, valid);
        if(!valid){this.drawPlaceText("Can only be placed on container!", x, y, false)}
    }
})
scatterSilo.buildType = () => extend(Turret.TurretBuild, scatterSilo, {
    reload: 0.0,
    update(){
        this.super$update();
        this.reload = Mathf.clamp(Time.delta * 0.0166667 + this.reload, 0, 1)
    },
    buildConfiguration(table){
        this.super$buildConfiguration(table);
        table.button(Icon.commandAttack, () => {
            if(this.cons.valid() && !Vars.state.isPaused() && this.reload >= 1){
                Fx.flakExplosion.at(this.x, this.y)
                this.consume();
                this.reload = 0
                for (let i = 0; i < 10; i++){
                    lib.siloBullet.create(this, this.team, this.x, this.y, Mathf.random(360), Mathf.random(0.8, 1.3), 1)
                }
            }
        }).size(64, 64)
    },
    draw(){
        this.super$draw();
        Draw.rect("mindus-scatter-silo-base", this.x, this.y);
        Draw.rect(
            "mindus-scatter-silo-phane1",
            this.x + (1 - this.reload) * 2,
            this.y + (1 - this.reload) * 2
        )
        Draw.rect(
            "mindus-scatter-silo-phane2",
            this.x - (1 - this.reload) * 2,
            this.y - (1 - this.reload) * 2
        )
        Draw.rect("mindus-scatter-silo-top", this.x, this.y);
        Draw.blend(Blending.additive);
        Draw.color(Pal.turretHeat);
        Draw.alpha(1 - this.reload);
        Draw.rect("mindus-scatter-silo-heat", this.x, this.y);
        Draw.blend();
    },
    control(type, p1, p2, p3, p4){
        this.super$control(type, p1, p2, p3, p4)
        if(type == LAccess.enabled && p1 == 1){
            if(this.cons.valid() && !Vars.state.isPaused() && this.reload >= 1){
                Fx.flakExplosion.at(this.x, this.y)
                this.consume();
                this.reload = 0
                for (let i = 0; i < 10; i++){
                    lib.siloBullet.create(this, this.team, this.x, this.y, Mathf.random(360), Mathf.random(0.8, 1.3), 1)
                }
            }
        }
    }
})