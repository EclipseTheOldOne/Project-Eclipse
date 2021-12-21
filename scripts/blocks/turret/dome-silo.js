const lib = require("libs/bulletLib")
const domeSilo = extend(Turret, "dome-silo", {
    canReplace(other){
        this.super$canReplace(other);
        return other == Blocks.vault
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
        if(!valid){this.drawPlaceText("Can only be placed on vault!", x, y, false)}
    }
})
domeSilo.buildType = () => extend(Turret.TurretBuild, domeSilo, {
    reload: 0.0,
    update(){
        this.super$update();
        if(this.cons.valid()){this.reload = Mathf.clamp(this.edelta() * 0.0166667 / 5 * Time.delta + this.reload, 0, 1)}
    },
    buildConfiguration(table){
        this.super$buildConfiguration(table);
        table.button(Icon.grid, () => {
            if(this.cons.valid() && !Vars.state.isPaused() && this.reload >= 1){
                this.consume();
                this.reload = 0
                lib.domeSiloBullet.create(this, this.team, this.x, this.y, 0)
            }
        }).size(64, 64)
    },
    draw(){
        this.super$draw();
        Draw.rect("mindus-dome-silo-base", this.x, this.y);
        Draw.rect(
            "mindus-dome-silo-phane1",
            this.x + (1 - this.reload) * 3,
            this.y + (1 - this.reload) * 3
        )
        Draw.rect(
            "mindus-dome-silo-phane2",
            this.x - (1 - this.reload) * 3,
            this.y - (1 - this.reload) * 3
        )
        Draw.rect("mindus-dome-silo-top", this.x, this.y);
        Draw.blend(Blending.additive);
        Draw.color(Pal.turretHeat);
        Draw.alpha(1 - this.reload);
        Draw.rect("mindus-dome-silo-heat", this.x, this.y);
        Draw.blend();
    },
    control(type, p1, p2, p3, p4){
        this.super$control(type, p1, p2, p3, p4)
        if(type == LAccess.enabled && p1 == 1){
            if(this.cons.valid() && !Vars.state.isPaused() && this.reload >= 1){
                this.consume();
                this.reload = 0
                lib.domeSiloBullet.create(this, this.team, this.x, this.y, 0)
            }
        }
    }
})