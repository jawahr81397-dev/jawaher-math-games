(function(){
const endpoint='https://ylsnogtohohmzlxpihks.supabase.co/functions/v1/jm-mastery-submit';
let klass='';
function init(){
const box=document.createElement('div');
box.style.cssText='position:fixed;bottom:10px;right:10px;z-index:9999;background:#102e41;color:white;padding:12px;border-radius:12px;font:14px Tahoma;direction:rtl';
box.innerHTML='<label>🏫 الفصل <select id="jm-class"><option value="">اختاري الفصل</option><option>خامس أ</option><option>خامس ب</option><option>سادس أ</option></select></label><div id="jm-status" style="font-size:11px;margin-top:6px"></div>';
document.body.appendChild(box);
document.getElementById('jm-class').onchange=e=>klass=e.target.value;
}
async function submit(name,skill,score,max_score,className){
const status=document.getElementById('jm-status');
if(!name||!klass&&!className){status.textContent='اختاري الفصل واكتبي اسمك الكامل';return false}
status.textContent='جاري حفظ النتيجة...';
try{
const res=await fetch(endpoint,{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({student_name:name,class_name:className||klass,page:location.pathname.split('/').pop(),skill,score,max_score})});
const data=await res.json();status.textContent=res.ok?'✅ وصلت النتيجة للمعلمة':'⚠️ '+(data.error||'تعذر الحفظ');return res.ok
}catch(e){status.textContent='⚠️ تعذر الاتصال. احتفظي بالشهادة';return false}
}
window.JMBridge={submit};
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init);else init();
})();