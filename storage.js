const Store = (() => {
  const KEY = "knowledgeConfidenceGame_v1";
  const defaults = () => ({
    hp:100, score:0, confidence:100, question:0, correct:0, wrong:0, hints:0,
    highest:0, attempts:{}, answered:{}, achievements:[], flags:{}, audio:{music:true,sfx:true},
    started:false, phase:"welcome", consecutive:0, firstTry:{}, statsReviewed:false
  });
  let state = defaults();
  function load(){try{const raw=localStorage.getItem(KEY);if(raw)state={...defaults(),...JSON.parse(raw)};}catch(e){state=defaults();}return state;}
  function save(){try{localStorage.setItem(KEY,JSON.stringify(state));const el=document.getElementById("saveStatus");if(el)el.textContent="● تم حفظ التقدم";}catch(e){}}
  function reset(){state=defaults();save();return state;}
  function get(){return state;}
  function patch(obj){state={...state,...obj};save();return state;}
  return {load,save,reset,get,patch};
})();