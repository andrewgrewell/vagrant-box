#! /bin/bash

if [ "$(uname -s)" = "Darwin" ]; then
    function readlink() {
        greadlink "$@"
    }
fi

logStep() {
    echo "-------------------------------------------------------------------"
    echo ""
    tput setaf 9
    echo "$1"
    tput setaf 7
    echo ""
    echo "-------------------------------------------------------------------"
}

which -s brew
if [[ $? != 0 ]] ; then
    logStep "Installing Homebrew..."
    /bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install.sh)"
    CASKS=(
        homebrew/cask
        homebrew/cask-versions
    )
    for i in "${CASKS[@]}"; do
        brew tap "$i"
    done
fi

logStep "Installing Dependencies"

CASKS=(
    virtualbox
    vagrant
    vagrant-manager
)

for cask in "${CASKS[@]}"
do
  brew install --cask "$cask"
done



FORMULAS=(
    ansible
)

for formula in "${FORMULAS[@]}"
do
  brew install "$formula"
done

logStep "Installing Vagrant plugins"
vagrant plugin install vagrant-persistent-storage

logStep "Bootstrap Complete"
