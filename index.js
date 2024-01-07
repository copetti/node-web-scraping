import puppeteer from 'puppeteer';

(async () => {

    const browser = await puppeteer.launch({
        headless : false,
        defaultViewport: false,
        userDataDir: "./tmp"
    });

    const page = await browser.newPage();

    await page.goto('https://www.amazon.com.br/gp/bestsellers/books');

    const productHandles = await page.$$(
        '.a-cardui'
    );

    let i = 0;

    let items = [];

    for(const productHandle of productHandles){

        let title = "Null";
        let price = "Null";
        let image = "Null";

        try {
            title = await page.evaluate(
                el => el.querySelector('a > span > div').textContent,
                productHandle
            );
        }catch (error){}

        try {
            price = await page.evaluate(
                el => el.querySelector('.a-color-price > span').textContent,
                productHandle
            );
        }catch (error){}

        try {
            image = await page.evaluate(
                el => el.querySelector('.a-dynamic-image').src,
                productHandle
            );
        }catch (error){}

        if(title !== "Null"){
            items.push({title, price, image});
        }
    }

    await browser.close();

    console.log(items);
})();