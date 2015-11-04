var commander = require("commander");
commander
  .command('setup [env]')				// 设置命令，可接受1个参数
  .alias('st')							// 设置命令别名
  .description('run setup commands for all envs')				// 该命令的描述
  .option("-s, --setup_mode [mode]", "Which setup mode to use")	// 该命令可接受的参数
  .action(function(env, options){
	var mode = options.setup_mode || "normal";
	env = env || 'all';
	console.log('setup for %s env(s) with %s mode', env, mode);
  });
// setup xxx -s all
// 打印: setup for xxx env(s) width all mode

commander.on("--help", function(){
    console.log('  Examples:');
    console.log();
    console.log('    $ deploy exec sequential');
    console.log('    $ deploy exec async');
    console.log();
});

commander.parse(process.argv);