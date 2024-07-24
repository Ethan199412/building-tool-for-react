const chalk = require('chalk');

class CustomProgressBarPlugin {
    constructor(options = {}) {
        this.options = options;
        this.barWidth = this.options.barWidth || 20;
    }

    apply(compiler) {
        let startTime = null;
        let lastPercentage = 0;

        compiler.hooks.compilation.tap('CustomProgressBarPlugin', (compilation) => {
            compilation.hooks.buildModule.tap('CustomProgressBarPlugin', () => {
                if (startTime === null) {
                    startTime = Date.now();
                }
            });

            compilation.hooks.succeedModule.tap('CustomProgressBarPlugin', () => {
                const percentage = compilation.modules.length / this.options.totalModules;
                // console.log('[p1.1] percentage', percentage, { moduleLength: compilation.modules.length, options: this.options })
                if (percentage > lastPercentage) {
                    lastPercentage = percentage;
                    this.updateProgressBar(percentage, startTime);
                }
            });
        });

        compiler.hooks.done.tap('CustomProgressBarPlugin', (stats) => {
            this.updateProgressBar(1, startTime);
            console.log('\n');
        });
    }

    updateProgressBar(percentage, startTime) {
        // console.log('[p1.0] percentage', percentage)
        const elapsedTime = ((Date.now() - startTime) / 1000).toFixed(2);
        const filledWidth = Math.round(this.barWidth * percentage);
        const emptyWidth = this.barWidth - filledWidth;
        const bar = chalk.green('='.repeat(filledWidth)) + chalk.gray('-'.repeat(emptyWidth));
        process.stdout.clearLine();
        process.stdout.cursorTo(0);
        process.stdout.write(`${chalk.blue('Building')} ${bar} ${chalk.green(`${(percentage * 100).toFixed(2)}%`)} ${chalk.green(`(${elapsedTime} seconds)`)}`);
    }
}


module.exports = CustomProgressBarPlugin;

