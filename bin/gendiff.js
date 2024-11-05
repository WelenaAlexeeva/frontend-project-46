#!/usr/bin/env node

import { program } from 'commander';

program
  .name('gendiff')
  .description('Compares two configuration files and shows a difference.')
  .version('1.0.0')
  .option('-h, --help', 'output usage information')
  .action(() => {
    console.log('Usage: gendiff [options]');
    console.log(program.description());
    console.log('Options:');
    console.log('  -V, --version <type>  output the version number');
    console.log('  -h, --help            output usage information');
  });

  program.parse(process.argv);

