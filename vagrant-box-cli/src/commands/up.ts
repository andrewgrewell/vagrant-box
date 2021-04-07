import { flags } from '@oclif/command';
import VagrantCommand from '../classes/vagrant_command';

export default class Up extends VagrantCommand {
    static description = 'Bring up the vagrant box'

    static examples = [
        `$ vagrant-box up -> vagrant up`,
    ]

    static flags = {
        help: flags.help({ char: 'h' }),
        provision: flags.boolean({ char: 'p' }),
    }

    async run() {
        const { flags } = this.parse(Up);
        this.runVagrantCommand('up', flags.provision ? ['--provision'] : []);
    }

}
