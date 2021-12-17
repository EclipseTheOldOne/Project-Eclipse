const mBolt = extend(ItemTurret, "bolt", {});
mBolt.buildType = () => extend(ItemTurret.ItemTurretBuild, mBolt, {
    a: 0.0,
    update(){
        this.super$update();
        if(this.isShooting()){
            this.a = Mathf.clamp(this.a + 0.007, 0.1, 1.8)
        }else{
            this.a = Mathf.clamp(this.a - 0.015, 0.1, 1.8)
        };
        print(this.a)
    },
    baseReloadSpeed() {
        return this.efficiency() * this.a;
    }
});