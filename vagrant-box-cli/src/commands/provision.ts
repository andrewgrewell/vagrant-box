import { flags } from '@oclif/command';
import VagrantCommand from '../vagrant_command';

export default class Provision extends VagrantCommand {
    static description = 'Provision the vagrant box'

    static examples = [
        `$ vagrant-box provision [--with {name}] -> vagrant provision [--provision-with {provisioner_name}]`,
    ]

    static flags = {
        help: flags.help({ char: 'h' }),
        with: flags.string({ char: 'w' }),
    }

    async run() {
        const { flags } = this.parse(Provision);
        this.runVagrantCommand('provision', flags.with ? [`--provision-with ${flags.with}`] : []);
    }

}
