// I do not take any responsibillity from any actions thats commited using this tool.
// I've decided to build this because I was bored...
// You can only use this tool against specfic values if you have consent.
const { Command } = require("commander");
const { QuickScan } = require("node-nmap");
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

const options = program.opts();

program
  .requiredOption("-h --host <host>", "Host Name/IP")
  .option("-sh --screenshot", "screenshot website")
  .option("-nm --nmap", "find out infomation from ports");

program.parse(process.argv);

const optionsHost = () => {
  if (options.host && options.nmap) {
    console.log(`Scanning... ${options.host}`);
    runNmap();
  } else if (options.host && options.screenshot) {
    screenShot();
  } else if (options.screenshot) {
    screenshot();
  } else {
    console.log(`!! An error occured !!`);
  }
};

const quickscan = new nmap.QuickScan(options.host);
const runNmap = async () => {
  await quickscan.on("complete", function (data) {
    console.log(data[0]);
  });
};

const screenShot = () => {
  rl.question(`Enter targets url: `, function () {
    (async () => {
      const browser = await puppeteer.launch();
      const page = await browser.newPage();
      await page.goto("google.com");
      await page.screenshot({ path: "example.png" });

      await browser.close();
    })();
  });
};

optionsHost();
