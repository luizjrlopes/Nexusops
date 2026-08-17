import type { Session } from './types';
const K='nexusops_session';
export function getSession():Session|null{if(typeof window==='undefined')return null;try{return JSON.parse(localStorage.getItem(K)??'null')}catch{return null}}
export function setSession(token:string,session:Session){localStorage.setItem('nexusops_token',token);localStorage.setItem(K,JSON.stringify(session))}
export function clearSession(){localStorage.removeItem('nexusops_token');localStorage.removeItem(K)}
