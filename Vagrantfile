# encoding: utf-8
# -*- mode: ruby -*-
# vi: set ft=ruby :

require 'yaml'

def deep_merge(a, b)
    if !b
        return a
    end
    merger = proc { |key, v1, v2| Hash === v1 && Hash === v2 ? v1.merge(v2, &merger) : Array === v1 && Array === v2 ? v1 | v2 : [:undefined, nil, :nil].include?(v2) ? v1 : v2 }
    a.merge(b.to_h, &merger)
end

values = YAML.load_file(File.join(File.dirname(__FILE__), 'values.yml'))

# Load values from consumer project
consumer_path = Dir.pwd
consumer_default_values = YAML.load_file(File.join(consumer_path, 'values.yml'))
consumer_values_override = nil
begin
    consumer_values_override = YAML.load_file(File.join(consumer_path, 'values.override.yml'))
rescue
    # Error is fine
end

# Merge consumer values into base values
if consumer_default_values
    values = deep_merge(values, consumer_default_values)
end
if consumer_values_override
    values = deep_merge(values, consumer_values_override)
end

vm_values = values["vm"]
workspace_values = values["workspace"]

Vagrant.configure('2') do |config|
    # Shared Config
    config.ssh.insert_key = false
    config.vm.provider 'virtualbox' do |v|
        v.gui = vm_values["gui"]
        v.memory = vm_values["memory"]
        v.cpus = vm_values["cpus"]
    end

    ## Workspace
    workspace_name = "workspace"
    workspace_ip = workspace_values["ip"]
    storage_name = "local-storage"
    storage_mountpoint = "disks/#{storage_name}"
    config.vm.define workspace_name do |workspace|
        # loop over a mapping of folders we wish to sync into the box
        workspace_values["synced_folders"].each do |folder_config|
          srcPath = File.absolute_path(folder_config["src"])
          workspace.vm.synced_folder srcPath, folder_config["dest"]
        end
        workspace.vm.box = vm_values["image"]
        workspace.vm.network 'private_network', ip: workspace_ip
        workspace.vm.hostname = workspace_name

        # Create disk for workspace storage
        storage_values = workspace_values["storage"]
        if storage_values["enabled"]
          workspace.persistent_storage.enabled = true
          workspace.persistent_storage.location = "./.storage/workspace-storage.vdi"
          workspace.persistent_storage.size = storage_values["disk_size"]
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

        # Run a single shell provisioner
        if workspace_values["shell"]
          workspace.vm.provision "shell", inline: workspace_values["shell"]
        end

        # Loop over ansible provisioners that have been configured by the consuming project
        workspace_values["playbooks"].each do |provisioner_config|
          workspace.vm.provision provisioner_config["name"], type: 'ansible', run: provisioner_config["run"] || 'always'  do |ansible|
              ansible.compatibility_mode = "2.0"
              ansible.playbook = File.join(consumer_path, provisioner_config["playbook"])
              extra_vars = {
                  ansible_python_interpreter: '/usr/bin/python3',
                  node_name: workspace_name,
                  storage_mountpoint: storage_mountpoint
              }.merge(values)
              if (provisioner_config["extra_vars"])
                extra_vars = extra_vars.merge(provisioner_config["extra_vars"])
              end
              ansible.extra_vars = extra_vars
          end
        end
    end
end
