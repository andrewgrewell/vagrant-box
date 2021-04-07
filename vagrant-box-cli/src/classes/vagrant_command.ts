import { spawn } from 'child_process';
import { Command } from '@oclif/command'
import { consumerRootPath, rootPath } from '../constants';


export default abstract class VagrantCommand extends Command {

    public runVagrantCommand(cmd: string, flags: any[]) {
        spawn('vagrant', [cmd, ...(flags || [])], {
            cwd: consumerRootPath,
            stdio: 'inherit',
            env: {
                ...process.env,
                VAGRANT_CWD: rootPath
            }
        });
    }
}