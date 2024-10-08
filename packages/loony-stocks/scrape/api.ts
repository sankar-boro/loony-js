const url = "https://www.etmoney.com/stocks/list-of-stocks";

// Fetch the HTML content from the URL
const response = await fetch(url);

// Check if the response is OK (status code 200)
if (response.ok) {
    // Get the HTML content as text
    const html = await response.text();
    console.log(html);
} else {
    console.error(`Failed to fetch: ${response.status}`);
}
