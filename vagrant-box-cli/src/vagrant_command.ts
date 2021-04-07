import * as path from 'path';
import { Command } from '@oclif/command'
import { spawn } from 'child_process';


export default abstract class VagrantCommand extends Command {

    public runVagrantCommand(cmd: string, flags: any[]) {
        spawn('vagrant', [cmd, ...(flags || [])], {
            cwd: path.resolve(__dirname, '../../'),
            stdio: 'inherit'
        });
    }
}