const mBolt = extend(ItemTurret, "bolt", {});
mBolt.buildType = () => extend(ItemTurret.ItemTurretBuild, mBolt, {
    a: 0.0,
    update(){
        this.super$update();
        if(this.isShooting()){
            this.a = Mathf.clamp(this.a + 0.007, 0.1, 3)
        }else{
            this.a = Mathf.clamp(this.a - 0.015, 0.1, 3)
        };
        mBolt.inaccuracy = this.a * 3
    },
    baseReloadSpeed() {
        return this.efficiency() * this.a;
    }
});