import { flags } from '@oclif/command';
import VagrantCommand from '../vagrant_command';

export default class Destroy extends VagrantCommand {
    static description = 'Destroy the vagrant box'

    static examples = [
        `$ vagrant-box up -> vagrant up`,
    ]

    static flags = {
        help: flags.help({ char: 'h' }),
        force: flags.boolean({ char: 'f' }),
    }

    async run() {
        const { flags } = this.parse(Destroy);
        this.runVagrantCommand('destroy', flags.force ? ['-f'] : []);
    }

}
