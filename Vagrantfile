# encoding: utf-8
# -*- mode: ruby -*-
# vi: set ft=ruby :

require 'yaml'
require 'util/deep_merge'

default_values = YAML.load_file(File.join(File.dirname(__FILE__), 'values.yml'))
values_override = YAML.load_file(File.join(File.dirname(__FILE__), 'values.override.yml'))
values = deep_merge(default_values, values_override)

Vagrant.configure('2') do |config|
    # Shared Config
    config.ssh.insert_key = false
    config.vm.provider 'virtualbox' do |v|
        v.memory = values.vm.memory
        v.cpus = values.vm.cpus

    end

    ## Workspace
    workspace_name = "workspace"
    workspace_ip = values.workspace.ip
    storage_name = "local-storage"
    storage_mountpoint = "disks/#{storage_name}"
    config.vm.define workspace_name do |workspace|
        # loop over a mapping of folders we wish to sync into the box
        values.workspace.synced_folders do |_, folder_config|
          workspace.vm.synced_folder folder_config.src, folder_config.src.dest
        end
        workspace.vm.box = values.vm.image
        workspace.vm.network 'private_network', ip: workspace_ip
        workspace.vm.hostname = workspace_name

        # Create disk for workspace storage
        if values.workspace.storage.enabled
          workspace.persistent_storage.enabled = true
          workspace.persistent_storage.location = "./.storage/workspace-storage.vdi"
          workspace.persistent_storage.size = values.workspace.storage.disk_size
          workspace.persistent_storage.mountname = storage_name
          workspace.persistent_storage.filesystem = 'ext4'
          workspace.persistent_storage.mountpoint = storage_mountpoint
          workspace.persistent_storage.volgroupname = 'workspace-storage'
          workspace.persistent_storage.partition = false
        end

        # Run basic provisioning
        workspace.vm.provision "workspace", type: 'ansible' do |ansible|
            ansible.compatibility_mode = "2.0"
            ansible.playbook = 'provision/workspace.yml'
            ansible.extra_vars = {
                ansible_python_interpreter: '/usr/bin/python3',
                node_name: workspace_name,
                storage_mountpoint: storage_mountpoint
            }.merge(values)
        end

        # Loop over provisioners that have been configured by the consuming project
        values.workspace.playbooks do |key, provisioner_config|
          workspace.vm.provision "#{key}", type: 'ansible' do |ansible|
              ansible.compatibility_mode = "2.0"
              ansible.playbook = provisioner_config.playbook
              extra_vars = {
                  ansible_python_interpreter: '/usr/bin/python3',
                  node_name: workspace_name,
                  storage_mountpoint: storage_mountpoint
              }.merge(values)
              if (provisioner_config.extra_vars)
                extra_vars.merge(provisioner_config.extra_vars)
              end
              ansible.extra_vars = extra_vars
          end
        end
    end
end
