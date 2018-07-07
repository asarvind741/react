/* export function setAutherization(user){
  user =JSON.stringify(user);
  localStorage.setItem('currentUser', user);
  return;
} */

export function logoutUser(){
  localStorage.removeItem('currentUser');
}