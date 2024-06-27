import makeAddBlogCommand from './addBlog.js'

import { Command } from 'commander';
const program = new Command();

program.addCommand(makeAddBlogCommand());
await program.parseAsync(process.argv);