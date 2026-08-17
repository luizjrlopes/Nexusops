const BASE=process.env.NEXT_PUBLIC_API_URL??'http://localhost:3001';
export function token(){return typeof window==='undefined'?'':localStorage.getItem('nexusops_token')??''}
export async function api<T>(path:string,init:RequestInit={}):Promise<T>{const r=await fetch(`${BASE}${path}`,{...init,headers:{'content-type':'application/json',authorization:token()?`Bearer ${token()}`:'',...(init.headers??{})},cache:'no-store'}); if(!r.ok) throw new Error(await r.text()||`HTTP ${r.status}`); return r.json() as Promise<T>}
export async function demoLogin(userId:string){return api<{token:string;session:unknown}>('/auth/demo-login',{method:'POST',body:JSON.stringify({userId})})}
