#!/usr/bin/env node

import getAddCommand from './add-blog.js'

import { Command } from 'commander';
const program = new Command();

program.addCommand(getAddCommand());
await program.parseAsync(process.argv);