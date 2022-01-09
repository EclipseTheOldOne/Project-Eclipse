const pulseWave = new Effect(20, e => {
    Draw.color(Pal.lancerLaser);
    Lines.stroke(e.fout() * 3);
    Lines.circle(e.x, e.y, e.fin() * 110);
    Draw.alpha(e.fout())
    Fill.circle(e.x, e.y, e.fin() * 110);
});
const pulseEmpWave = new Effect(10, e => {
    Draw.color(Pal.lancerLaser);
    Lines.stroke(e.fout() * 3);
    Lines.circle(e.x, e.y, e.fin() * 30);
    Draw.alpha(e.fout())
    Fill.circle(e.x, e.y, e.fin() * 30);
});
const mendWave = new Effect(20, e => {
    Draw.color(Pal.heal);
    Lines.stroke(e.fout() * 4);
    Lines.circle(e.x, e.y, e.fin() * 180);
    Draw.alpha(e.fout())
    Fill.circle(e.x, e.y, e.fin() * 180);
});
const overDriveWave = new Effect(40, e => {
    //literally mendWave but overdrive Color'ed
    var eInterp = Interp.exp10Out
    Draw.color(e.color)
    Lines.stroke(e.fout() * 2);
    Lines.circle(e.x, e.y, eInterp.apply(e.fin()) * 140);
    Draw.alpha(e.fout() / 3)
    Fill.circle(e.x, e.y, eInterp.apply(e.fin()) * 140);
});
//basically itemtransfer effect but longer lifetime and use swing
const itemSlowTransfer = new Effect(120, e => {
    if(!(e.data instanceof Position)) return;
    Tmp.v1.set(e.x, e.y).interpolate(Tmp.v2.set(e.data), e.fin(), Interp.swing).add(Tmp.v2.sub(e.x, e.y).nor().rotate90(1).scl(Mathf.randomSeedRange(e.id, 1) * e.fslope() * 10));
    var x = Tmp.v1.x, y = Tmp.v1.y;
    var size = 1;

    Lines.stroke(e.fslope() * 2 * size, Pal.accent);
    Lines.circle(x, y, e.fslope() * 2 * size);

    Draw.color(e.color);
    Fill.circle(x, y, e.fslope() * 1.5 * size);
})
const phaseBubble = new Effect(20, e => {
    Draw.z(Layer.block + 0.001);
    Draw.color(Pal.accent);
    Lines.stroke(e.fout() * 2);
    Lines.circle(e.x, e.y, e.fin() * 2);
})
const waterBubble = new Effect(20, e => {
    Draw.z(Layer.block + 0.001);
    Draw.color(Color.valueOf("6d81e3"));
    Lines.stroke(e.fout() * 2);
    Lines.circle(e.x, e.y, e.fin() * 4);
})
const overdriveParticle = new Effect(20, e => {
    Draw.color(Pal.redDust);
    Fill.poly(e.x, e.y, 4, e.fout() * 4);
})
module.exports = {
    pulseWave:pulseWave,
    mendWave:mendWave,
    itemSlowTransfer:itemSlowTransfer,
    phaseBubble:phaseBubble,
    waterBubble:waterBubble,
    pulseEmpWave:pulseEmpWave,
    overDriveWave:overDriveWave,
    overdriveParticle:overdriveParticle
};