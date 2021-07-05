---
templateKey: blog-post
title: Airship 2.0 - Under the hood - Lifecycle
author: Rodolfo Pacheco, Alan Meadows, Kostiantyn Kalynovskyi
date: 2021-05-05T12:00:00.000Z
category: 
  - label: Airship 2.0
    id: category-C98iZYrE1
---
As stated on older blog posts, the goal of Airship 2.0 is to provide a declarative interface to assemble and orchestrate best-of-breed Cloud-Native building blocks for provisioning, and lifecycling of infrastructure, Kubernetes clouds and the resulting software stack.<!-- more -->

![Under the hood](/img/under_the_hood_blog/1.png)

We’ve spoken about our integration with other CNCF projects, and will go into some deeper details in this post.

> In Airship 2.0 we’ve introduced a CLI tool “airshipctl” to lifecycle infrastructure. We view infrastructure lifecycle as something that occurs in a series of what we call stages, and within a stage individual phases. Stages and phases can then become part of a well-curated plan. These three building blocks help define the intended lifecycle actions, and we will define each of these terms further on in this blog article. We’ve taken this approach and terminology straight from the widely adopted kubeadm project which itself implements a series of commands, such as kubeadm init or kubeadm join but also allows you to execute a specific well-defined atomic steps or phases within that command that they also call phases, such as kubeadm init phase preflight, just as an example.

Let's now dive into the terms above before we walk through a step-by-step walkthrough of the Airship 2.0 process.

## What is a Stage

A stage is a collection of phases articulating a common purpose in the lifecycle. They simply act as a logical grouping of phases that accomplish some definable goal. While there is no airshipctlcommand that relates to stages, it is useful to group phases into stages for the purposes of discussion. They are effectively logical notions, such as “I need a fully functional bootstrap environment to initialize my target cluster”, “let's make sure the Target Cluster is fully constructed”, “do I have everything I need to drive this lifecycle with airship.” In the Airship 2.0 step-by-step walkthrough below, we define each of the stages that make-up the lifecycle process.

The image below expresses the relationship between Stage, Phases, and Plans.

![](/img/under_the_hood_blog/2.png)

## What is a Phase

We define a phase as a Kustomize entry-point and its relationship to a known Airship executor that takes the rendered document set and performs some sort of action on it. The most common example of such an executor is the built-in KubernetesApply executor, which simply takes the rendered document set and applies it to a Kubernetes end-point and optionally waits for the workloads to be in a specific state. This experience is similar to the behaviour of the following commands:

```
kubectl apply -f resources.yaml
kubectl wait pod --for=condition=Available
```

The KubernetesApply executor is just one of several available. Executors can also help pipe document sets to generic containers, building iso images, and even interacting with baremetal hosts.  The airship community provides a set of pre-defined phases in Treasuremap that allow you to deploy a Kubernetes cluster and manage its workloads. But it does not limit you to the community phase set; airshipctl lets you craft your own phases as well.

The goal of phases is to break up the delivery of artifacts into independent document sets. This grants several advantages for a phase oriented approach:

* Phases are independently renderable (e.g. their own kustomize entrypoint). This facilitates developers trying to construct these phases initially as they can focus just on what that particular phase produces, with no relationship
to the wider document set. In other words, phases can be independently rendered, applied, and waited on. This greatly benefits debugging and the development process.

* Phases can be rolled up into a larger workflow to provide a single button like experience, by encapsulating them in plans which are discussed more further on.

* Phases are effectively very light weight constructs that are easy to understand and incredibly simple and straight-forward for new users. This is especially true for those with simplistic deployment and lifecycle needs.

## How to Use Phases

The _airshipctl_ CLI utility provides a series of commands to assist with interacting with defined phases.


```
Usage:
  airshipctl phase [command]

Available Commands:
list          List phases
render        Render phase documents from model
run           Run phase
tree          Tree view of kustomize entrypoints of phase
validate      Assert that a phase is valid

Flags:
  -h, --help help for phase

Global Flags:
  --airshipconf string Path to file for airshipctl configuration. (default "$HOME/.airship/config")
  --debug enable verbose output
```

You can interact with phases using the `airshipctl phase` commands:

* **list** phases defined in a plan

* **render** using kustomize and print documents (YAMLs) associated with a phase (this command has other diagnostic use cases as well)

* **tree** view of the directory structure of the phase, based on the kustomize established relationship between the documents.

* **run** the phase, airshipctl will find a phases executor (more on this below), pass documents from the ''render'' command to it, and run the executor.

* **validate** the phase, verifies that the definition of the phase, and executor associated with it is correct.

```
yaml
---
apiVersion: airshipit.org/v1alpha1
kind: Phase
metadata:
  name: nginx-deployment
  clusterName: production01
config:
  executorRef:
    apiVersion: airshipit.org/v1alpha1
    kind: KubernetesApply
    name: kubernetes-apply-timeout-100s
  documentEntryPoint: production01/nginx
---
```


## Defining a Phase?

In order to interact with phases, you need them to be defined in your Airship document set. We described a phase previously as a combination of a Kubernetes entrypoint and an associated executor. All Airship configuration is in the form of proper Kubernetes artifacts. In other words, they’re expected to have a group, version, and kind definition. We define a phase in the airship manifest as a document of a kind: Phase within the airship.org/v1alpha1 apiVersion. Below is an example of a phase that applies documents to the Kubernetes cluster and waits for them to become ready:

```
yaml
---
apiVersion: airshipit.org/v1alpha1
kind: Phase
metadata:
  name: nginx-deployment
  clusterName: production01
config:
  executorRef:
    apiVersion: airshipit.org/v1alpha1
    kind: KubernetesApply
    name: kubernetes-apply-timeout-100s
  documentEntryPoint: production01/nginx
---
```

In this document you can see four essential keys:

* **name:** defines a phase name

* **clusterName:** the name of the Kubernetes cluster where you want to apply the documents. Yes, you can manage deployments to multiple clusters.

* **executorRef:** a reference to a separate document that will define an executor with this name

* **documentEntryPoint:** kustomize root, which defines your document set; for example, it can be an Nginx deployment and service. In this example, documents would be rendered from the directory production01/nginx

Assuming that the executor referenced above is defined, you can now run this phase definition once it is placed into your document set:

```
airshipctl phase run nginx-deployment
```


This is what will happen during the command:

1. airshipctl finds the executor within the document set that matches the criteria within **executorRef**, _e.g. kind: KubernetesApply_

2. airshipctl then invokes the **KubernetesApply** executor and passes Kustomize rendered documents from the **documentEntryPoint:** production01/nginx into the executor.

3. **KubernetesApply** performs steps similar to:

  * `kubectl apply -k production01/nginx # uses kustomize to render the documents`

  * `kubectl wait deployment --for=condition=available <name of the deployment>`

The following sequence diagram articulates what is happening under the hood when a user launches the airshipctl phase run command:

![](/img/under_the_hood_blog/3.png)

## Additional Phase Examples

```
yaml
---
apiVersion: airshipit.org/v1alpha1
kind: Phase
metadata:
  name: initinfra-networking-ephemeral
  clusterName: ephemeral-cluster
config:
  executorRef:
    apiVersion: airshipit.org/v1alpha1
    kind: KubernetesApply
    name: kubernetes-apply-nowait
  documentEntryPoint: ephemeral/initinfra-networking
---
apiVersion: airshipit.org/v1alpha1
kind: Phase
metadata:
  name: clusterctl-init-ephemeral
  clusterName: ephemeral-cluster
config:
  executorRef:
    apiVersion: airshipit.org/v1alpha1
    kind: Clusterctl
    name: clusterctl_init
---
# This phase triggers the deployment of an ephemeral cluster
# on Azure Cloud platform
apiVersion: airshipit.org/v1alpha1
kind: Phase
metadata:
  name: ephemeral-az-genesis
config:
  executorRef:
    apiVersion: airshipit.org/v1alpha1
    kind: BootConfiguration
    name: ephemeral-az-genesis
---
apiVersion: airshipit.org/v1alpha1
kind: Phase
metadata:
  name: secret-generate
config:
  executorRef:
    apiVersion: airshipit.org/v1alpha1
    kind: GenericContainer
    name: encrypter
  documentEntryPoint: target/generator
```

## What is an Executor

A usable executor is a combination of an executor YAML definition and an executor implementation that adheres to the interface below. A phase uses an executor by referencing the definition. The executor purpose is to perform a specific domain of actions with the rendered document set. I.e. a KubernetesApply executor interacts with the Kubernetes api, a ClusterCtl executor interacts with the clusterctl libraries, etc.

This interface definition is defined below :

```go
// Executor interface should be implemented by each runner
type Executor interface {
        Run(chan events.Event, RunOptions)
        Render(io.Writer, RenderOptions) error
        Validate() error
        Status() (ExecutorStatus, error)
}
```

Every executor implementation needs to satisfy the methods defined in these
interfaces. The methods are defined as follows:

_**Run**_: This is the main activity of an executor, collect the documents and do
something with them. The do-something aspect can be delivering them to
kubernetes, manipulating the documents, and even using third-party libraries to
interact with infrastructure defined in the documents in an entirely new way.
The Run method allows an executor to implement subcommands such as dry-run and
progress:

```
go
// RunOptions holds options for run method
type RunOptions struct {
        DryRun bool
        Progress bool
        Timeout time.Duration
}
```

_**Render**_: This method provides a way of verifying that the document set is
complete, and can be fully rendered by Kustomize. The rendering method also provides a filtering mechanism to scope the documents delivered to the executor. For instance, a FilterSelector could ensure only Kind: BareMetalHost documents
are leveraged by a specific executor.

```
go
// RenderOptions holds options for render method
type RenderOptions struct {
        FilterSelector document.Selector
}
```


_**Validate**_: The purpose of the validate method is to ensure that the executor will work. For instance, is the YAML properly defined, or in the case of the
KubernetesApply executor can we actually interact with the Kubernetes endpoint.

_**Status**_: The status method helps funnel the actual status of the executor
to the phase. The run of a phase can take some time to be completed. As mentioned before we have the ability to specify wait conditions which will block the phase from completing until the condition is satisfied.  We also have the option to not wait, and utilize the phase status command to determine the status of a phase periodically. However, the phase status command that would utilize this executor method will be part of Airship v2.1.

## Defining an Executor

Executors are defined much like plans within your Airship document set by creating a specific YAML document that describes the executor and relates it to one of the executor interfaces supported within airshipctl. Once defined, they can then be referenced by phases.

```
go
---
apiVersion: airshipit.org/v1alpha1
kind: KubernetesApply
metadata:
  labels:
    airshipit.org/deploy-k8s: "false"
  name: kubernetes-apply
config:
  waitOptions:
    timeout: 2000
  pruneOptions:
    prune: false
---
```

In this document you can see three essential keys:

* **kind:** defines a type of executor.
* **name:** defines the executor name

Currently each executor is a specific kind and has their own configuration
section .

* **config:** define configuration options for the KubernetesApply executor,
specifically the ability to define waitOptions, and pruneOptions.

Below are some additional examples of executor definitions:

```
yaml
---
# This is added to support phase with no-wait
# When there is a wait, then it does status-check and fails
# if the resource status(condition) is not met.
# There are cases where the resource do not have status
# field implemented. So a wait will fail with status check
apiVersion: airshipit.org/v1alpha1
kind: KubernetesApply
metadata:
  labels:
    airshipit.org/deploy-k8s: "false"
  name: kubernetes-apply-nowait
config:
  waitOptions:
    timeout: 0
  pruneOptions:
    prune: false
---
apiVersion: airshipit.org/v1alpha1
kind: Clusterctl
metadata:
  name: clusterctl_move
move-options: {}
action: move
---
apiVersion: airshipit.org/v1alpha1
kind: IsoConfiguration
metadata:
  name: isogen
  labels:
    airshipit.org/deploy-k8s: "false"
builder:
  outputFileName: ephemeral.iso
container:
  containerRuntime: docker
  image: quay.io/airshipit/image-builder:latest-ubuntu_focal
  volume: /srv/images:/config
---
apiVersion: airshipit.org/v1alpha1
kind: GenericContainer
metadata:
  name: encrypter
labels:
  airshipit.org/deploy-k8s: "false"
spec:
  type: krm
  sinkOutputDir: "target/generator/results/generated"
  image: gcr.io/kpt-fn-contrib/sops:v0.1.0
  envVars:
  - SOPS_IMPORT_PGP
  - SOPS_PGP_FP
  config: |
    apiVersion: v1
    kind: ConfigMap
    data:
      cmd: encrypt
      unencrypted-regex: '^(kind|apiVersion|group|metadata)$'
---
```

## Built-in Executors

An executor definition needs to associate the definition with an actual executor
implementation within airshipctl. This is an implementation that effectively
adheres to the executor interface previously described. There are several
built-in the Airship 2.0 release:

_*[KubernetesApply](#1)*_ deliver artifacts to a kubernetes cluster. It's essentially a kubernetes client, satisfying the executor interface and leveraging existing kubernetes client libraries. It's important feature is that it can wait for resources to become ready, rather than simply throwing them into k8s api.

_*[GenericContainer](#2)*_ provides a flexible executor implemented on top of the docker. It allows you to bring your container and run it as a phase. Your container will have access to the phase document bundle and a site kubeconfig. For example, you may want airshipctl to send a slack message saying, "Airship deployed a cluster for you!" and send its kubeconfig to secure storage; with GenericContainer, You can do that.

_*[Clusterctl](#3)*_ provides an integration with the cluster api clusterctl library. Which provides the core integration point of airshipctl with cluster api.

<a name="1"></a>https://github.com/airshipit/airshipctl/blob/master/pkg/phase/executors/k8s_applier.go
<a name="2"></a>https://github.com/airshipit/airshipctl/blob/master/pkg/phase/executors/container.go
<a name="3"></a>https://github.com/airshipit/airshipctl/blob/master/pkg/phase/executors/clusterctl.go


There are also several other executors that help with other activities, such as
driving redfish, baremetal node image creation, and so on.

## What is a Plan

A plan helps achieve a complete end to end lifecycle with a single command. Airship Phase Plan is declared in your YAML library and there can be multiple plans. For instance, you can have a plan defined for initial deployment, a plan for updates, and even for highly specific purposes.  Plans can be thought of as a collection of phases that should be executed in sequential order.  They provide the mechanism to easily orchestrate a number of phases with a single command.

Plans can also share phases, which makes them another fairly light-weight construct and allows YAML engineers to craft any number of specific plans without duplicating plan definitions.

## Defining a Plan

Below is an example of an Airship PhasePlan document. The phases section describes an ordered list of phase names that have been declared in their own documents and this plan if executed will run each of the phases defined.

```yaml
---
apiVersion: airshipit.org/v1alpha1
kind: PhasePlan
metadata:
  name: phasePlan
description: "Default phase plan"
phases:
  - name: initinfra-ephemeral
  - name: clusterctl-init-ephemeral
  - name: controlplane-ephemeral
  - name: clusterctl-init-target
  - name: clusterctl-move
  - name: initinfra-target
  - name: controlplane-target
  - name: workers-target
  - name: workload-target
```

Once plans are defined, you can then interact with them using the `airshipctl plan command. For instance:

```
airshipctl plan

This command provides capabilities for interacting with plan objects,
responsible for execution phases in groups

Usage:
  airshipctl plan [command]
Available Commands:
  list        List plans
  run         Run plan

Flags:
  -h, --help help for plan

Global Flags:
      --airshipconf string Path to file for airshipctl configuration. (default "$HOME/.airship/config")
      --debug enable verbose output

Use "airshipctl plan [command] --help" for more information about a command.

```

For Airship v2, airshipctl plan provides to subcommands :
  * _**List:**_ Will list the details for the phases defined in the plan.
  * _**Run:**_ Will run the phases defined by the plan.

For future releases, other subcommands in par with the phase command will be available. Such as validate, render, status, etc.

## The Airship Lifecycle


Airship intends to be opinionated about deployments only to the point of enabling the goals we’ve discussed so far--and in fact--seeks to step out of the way as much as possible to let the end-user declarations drive configurations. This is the only way Airship 2.0 can keep up with a constantly evolving CNCF landscape. We have achieved this by leveraging a command line utility [airshipctl](https://github.com/airshipit/airshipctl) that drives the deployment and lifecycle management of Kubernetes clouds.  As explained we articulate lifecycle management as a plan, which allows us to drive the lifecycle as a single button approach. But we have made it simple by making that single button a composite of multiple phases, each driveable on its own explicitly.


The image below expresses the lifecycle in terms of Stages and Phases.

![](/img/under_the_hood_blog/4.png)

Airship 2.0 step-by-step walkthrough:

## Initialization Stage

The initialize stage is really all about preparing the local environment to run Airship and work with your sites document set. Effectively, it represents the actions required to initiate or attempt to drive lifecycles with Airship. This includes getting the airship binaries, initializing your airship configuration, and cloning your sites document sets at their appropriate revisions from various repositories.

```
git clone https://opendev.org/airship/airshipctl.git
```

The first step that has to occur in the process is retrieving the Airship 2.0 command line utility airshipctl:

* This can either be built from source:

```
cd airshipctl && make build
```

or

* Pulled as a binary from the published releases within the airshipctl github repository.

Once you have the binary you can then run `airshipctl config init` which will generate a default airshipctl configuration file that is pre-configured to function with the upstream treasuremap project.

```
airshipctl config init
```

You can of course edit this configuration file to adjust it for your own environment or at this point just run `airshipctl document pull` which will clone the treasuremap repositories that the out of the box configuration file points to at their specified revisions and tags. The default upstream documents will of course define a physical environment that likely does not match your own at all, but it is useful as a starting place.

```
airshipctl document pull
```

Finally we need to collect the documents, as per the configuration in the airshipctl config manifest associated with the current-context.  Executing the document pull command will clone the defined repositories into the local file system at the TargetPath defined in the Manifest.

## Preparation Stage

During this stage we perform activities that prepare artifacts necessary to deploy and lifecycle the site. We can ensure that each of our phases does not include any rendering errors by validating them. If we are leveraging plans, we can ensure the entire plan and all of its phases are validated. Finally we generate artifacts such as ephemeral node ISO files and node qcow2 disk images all from declarative intentions for use in subsequent phases that will consume them during deployments. We may also prepare, encrypt, or generate unique secrets for this site.

```
airshipctl phase|plan validate <phase|plan name>
```

These commands are in progress and will be available in the Airship v2.1 release. They will provide semantic validation of CRD and CR’s etc.

This phase has two purposes:

* Phases depend on several yaml. Specifically the phase , executor, and cluster map documents. Validate verifies they are all properly defined and running a phase will work.

* The 2nd aspect is to validate the documents that are part of a phase, specifically CR and CRD. We achieve these via an integration with the kubeval project. Airshipctl will consume and prepare the manifests associated with the phase entrypoint and will deliver the appropriate manifest bundle to kubeval. There will also be an airshipctl plan validate command available to apply the equivalent validation to the complete list of phases with one command.

```
airshipctl phase|plan render <phase|plan name>
```

These commands render document sets, identify structure failures, replacement
failures, etc.  Render command utilizes kustomize building capabilities and invokes custom transformation toprovide replacement capabilities. The plan render command will validate that all phases render properly.

```
airshipctl phase run secrets-generate
```

This phase will generate a collection of secret artifacts given a defined catalogue of secrets .  Similar to the pegleg functionality in airship 1. This capability is provided via airshipctl integration with GPG and SOPS and is built on top of kustomize. These secret artifacts will be defined in a catalogue, that will be used by other phases to ingest secrets.

```
airshipctl phase run generate-iso
```

This phase integrates airshipctl with the airship image builder. It would allow
us to generate a targeted iso, prepare with the yaml that describes an ephemeral
host for a particular cloud site.  Running this phase will produce an iso image.
It will be the responsibility of the airship operator to deliver that image to a
registry or image repository that can be accessed via http(s) from the baremetal
host intended to be used as an ephemeral host. It is also the responsibility of
the airship operator to update the airship configuration for this particular
site to use the now accessible iso.

```
airshipctl phase run generate-qcow
```

This phase also integrates airshipctl with the airship image builder. It would
allow us to generate a targeted qcow for baremetal or virtual machines. These
qcow will be driven with the yaml to provide the intended configuration and
contents for the host os. Running this phase will produce a qcow image. It will
be the responsibility of the airship operator to deliver that image to a
registry or image repository that can be accessed via http(s) from the baremetal
operator driver( i.e. ironic) that deploys the baremetal hosts. The operator is
also responsible for updating the manifest to reflect the location of the image.
In Airship 2.0, there is a catalog of image locations that simplifies the
management of image versions, by normalizing it into a single document. This
document is utilized by the HostGenerator, and Replacement Transformer plugin ,
which generates the appropriate BareMetalHost document from the versions and
hosts catalogues.  Document management plugins are described in detail in the
_Airship 2.0 - Under the hood - Manifests blog_.

## Physical Validation Stage

The purpose of physical validation is to follow our model of failing fast where
we can. This stage represents validating the target infrastructure in the site
to ensure it can properly receive a deployment and run workloads. This may
include a number of validation, such as:

* Local Hardware Verification

* Machine, CPU, Manufacturer, RAM, Product Name, Bonding, NIC port assignments
and location

* North-South Network Connectivity● IP endpoint and TCP/UDP port flow validation
checks

* MTU Validation

* Validation Over Jumbo Frames expectations, i.e. MTU 9000

* Check Raid Devices

* Validates the intended RAID configuration was implemented

This stage is currently out of scope for Airship v2.0, and is a target for future releases. We expect this functionality will involve features currently in progress within several projects such as Metal3-IO, Ironic, and so on.

```
airshipctl baremetal validate
```

This command while not yet implemented is intended to follow our model of failing fast where we can. In other words, there are a number of physical host properties that can benefit from being validated up front such as physical NIC placement, RAM and CPU Core Quantity and so on. There are also certain settings that are beneficial to check up front prior to target OS deployment, such as NIC MTU throughput capabilities, bonding configurations, and North-South network connectivity to critical endpoints. These can all be assessed prior to initiating time intensive deployments into the environment and will be a pluggable solution.

## Ephemeral Lifecycle Stage

The purpose of this stage is only to create a physical foothold in a new environment. The ephemeral phase creates a single-node in-memory Kubernetes cluster on one of the hosts with a special label in the document set indicating that host is to be used as the ephemeral node.  The purpose of this in-memory ephemeral cluster is to provide a Kubernetes API endpoint to load declaratively defined software, such as the Cluster API, into this node and use it to provision at least one node in the target cluster. We then pivot or move the state of the target cluster from the ephemeral node into the target cluster, and the ephemeral node can be destroyed or more likely absorbed into the target cluster as it is expanded in later phases. Once a target cluster exists, there is no need to leverage the ephemeral stage anymore.

```
airshipctl phase run remotedirect-ephemeral
```

This phase leverages the ISO image generated, as part of the preparation stage, for this particular cloud site. As part of the preparation stage, the operator updated the airship configuration with the location from where the ISO image was retrievable from via http(s). This phase will leverage airshipctl’s ability to programmatically interact with the baremetal host that has the appropriate label indicating it should be used as the ephemeral host. It will do this over any supported BMC protocol such as Redfish or SMASH, however at this time only the redfish protocol is supported. The phase forces the host labeled ephemeral to boot from the remote ISO url and ensures it results in a remotely accessible Kubernetes endpoint. At the end of this phase, we now have a functioning and network accessible Kubernetes single-node cluster running in-memory on the ephemeral baremetal node.

```
airshipctl phase run initinfra-ephemeral
```

This phase instantiates or delivers the low-level Kubernetes pre-requisites for an Airship environment. Workloads such as a functioning CNI, the Metal3-IO workloads, the Helm Operator so later phases can drive the cluster-api, deliver helm charts, and so on. This is only preparing the ephemeral node which only needs to deliver a single target cluster in the environment so this may be smaller in scope than initinfra-target later on.

```
airshipctl phase run clusterctl-init-ephemeral
```

This phase will deliver the Cluster API components to the ephemeral node. It does this by directly integrating with the Cluster API library and delivering the same workloads as clusterctl init would deliver from the Cluster API project. Normally, the specific version of components and the providers are targeted on the command line in the Cluster API CLI, so airshipctl provides a YAML document that can be declared with these values within this phase to drive specific versions, providers, and so on.

```
airshipctl phase run controlplane-ephemeral
```

This phase is effectively the culmination of the ephemeral lifecycle stage and will deliver a single control plane node within the target cluster. This node is provisioned is effectively a cluster of one, but it is provisioned the same way all other nodes will be provisioned in the environment and we are ready to move on to the target cluster stage and interact with it.

## Target Cluster Lifecycle Stage

During this stage we execute phases that complete the fully realized target cluster. This means we initialize it very much the same way we did the ephemeral cluster, and also move state from the ephemeral cluster into this new target cluster. Finally, we expand the control plane to the target replica count and provision any non-controlplane servers, such as workers.

This stage not only builds out the target cluster but will be repeatedly revisited when lifecycling the environment over time.

```
airshipctl phase run initinfra-target
```

Very similar to the initinfra phase in the ephemeral lifecycle stage, this deploys low level prerequisites needed to start interacting with the target cluster and deploying workloads on it.  This would include things like CNI workloads, CSI configuration and workloads if self-hosted (e.g. rook), the Helm-Operator, and anything else required to drive the Cluster API and Helm workloads.

```
airshipctl phase run clusterctl-init-target
```

Again, similar to the ephemeral stage, this phase will deliver the Cluster API components to the target cluster It does this by directly integrating with the Cluster API library and delivering the same workloads as clusterctl init would deliver from the Cluster API project. Normally, the specific version of components and the providers are targeted on the command line in the Cluster API CLI, so airshipctl provides a YAML document that can be declared with these values within this phase to drive specific versions, providers, and so on.

```
airshipctl phase run clusterctl-move
```

With the Cluster API workloads and CRDs now instantiated as part of the phase above, we can now move the generated elements of target cluster creation from the ephemeral node to the target cluster node so it is self-aware. This phase is also where we really do cease needing the ephemeral node any longer. After the move phase completes, the ephemeral node can be destroyed and will be in subsequent phases.

```
airshipctl phase run controlplane-target
```

This phase will expand the control plane in the target cluster from a single node to the target count, which is normally 3 nodes. This is effectively updating the KubeadmControlPlane replica count from 1 to 3. This would also deliver any BareMetalHost inventory and labels necessary to deliver those 3 nodes as well. At the end of this phase, you will have a highly available 3 node Kubernetes control plane with stacked-etcd and failover.

```
airshipctl phase run workers-target
```

Very similar to the previous phase, the workers phase simply delivers the MachineDeployment and BareMetalHost inventory required to satisfy that. Physical racks may be broken up into individual machine deployments to allow easy physical rack targeting. At the end of this phase, all worker nodes will be deployed and join the cluster at which point the environment can receive any target workloads in the subsequent stage.

## Target Workload Lifecycle Stage

This stage consists mainly of a single logical phase which will deliver all the workloads that provide services for the cluster.

```
airshipctl phase run workload-target
```

This phase effectively delivers all Kubernetes workloads to the target cluster. The target cluster is already fully realized with support for CNI, CSI (e.g. ability to provision PVCs), and can support the delivered workloads.

Examples of workloads could be:

* Openstack-Helm artifacts. These will be necessary if the target cluster intends to provide virtual machines

* Logging, Monitoring and Alerting (LMA) Stack. The artifacts that provide the telemetry, log collection and alerting configurable interfaces to manage the target cluster, as well as provide information to the workloads that will run on these clusters.

* Other services layered on top of the basic target cluster building blocks above, i.e., if we needed to deliver a platform offered S3 service, we could deliver it here.

* Extension to the basic CNI would go here, i.e Multus

<p></p>

## What's Next

We hope this review of the Airship 2.0 lifecycle approach has been helpful. In our next blog post, we will dive deeper into the Airship manifests, our integration with Kustomize, and our approach to extending it with plugins to support feature parity with the deckhand project in Airship 1.0. The next blog post will also cover a basic walkthrough of interacting with Airship 2.0 YAML documents leveraging airshipctl.
