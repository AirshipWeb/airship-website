---
templateKey: blog-post
title: 'Setting up a developer environment with Cluster API'
author: Alexander Hughes
date: 2020-04-09T12:00:00.000Z
category: 
  - label: Airship 2.0
    id: category-C98iZYrE1
---

Airship is a collection of loosely coupled, but interoperable open source tools that declaratively automates cloud
provisioning. Airship is designed to make your cloud deployments simple, repeatable, and resilient.

The primary motivation for Airship 2.0 is the continued evolution of the control plane, and by aligning with maturing
CNCF projects we can improve Airship by making 2.0:
- More capable
- More secure
- More resilient
- Easier to operate

One such project is [Cluster API](https://cluster-api.sigs.k8s.io/), a Kubernetes project that brings declarative,
Kubernetes-style APIs to cluster creation, configuration, and management. It provides optional, additive functionality
on top of core Kubernetes to manage the lifecycle of a Kubernetes cluster.

Today I will provide you the documentation, and my tested step by step directions on setting up a developer environment
to begin working with Cluster API. These steps have all been tested in a virtual machine with the following
configuration:
- **Hypervisor**: VirtualBox 6.1
- **Operating System**: Ubuntu 18.04 Desktop
- **Memory**: 8gb
- **Processor**: 6cpus
- **Networking**: NAT
- **Proxy**: N/A

To begin, create a new virtual machine with the above configuration.

Next, we will be working with the [Cluster API Quickstart](https://cluster-api.sigs.k8s.io/user/quick-start.html) and
leveraging [Kind](https://kind.sigs.k8s.io/) and using the [Docker Provider](
https://cluster-api.sigs.k8s.io/clusterctl/developers.html#additional-steps-in-order-to-use-the-docker-provider). What
follows is a consolidated set of instructions from these resources.

1. Update package manager and install common packages


    sudo apt-get update && sudo apt-get dist-upgrade -y
    sudo apt-get install -y gcc python git make


2. Install golang ([Documentation](https://golang.org/doc/install))


    wget https://dl.google.com/go/go1.14.1.linux-amd64.tar.gz
    sudo tar -C /usr/local -xzf go1.14.1.linux-amd64.tar.gz
    rm go1.14.1.linux-amd64.tar.gz


3. Install docker ([Documentation](https://docs.docker.com/install/linux/docker-ce/ubuntu/))


    sudo apt-get remove docker docker-engine docker.io containerd runc
    sudo apt-get update
    sudo apt-get install -y \
        apt-transport-https \
        ca-certificates \
        curl \
        gnupg-agent \
        software-properties-common
    curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo apt-key add -
    sudo apt-key fingerprint 0EBFCD88
    sudo add-apt-repository \
       "deb [arch=amd64] https://download.docker.com/linux/ubuntu \
       $(lsb_release -cs) \
       stable"
    sudo apt-get update
    sudo apt-get install -y docker-ce docker-ce-cli containerd.io
    sudo groupadd docker
    sudo usermod -aG docker $USER


4. Update /etc/profile with needed environment variables


    sudo bash -c 'cat <<EOF >> /etc/profile
    export PATH=\$PATH:/usr/local/go/bin
    export DOCKER_POD_CIDRS=172.17.0.0/16
    export DOCKER_SERVICE_CIDRS=10.0.0.0/24
    export DOCKER_SERVICE_DOMAIN=cluster.local
    EOF'


5. Logout and log back in, or reboot your machine, for the user group and profile changes to take effect


    sudo reboot now


6. Install kustomize ([Documentation](https://github.com/kubernetes-sigs/kustomize/blob/master/docs/INSTALL.md))


    git clone https://github.com/kubernetes-sigs/kustomize.git
    cd kustomize/kustomize
    go install .
    sudo mv ~/go/bin/kustomize /usr/local/bin/
    cd ~


7. Install kind ([Documentation](https://github.com/kubernetes-sigs/kind/blob/master/README.md#installation-and-usage))


    curl -Lo ./kind https://github.com/kubernetes-sigs/kind/releases/download/v0.7.0/kind-$(uname)-amd64
    chmod +x ./kind
    sudo mv ./kind /usr/local/bin/kind


8. Install kubectl ([Documentation](https://kubernetes.io/docs/tasks/tools/install-kubectl/#install-kubectl-on-linux))


    curl -LO https://storage.googleapis.com/kubernetes-release/release/`curl -s https://storage.googleapis.com/kubernetes-release/release/stable.txt`/bin/linux/amd64/kubectl
    chmod +x ./kubectl
    sudo mv ./kubectl /usr/local/bin/kubectl


9. Install clusterctl ([Documentation](https://kubernetes.io/docs/tasks/tools/install-kubectl/#install-kubectl-on-linux))


    curl -L https://github.com/kubernetes-sigs/cluster-api/releases/download/v0.3.2/clusterctl-linux-amd64 -o clusterctl
    chmod +x ./clusterctl
    sudo mv ./clusterctl /usr/local/bin/clusterctl
   

10. Set up cluster api using docker provider ([Documentation](https://cluster-api.sigs.k8s.io/user/quick-start.html))


    git clone https://github.com/kubernetes-sigs/cluster-api.git
    cd cluster-api
    
    cat > clusterctl-settings.json <<EOF
    {
      "providers": ["cluster-api","bootstrap-kubeadm","control-plane-kubeadm", "infrastructure-docker"],
      "provider_repos": []
    }
    EOF
    
    make -C test/infrastructure/docker docker-build REGISTRY=gcr.io/k8s-staging-capi-docker
    make -C test/infrastructure/docker generate-manifests REGISTRY=gcr.io/k8s-staging-capi-docker
    ./cmd/clusterctl/hack/local-overrides.py
    
    cat > ~/.cluster-api/clusterctl.yaml <<EOF
    providers:
      - name: docker
        url: $HOME/.cluster-api/overrides/infrastructure-docker/latest/infrastructure-components.yaml
        type: InfrastructureProvider
    EOF
    
    cat > kind-cluster-with-extramounts.yaml <<EOF
    kind: Cluster
    apiVersion: kind.sigs.k8s.io/v1alpha3
    nodes:
      - role: control-plane
        extraMounts:
          - hostPath: /var/run/docker.sock
            containerPath: /var/run/docker.sock
    EOF
    
    cp cmd/clusterctl/test/testdata/docker/v0.3.0/cluster-template.yaml ~/.cluster-api/overrides/infrastructure-docker/v0.3.0/
    
    kind create cluster --config ./kind-cluster-with-extramounts.yaml --name clusterapi
    kind load docker-image gcr.io/k8s-staging-capi-docker/capd-manager-amd64:dev --name clusterapi
    clusterctl init --core cluster-api:v0.3.0 --bootstrap kubeadm:v0.3.0 --control-plane kubeadm:v0.3.0 --infrastructure docker:v0.3.0
    clusterctl config cluster work-cluster --kubernetes-version 1.17.0 > work-cluster.yaml
    kubectl apply -f work-cluster.yaml
    kubectl --namespace=default get secret/work-cluster-kubeconfig -o jsonpath={.data.value} | base64 --decode > ./work-cluster.kubeconfig
    kubectl --kubeconfig=./work-cluster.kubeconfig apply -f https://docs.projectcalico.org/v3.12/manifests/calico.yaml


11. Interact with your cluster


    kubectl --kubeconfig=./work-cluster.kubeconfig get nodes


That's all there is to it! If you made it this far you should have a working CAPD environment to develop in.

I'd like to thank the Cluster API community, and elmiko in particular for helping me troubleshoot my own setup so that I
could share these steps with you. The CAPI community is available on [Slack](http://slack.k8s.io/) in the
[#cluster-api](https://kubernetes.slack.com/archives/C8TSNPY4T) channel.
