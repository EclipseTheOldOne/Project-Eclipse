//clone obj
const clone = obj => {
  if (obj === null || typeof(obj) !== 'object') return obj;
  var copy = obj.constructor();
  for (var attr in obj) {
    if (obj.hasOwnProperty(attr)) {
      copy[attr] = obj[attr];
    }
  };
  return copy;
}
//export
module.exports = (name, obj, objb) => {
  if (obj == undefined) obj = {};
  if (objb == undefined) objb = {};
  //set code defaukt
  obj = Object.assign({
    shootType: null,
    replacementblock: Blocks.container,
    speedLoad: 0.006,
    offSetPhane: 3,
    rotationOffSet: 45,
    load() {
      this.region = Core.atlas.find(this.name);
      this.buttonRegion = Core.atlas.find(this.name + "-button");
      this.topRegion = Core.atlas.find(this.name + "-top");
      this.heatRegion = Core.atlas.find(this.name + "-heat");
      this.phane1Region = Core.atlas.find(this.name + "-phane-1");
      this.phane2Region = Core.atlas.find(this.name + "-phane-2");
    },
    canReplace(other) {
      this.super$canReplace(other);
      return other == this.replacementblock;
    },
    setBars() {
      this.super$setBars()
      this.bars.add("reload", entity => new Bar(
        () => "Reload",
        () => Pal.bulletYellowBack,
        () => entity.reload / this.reloadTime
      ))
    },
    setStats() {
      this.super$setStats();
      this.stats.add(Stat.ammo, StatValues.ammo(ObjectMap.of(this, this.shootType)));
    },
    drawPlace(x, y, rotation, valid) {
      this.super$drawPlace(x, y, rotation, valid);
      Draw.z(Layer.endPixeled);
      this.drawPlaceText("Can only be placed on " + this.replacementblock.name + "!", x, y, (valid && this.replacementblock != null));
      Draw.reset();
    },
    icons() {
      return [this.region]
    }
  }, obj);

  objb = Object.assign({
    /*
    update() {
      this.super$update();
      if (this.consValid() && this.reload < 1){
      //Mathf.lerpDelta(this.reload, 1.1, Time.delta * turret.speedLoad * this.peekAmmo().reloadMultiplier * this.baseReloadSpeed())); 
      this.reload += Mathf.clamp((Time.delta * this.peekAmmo().reloadMultiplier * this.baseReloadSpeed()) * turret.speedLoad * 0.001);
      
      }
    },
    */
    updateTile() {
      this.wasShooting = false;

      this.recoil = Mathf.lerpDelta(this.recoil, 0, turret.restitution);
      this.heat = Mathf.lerpDelta(this.heat, 0, turret.cooldown);

      this.unit.tile(this);
      this.unit.rotation = this.rotation;
      this.unit.team = this.team;

      if (this.logicControlTime > 0) {
        this.logicControlTime -= Time.delta;
      }

      if (this.hasAmmo() && this.reload < turret.reloadTime) {
        if (isNaN(this.rotation)) this.rotation = 0;
        this.updateShooting();
      }

      if (turret.acceptCoolant) {
        this.updateCooling();
      }
    },
    updateShooting() {
      this.reload += (Time.delta * this.peekAmmo().reloadMultiplier * this.baseReloadSpeed()) * 0.1;
    },
    updateCooling() {
      if (this.hasAmmo() && this.reload < turret.reloadTime) {
        let maxUsed = turret.consumes.get(ConsumeType.liquid).amount;
        let liquid = this.liquids.current();

        let used = Math.min(this.liquids.get(liquid), maxUsed * Time.delta) * this.baseReloadSpeed();
        this.reload += (used * liquid.heatCapacity * turret.coolantMultiplier) * 0.1;
        this.liquids.remove(liquid, used);


        if (Mathf.chance(0.06 * used)) {
          turret.coolEffect.at(this.x + Mathf.range(turret.size * Vars.tilesize / 2), this.y + Mathf.range(turret.size * Vars.tilesize / 2));
        }
      }
    },
    buildConfiguration(table) {
      this.super$buildConfiguration(table);
      table.button(Icon.commandAttack, () => {
        if (this.reload > turret.reloadTime) {
          this.reload = 0;
          this.shoot(this.peekAmmo());
        }
      }).size(64, 64)
    },
    draw() {
      Draw.rect(turret.buttonRegion, this.x, this.y);
      Tmp.v1.trns(turret.rotationOffSet, (1 - this.reload / turret.reloadTime) * turret.offSetPhane)
      Draw.rect(
        turret.phane1Region,
        this.x + Tmp.v1.x,
        this.y + Tmp.v1.y
      )

      Draw.rect(
        turret.phane2Region,
        this.x - Tmp.v1.x,
        this.y - Tmp.v1.y
      )
      Draw.rect(turret.topRegion, this.x, this.y);

      if (!this.heat <= 0.00001) {
        Draw.blend(Blending.additive);
        Draw.color(turret.heatColor, this.heat);
        Draw.rect(turret.heatRegion, this.x, this.y);
        Draw.blend();
      };

      Draw.reset();
    },
    control(type, p1, p2, p3, p4) {
      this.super$control(type, p1, p2, p3, p4)
      if (type == LAccess.enabled && p1 == 1) {
        if (this.reload > turret.reloadTime) {
          this.reload = 0;
          this.shoot(this.peekAmmo());
          this.logicControlTime = turret.logicControlCooldown;
        }
      }
    },
    shoot(type) {
      this.wasShooting = true;
      //when charging is enabled, use the charge shoot pattern
      if (turret.chargeTime > 0) {
        this.useAmmo();
        turret.chargeBeginEffect.at(this.x, this.y, this.rotation);
        turret.chargeSound.at(this.x, this.y, 1);

        for (let i = 0; i < turret.chargeEffects; i++) {
          Time.run(Mathf.random(turret.chargeMaxDelay), () => {
            if (this.dead) return;
            turret.chargeEffect.at(this.x, this.y, this.rotation);
          });
        }

        this.charging = true;

        Time.run(turret.chargeTime, () => {
          if (this.dead) return;
          this.recoil = turret.recoilAmount;
          this.heat = 1;
          this.bullet(type, Mathf.random(360));
          this.effects();
          this.charging = false;
        });

        //when burst spacing is enabled, use the burst pattern
      } else if (turret.burstSpacing > 0.0001) {
        for (let i = 0; i < turret.shots; i++) {
          let ii = i;
          Time.run(turret.burstSpacing * i, () => {
            if (this.dead || !this.hasAmmo()) return;
            this.bullet(type, Mathf.random(360) + Mathf.range(inaccuracy + type.inaccuracy) + (ii - (shots / 2)) * turret.spread);
            this.effects();
            this.useAmmo();
            this.recoil = turret.recoilAmount;
            this.heat = 1;
          });
        }

      } else {
        //otherwise, use the normal shot pattern(s)

        if (turret.alternate) {
          for (let i = 0; i < turret.shots; i++) {
            this.bullet(type, (i * 360 / turret.shots) + Mathf.range(turret.inaccuracy + type.inaccuracy + 360 / turret.shots));
          }
        } else {
          for (let i = 0; i < turret.shots; i++) {
            this.bullet(type, Mathf.random(360) + Mathf.range(turret.inaccuracy + type.inaccuracy) + (i - (turret.shots / 2)) * turret.spread);
          }
        }

        this.shotCounter++;

        this.recoil = turret.recoilAmount;
        this.heat = 1;
        this.effects();
        this.useAmmo();
      }
    },
    bullet(type, angle) {
      //if silo not have target  make random Coords for LifeScl
      let x = this.x + Mathf.random(-this.range(), this.range());
      let y = this.y + Mathf.random(-this.range(), this.range());

      let lifeScl = type.scaleVelocity ? Mathf.clamp(Mathf.dst(this.x, this.y, x, y) / type.range(), this.minRange / type.range(), this.range() / type.range()) : 1;

      type.create(this, this.team, this.x, this.y, angle, 1 + Mathf.random(turret.velocityInaccuracy), lifeScl);
    },
    useAmmo() {
      this.consume();
    },
    hasAmmo() {
      return this.consValid();
    },
    peekAmmo() {
      return turret.shootType;
    }
  }, objb);
  const turret = extend(Turret, name, obj);

  turret.buildType = () => extend(Turret.TurretBuild, turret, clone(objb));

  return turret;
}