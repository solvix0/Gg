const AudioFX = (() => {
  let ctx=null, master=null, musicGain=null, sfxGain=null, musicTimer=null, started=false;
  let settings={music:true,sfx:true};
  function init(){if(ctx)return;const AC=window.AudioContext||window.webkitAudioContext;if(!AC)return;ctx=new AC();master=ctx.createGain();musicGain=ctx.createGain();sfxGain=ctx.createGain();musicGain.gain.value=settings.music?.12:0;sfxGain.gain.value=settings.sfx?.35:0;musicGain.connect(master);sfxGain.connect(master);master.gain.value=.8;master.connect(ctx.destination);}
  function tone(freq,duration,type="sine",gain=.15,when=0,channel="sfx"){if(!ctx)return;const osc=ctx.createOscillator(),g=ctx.createGain(),t=ctx.currentTime+when;osc.type=type;osc.frequency.setValueAtTime(freq,t);g.gain.setValueAtTime(.0001,t);g.gain.exponentialRampToValueAtTime(gain,t+.025);g.gain.exponentialRampToValueAtTime(.0001,t+duration);osc.connect(g);g.connect(channel==="music"?musicGain:sfxGain);osc.start(t);osc.stop(t+duration+.04);}
  function chord(){if(!ctx||!settings.music)return;const t=ctx.currentTime;[220,261.63,329.63,392].forEach((f,i)=>tone(f,2.8,"sine",.025,i*.015,"music"));tone(110,3.2,"triangle",.035,0,"music");}
  function start(){init();if(!ctx)return;ctx.resume();if(started)return;started=true;chord();musicTimer=setInterval(()=>{if(settings.music)chord();},2900);}
  function setSettings(s){settings={...settings,...s};if(!ctx)init();if(musicGain)musicGain.gain.setTargetAtTime(settings.music?.12:0,ctx.currentTime,.08);if(sfxGain)sfxGain.gain.setTargetAtTime(settings.sfx?.35:0,ctx.currentTime,.05);}
  function click(){tone(560,.07,"sine",.09)}
  function success(){tone(523,.16,"sine",.18);tone(659,.2,"sine",.16,.12);tone(784,.28,"sine",.14,.26)}
  function fail(){tone(190,.22,"triangle",.18);tone(145,.32,"sawtooth",.07,.12)}
  function prank(){tone(420,.12,"square",.07);tone(300,.24,"triangle",.08,.13)}
  function warning(){tone(160,.5,"sawtooth",.15)}
  function transition(){tone(330,.12,"sine",.1);tone(440,.18,"sine",.1,.1)}
  return {start,setSettings,click,success,fail,prank,warning,transition};
})();