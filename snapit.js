const puppeteer = require('puppeteer');
const fs = require('fs');

class Snapit {
    constructor() {
    }


    /**
     * @param {string} url - The url of the website to screenshot
     * @param {number} seconds - The number of seconds to wait before taking the screenshot
     */
    snapAfter(url, seconds = 6000) {
        return new Promise((resolve, reject) => {
            const waitFor = async (ms) => {
                return new Promise(resolve => {
                    setTimeout(resolve, ms);
                });
            }
            let path = null;
            
            (async () => {
                try {
                    const browser = await puppeteer.launch();
                const page = await browser.newPage();
    
                page.setDefaultNavigationTimeout(0);
                await page.goto(url);
    
    
                await this.confirmDir();
    
                path = 'uploads/' + this.generateUniqueName() + '.png';
    
                await waitFor(seconds);
                await page.screenshot({path: path,fullPage: true});
                
                await browser.close();
                resolve(path);
                } catch (error) {
                reject(error)
                }
            })();
        })
    }

    generateUniqueName() {
        const date = new Date();
        const uniqueName = date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate() + '-' + date.getHours() + '-' + date.getMinutes() + '-' + date.getSeconds();
        return uniqueName;
    }

    // this code class method snippet checks if the uploads directory exists, if not, it creates it.
    confirmDir() {
        const dir = './uploads';
        if (!fs.existsSync(dir)){
            fs.mkdirSync(dir);
        }
    }

    // delete file
    deleteFile(path) {
        return new Promise((resolve, reject) => {
            fs.unlink(path, (err) => {
                if (err) {
                    reject(err);
                }
                resolve('File deleted successfully');
            });
        })
    }


    /**
     * @param {string} url - The url of the website to generate pdf
     * @param {number} seconds - The number of seconds to wait before generating the pdf
     */
    genPDFAfter(url, seconds = 6000) {
        return new Promise((resolve, reject) => {
            const waitFor = async (ms) => {
                return new Promise(resolve => {
                    setTimeout(resolve, ms);
                });
            }
            let path = null;
            
            (async () => {
               try {
                const browser = await puppeteer.launch();
                const page = await browser.newPage();
    
                page.setDefaultNavigationTimeout(0);
                await page.goto(url);
    
                await waitFor(seconds);
    
                await this.confirmDir();
    
                path = 'uploads/' + this.generateUniqueName() + '.pdf';

                // this code snippet generate string name from current date and time
    
                await page.pdf({
                    path: path,
                    format: 'letter',
                  });
                await browser.close();
                resolve(path);
               } catch (error) {
                reject(error)
               }
            })();
        })

    }
}

module.exports = {
    Snapit
}