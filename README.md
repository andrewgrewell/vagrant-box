# Vagrant Box

A portable environment that can be added to any project

## Host Requirements
___

### Software
You will need to have the software listed below present on your system

> ℹ️ Run `boostrap-hosts.sh` to install required software on the host
- Vagrant ( creating VM )
- VirtualBox ( Virtualizer )
- Ansible ( Provision using YAML )

## Usage
1. Install
```sh
yarn add --dev vagrant-box
```

2. Configure the `values.yml` file to add your project source and any Ansible playbooks you want to run.
- The `values.yml` file is how values are loaded into the environment. Any local values or secrets
should be stored in `values.override.yml`
- You can have local provisioning files setup by storing them in `/local_provision` 
they will not be source controlled so that you can run provisioning specific to your setup
```yaml
# myproject/values.yml

workspace:
  synced_folders:
    - name: my-project
      src: path/to/my/project
      dest: path/on/the/vm/myproject
  playbooks:
    - name: add dependencies
      playbook: provision/setup-env.yml
      run: always
``` 

3. Add any secrets or local values to `values.override.yml`
```yaml
# myproject/values.override.yml

workspace:
    aws:
      enabled: true
      default:
        access_key_id: XXXXX
        secret_access_key: XXXXXX
        region: us-west-2
        output: json
      profiles: 
        - name: dev
          role_arn: XXXXX
        - name: staging
          role_arn: XXXXX
        
```

4. Run Vagrant
```shell script
yarn run vb-up
```

5. Connect to the VM
```shell script
yarn run vb-ssh
vagrant@workspace > ls path/to/my/project
```

See `package.json` for shortcut scripts


## Why?
Encapsulating your development environment for a projects has many benefits
-   **Portability** - you don't need to worry about the "works on my machine" situation
-   **Version control** - You can see the changes with the environment reflected in VC
-   **Self documenting** - because the various steps that are required to get the environment working are in code, 
    new users can see at a glance what is involved.
-   **Easier to maintain** - Again because the step is in code you can more easily change it.
-   **Time travel** - You can easily start from a fresh environment or load snapshots of the environment in various states
-   **Avoid dependency conflicts** - Avoid weirdness for dependencies that you might not be aware of
    

