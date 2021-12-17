const pulseWave = new Effect(20, e => {
    Draw.color(Pal.lancerLaser);
    Lines.stroke(e.fout() * 3);
    Lines.circle(e.x, e.y, e.fin() * 110);
    Draw.alpha(e.fout())
    Fill.circle(e.x, e.y, e.fin() * 110);
});
module.exports = {
    pulseWave:pulseWave
};