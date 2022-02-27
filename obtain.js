// I do not take any responsibillity from any actions thats commited using this tool.
// I've decided to build this because I was bored...
// You can only use this tool against specfic values if you have consent.
const { Command } = require("commander");
const program = new Command();
const { nmap, puppeteer, fs, readline } = require("./Modules/Modules.js");

function banner() {
  console.log(`


  _______ __     __          __        
  |       |  |--.|  |_.---.-.|__|.-----.
  |   -   |  _  ||   _|  _  ||  ||     |
  |_______|_____||____|___._||__||__|__|
                                        
      Type --help to display options




    `);
}
banner();

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

program
  .option("-h, --host <host>", "Host Name/IP")
  .option("-sh, --screenshot", "screenshot website")
  .option("-nm, --nmap", "find out infomation from ports")
  .action((host, options, command) => {
    if (!options.host) {
      // Host/url/ip
      const HOST = host;
      console.log(host);
      rl.question("nmap or screenshot ?: ", function (nmap, screenshot) {
        if (!options.screenshot) {
          (async () => {
            const browser = await puppeteer.launch();
            const page = await browser.newPage();
            await page.goto(`${host}`);
            await page.screenshot({ path: "example.png" });

            await browser.close();
          })();
        }
        rl.close();
      });
    }
  });

program.parse(process.argv);
