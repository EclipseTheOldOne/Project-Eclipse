const steamGen = extend(BurnerGenerator, "adv-steam-gen", {
    generateFx: Fx.smeltsmoke
});
steamGen.consumes.add(extend(ConsumeCoolant, 0.15, {optional: true}))
steamGen.buildType = () => extend(BurnerGenerator.BurnerGeneratorBuild, steamGen, {
    update(){
        eff: 0.0
        this.super$update()
        if (this.items.total() > 0 && this.liquids.total() > 0 && this.items.first() != null){
            this.eff = Mathf.clamp((1.5 - this.liquids.current().temperature), 0.5, 10000) * this.items.first().flammability
        }
        else{
            if(this.items.total() > 0 && this.items.first() != null){
                this.eff = this.items.first().flammability / 2
            }
            else {
                this.eff = 0
            };
        }
        this.productionEfficiency = eff
        if(this.productionEfficiency > 0.0 && this.generateTime - Time.delta <= 0 && Mathf.chance(0.01)) steamGen.generateFx.at(this.x + Mathf.range(steamGen.generateEffectRnd), this.y + Mathf.range(steamGen.generateEffectRnd));
    }
})