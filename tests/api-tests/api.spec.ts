import {test, expect} from '@playwright/test';

function formatDate(date: Date): string {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}/${month}/${day}`;
}

test('1.API returns valid response - GET:200 for valid date', async({request})=>{
    const oneYearOldDate = new Date();
    oneYearOldDate.setFullYear(oneYearOldDate.getFullYear() - 1);

    const fetchMessage= await request.get(`/calculate?birthdate=${formatDate(oneYearOldDate)}`);

    // Parse json
    const responseBody = await fetchMessage.json();
    
    // Assertion
    expect(fetchMessage.status()).toBe(200);
    expect(responseBody.message).toBe('You are 1 years old. Happy Birthday!');
})

test('2.API returns valid error response - GET:404 for invalid endpoint', async({request})=>{
    const fetchMessage= await request.get(`/calcula`);

    // Assertion
    expect(fetchMessage.status()).toBe(404);
    const responseBody = await fetchMessage.text();
    expect(responseBody).toContain('Cannot GET /calcula');
});