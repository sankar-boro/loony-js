const puppeteer = require('puppeteer');
const url = 'https://www.etmoney.com/stocks/list-of-stocks';

(async () => {
  // Launch a headless browser
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  // Go to the website
  await page.goto(url, { waitUntil: 'networkidle2' });

  const pages = await page.evaluate(() => {
    const table_body_elements = document.querySelectorAll('tbody');
    return Array.from(table_body_elements).map(table_body_element => {
        const table_row_elements = table_body_element.querySelectorAll('tr');
        return Array.from(table_row_elements).map(table_row_element => {
            const table_data_elements = table_row_element.querySelectorAll('td');
            return Array.from(table_data_elements).map(table_data_element => table_data_element.textContent);   
        })
    });
  });


    // Simulate click on 'Show More' button to load more content
    const showMoreButtonSelector = '.show-more-button'; // Update with actual selector
    try {
    await page.waitForSelector(showMoreButtonSelector);
    await page.click(showMoreButtonSelector);

    // Wait for new content to load
    await page.waitForTimeout(5000); // Adjust this based on how long the page needs to load more data
    
    } catch (err) {
        console.error('Error clicking Show More button or selector not found:', err);
    }

  // Close the browser
  await browser.close();

  console.log(pages)
})()


