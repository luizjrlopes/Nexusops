import { test,expect } from '@playwright/test';
test('operador não recebe menu de auditoria nem usuários',async({page})=>{await page.goto('http://localhost:3000/login');await page.getByRole('button',{name:/Carla Souza/}).click();await expect(page.getByRole('link',{name:'Auditoria'})).not.toBeVisible();await expect(page.getByRole('link',{name:'Usuários'})).not.toBeVisible()});
