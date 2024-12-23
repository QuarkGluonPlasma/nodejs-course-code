import puppeteer from 'puppeteer';
import sqlite3 from 'sqlite3'
import { open } from 'sqlite'

const browser = await puppeteer.launch({
    headless: false,
    defaultViewport: {
        width: 0,
        height: 0
    }
});

const page = await browser.newPage();

await page.goto('https://www.zhipin.com/web/geek/job?query=前端&city=100010000');

await page.waitForSelector('.job-list-box');

const totalPage = await page.$eval('.options-pages a:nth-last-child(2)', e => {
    return parseInt(e.textContent)
});

const allJobs = [];
for(let i = 1; i <= totalPage; i ++) {
    await page.goto('https://www.zhipin.com/web/geek/job?query=前端&city=100010000&page=' + i);

    await page.waitForSelector('.job-list-box');

    const jobs = await page.$eval('.job-list-box', el => {
        return [...el.querySelectorAll('.job-card-wrapper')].map(item => {
            return {
                job: {
                    name: item.querySelector('.job-name').textContent,
                    area: item.querySelector('.job-area').textContent,
                    salary: item.querySelector('.salary').textContent
                },
                link: item.querySelector('a').href,
                company: {
                    name: item.querySelector('.company-name').textContent,
                    logo: item.querySelector('.company-logo img').src
                }
            }
        })
    });
    allJobs.push(...jobs);
}

// console.log(allJobs);

const db = await open({
    filename: 'data.db',
    driver: sqlite3.Database
});

const insert = await db.prepare('INSERT INTO job (name, area, salary,link,company,desc) VALUES (?, ?, ?,?,?,?)');

for(let i = 0; i< allJobs.length; i ++) {
    await page.goto(allJobs[i].link);

    try{
        await page.waitForSelector('.job-sec-text');

        const jd= await page.$eval('.job-sec-text', el => {
            return el.textContent
        });
        allJobs[i].desc = jd;

        console.log(allJobs[i]);
        insert.run(
            allJobs[i].job.name,
            allJobs[i].job.area,
            allJobs[i].job.salary,
            allJobs[i].link,
            allJobs[i].company.name,
            allJobs[i].desc
        );

    } catch(e) {}
}
