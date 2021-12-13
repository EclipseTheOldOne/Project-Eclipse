const steamGen = extend(BurnerGenerator, "adv-steam-gen", {
    generateFx: Fx.smeltsmoke,
    getItemEfficiency(item) {
      return item.flammability * (1.5 - liquid.temperature)
    }
});
steamGen.buildType = () => extend(BurnerGenerator.BurnerGeneratorBuild, steamGen, {
  update(){
    this.super$update();

    if(this.productionEfficiency > 0.0 && this.generateTime - Time.delta <= 0 && Mathf.chance(0.01)) steamGen.generateFx.at(this.x + Mathf.range(steamGen.generateEffectRnd), this.y + Mathf.range(steamGen.generateEffectRnd));
  }
})