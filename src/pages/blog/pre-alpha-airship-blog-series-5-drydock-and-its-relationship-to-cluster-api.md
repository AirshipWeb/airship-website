---
templateKey: blog-post
title: Pre-Alpha Airship Blog Series 5 - Drydock and Its Relationship to Cluster API
author: Alan Meadows and Rodolfo Pacheco
date: 2019-10-22T09:00:00.000Z
category: 
  - label: Airship 2.0
    id: category-C98iZYrE1
---

## **UPDATED DESIGN THINKING NOTICE**

This blog has been marked as a "pre-alpha" post and may contain inaccurate information. This post has been archived to
preserve the technologies, design, and thinking of the time. Please see [*this announcement*](
https://www.airshipit.org/blog/pre-alpha-blog-announcement.html) for more information on the road to Airship 2.0 alpha
and how the lessons learned influenced the technologies and design of Airship 2.0 "post-alpha".

<hr>

As part of the evolution of Airship 1.0, an enduring goal has remained supporting multiple provisioning backends beyond just bare metal. This includes those that can provision to third-party clouds and to other use cases like OpenStack VMs as well as enable you to bring your own infrastructure.<!-- more -->

The component we used to accomplish this was *Drydock*. *Drydock* was intended to be a pluggable, declarative bare metal orchestrator. It has allowed us to declare the desired state for bare metal provisioning and served as an orchestrator, which enacted bare metal configuration with different backends. The initial backend developed was for Canonical's *Metal-as-a-Service*, or *MaaS*.

Today, *Drydock* supports *MaaS* only. Our intention was to add a second plugin to *Drydock* to support *Ironic* for bare metal provisioning, which would allow additional operating system targets to be supported as well as potentially simplifying bare metal provisioning. While re-evaluating the landscape before directly integrating *Ironic* into *Drydock*, it became clear that the Cluster API was quickly emerging as a community-driven solution to accomplishing a lot of the same things by representing machines, machine sets, and clusters as native objects within Kubernetes, and having the provisioning of those driven by operators within Kubernetes itself. Similarly, there has been a lot of effort in creating a number of providers for the Cluster API that support various use cases for provisioning targets - from bare metal, to OpenStack VMs, to AWS and Azure, to using SSH to drive installation on hosts an organization has already provisioned using an outside mechanism.

To better take advantage of the emerging Cluster API work, as well as all the provider work that is ongoing to support a larger number of use cases, we believe the best path forward to enabling all of the use cases above within Airship is to leverage with the Cluster API and the appropriate provider. The first provider we will integrate and demonstrate with Airship will be one that enables us to provision bare metal infrastructure from the ground up. We have identified a new community project, [*metal3-io*](https://github.com/metal3-io/metal3-docs), where we will focus our efforts and collaborate to bring that project to fruition, and then integrate *metal3-io* and its CRDs into Airship for the bare metal use case. One major component in *metal3-io* is the *cluster-api-baremetal-provider*, which is a Machine Actuator implementation for *cluster-api*. To avoid reinventing the wheel, *metal3-io* considers using [*Ironic under the hood*](https://github.com/metal3-io/metal3-docs/blob/master/design/use-ironic.md) (as a foundation for declarative management of bare metal infrastructure for Kubernetes. Please note that this is considered the implementation detail and may change in the future.

While this will be our first target, our goal is to fast follow this by demonstrating Airship 2.0 functioning on at least one other Cluster API provider.

Below is a design picture highlighting the various components of the *metal3-io* project and how they would fit into the Airship 2.0 architecture:

![](/img/airship-2-metal3-io-flow.png)
 
To be sure, the *metal3-io* project embracing the Cluster API really affects three fundamental aspects of what Airship does today. First, it will change the way we request and provision operating systems on hosts. Today, those are expressed and declared as *BareMetalHost* documents within *Drydock*, and *Drydock* orchestrates provisioning of those machines. The process of evaluating the progress of bare metal provisioning in Airship 1.0 requires interaction with *Drydock* APIs in order to determine host success or failure. In Airship 2.0, because hosts are declared directly with Kubernetes CRDs, each *BareMetalHost* object will receive its own status and error messages reconciled by the *metal3-io* *baremetal-operator*, and can be inspected with generic tools like *kubectl*.

Second, it affects how we bootstrap a net-new Kubernetes cluster. Airship 1.0 depended on a genesis process that would spawn a single-node Kubernetes cluster running the Airship components on the first host, which the end user was responsible for provisioning. Airship 2.0 will leverage the Cluster API bootstrap flow, which uses an ephemeral host within the cluster to start the provisioning process of the target cluster. Airship 2.0 will also introduce a mechanism to remotely bootstrap that ephemeral host. The Cluster API integration also impacts how we join newly provisioned hosts to the Kubernetes cluster. This has a direct relationship with one of our other goals of more tightly integrating kubeadm as a way to bootstrap Kubernetes.

Finally, by leveraging Kubernetes CRs to express bare metal host intentions, it will lower the barrier to entry for new users to create declarations for new environments. Bare metal inspection is now a native feature and easily retrievable using standard Kubernetes interactions.

With this new architecture, we are effectively introducing a more cloud-native way of managing the infrastructure underneath the Kubernetes cluster that helps achieve several of our goals. By integrating community projects like the Cluster API and *metal3-io*, we are able to replace expressing the desired infrastructure from Airship-specific schemas with native Kubernetes CRs that are reconciled by operators. This increases visibility into the provisioning process and eliminates the need of Airship-specific APIs to interact with your infrastructure. 

In the next blog post, we will dive into the evolution of Armada and how we are evolving that project to integrate with the cloud-native workflow engine, [*Argo*](https://github.com/argoproj/argo), and consume native Kubernetes CRs within Airship 2.0.
