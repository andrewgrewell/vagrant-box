# Release Environment

A portable environment for deploying from your local machine

## Host Requirements
___

### Software
You will need to have the software listed below present on your system

> ℹ️ Run `boostrap-hosts.sh` to install required software on the host
- Vagrant ( creating VM )
- VirtualBox ( Virtualizer )
- Ansible ( Provision using YAML )

### Environment
Environment variable defaults are provided in `values.yml` and overwrote by `values.override.yml`.
You will want to provide your env specific values in `values.override` as that file is not source controlled.

## Quick Start
Add the path to the streem monorepo to your `values.override` under `streem_monorepo_path`
```shell
scripts/bootstrap-host.sh
vagrant up
vagrant ssh workspace
[run commands as you would on your local machine]
```
