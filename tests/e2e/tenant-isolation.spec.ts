import { test,expect } from '@playwright/test';
test('tenant A não exibe clientes do tenant B',async({page})=>{await page.goto('http://localhost:3000/login');await page.getByRole('button',{name:/Ana Martins/}).click();await page.getByRole('link',{name:'Clientes'}).click();await expect(page.getByText('Orbe Design')).toBeVisible();await expect(page.getByText('Helix Comércio')).not.toBeVisible()});
