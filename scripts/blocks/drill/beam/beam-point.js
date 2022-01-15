const bTur = extend(BaseTurret, "beam-tur", {})
bTur.buildType = () => extend(BaseTurret.BaseTurretBuild, bTur, {
    target: null,
    warmupT: 0,
    update(){
        this.target = Vars.indexer.findTile(this.team, this.x, this.y, bTur.range, b => {
            return b.block == "mindus-beamer"
        })
        if(this.target != null){
            var angDst = this.angleTo(this.target)
            this.rotation = Angles.moveToward(this.rotation, angDst, 3 * this.efficiency());
            if(Angles.angleDist(this.rotation, angDst) <= 5){
                print(this.target.boosters)
                this.warmupT = Mathf.lerp(this.warmupT, this.efficiency(), 0.1)
            }else{this.warmupT = Mathf.lerp(this.warmupT, 0, 0.3)}
        }
    },
    updateTile(){
        this.super$updateTile()
        if(this.target != null){
            print("bbb" + this.target.boosters)
        }
    },
    draw(){
        Draw.rect("mindus-beam-tur-base", this.x, this.y)
        Draw.rect("mindus-beam-tur", this.x, this.y, this.rotation - 90)
        Draw.alpha(this.warmupT)
        if(this.target != null){
            Draw.z(Layer.effect)
            Lines.stroke(2 + Mathf.sin(Time.time, 10, 0.5))
            Lines.line(this.x, this.y, this.target.x, this.target.y)
        }
    }
})