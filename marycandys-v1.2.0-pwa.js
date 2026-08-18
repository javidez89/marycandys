let deferredInstallPrompt=null;
const installButton=document.getElementById('installApp');
const installHelp=document.getElementById('installHelp');
const isStandalone=()=>window.matchMedia('(display-mode: standalone)').matches||window.navigator.standalone===true;
const isAndroid=/Android/i.test(navigator.userAgent);
const isWindows=/Windows/i.test(navigator.userAgent);
function markInstalled(){if(!installButton)return;installButton.classList.add('show','installed');installButton.disabled=true;installButton.textContent='✅ App instalada';if(installHelp)installHelp.classList.remove('show')}
function showFallbackHelp(){if(!installHelp)return;installHelp.classList.add('show');if(isAndroid){installHelp.innerHTML='<strong>Instalar en Android:</strong> abre el menú ⋮ de Chrome y toca <strong>Instalar app</strong> o <strong>Agregar a pantalla principal</strong>.'}else if(isWindows){installHelp.innerHTML='<strong>Instalar en Windows:</strong> en Chrome o Edge usa el icono de instalación de la barra de direcciones o el menú del navegador y elige <strong>Instalar MaryCandy\'s</strong>.'}else{installHelp.innerHTML='<strong>Instalar MaryCandy\'s:</strong> usa la opción de instalación disponible en el menú de tu navegador.'}}
if('serviceWorker' in navigator){window.addEventListener('load',()=>navigator.serviceWorker.register('./sw.js').catch(()=>{}))}
window.addEventListener('beforeinstallprompt',event=>{event.preventDefault();deferredInstallPrompt=event;if(installButton&&!isStandalone()){installButton.classList.add('show');installButton.disabled=false;installButton.textContent='📲 Instalar app'}});
window.addEventListener('appinstalled',()=>{deferredInstallPrompt=null;markInstalled()});
if(installButton){installButton.addEventListener('click',async()=>{if(isStandalone()){markInstalled();return}if(deferredInstallPrompt){deferredInstallPrompt.prompt();await deferredInstallPrompt.userChoice;deferredInstallPrompt=null;installButton.classList.remove('show');return}showFallbackHelp()})}
if(isStandalone())markInstalled();
else if(installButton){installButton.classList.add('show');installButton.textContent='📲 Instalar app'}
