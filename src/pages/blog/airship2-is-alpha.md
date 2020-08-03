---
templateKey: blog-post
title: Airship 2.0 is Alpha - Lessons Learned
author: Alan Meadows and Rodolfo Pacheco
date: 2020-08-03T12:00:00.000Z
category: 
  - label: News & Announcements
    id: category-A7fnZYrE1
---

In our last Airship v2.0 evolution post, we promised we would _dive into the evolution of how we will do cluster
deployment in a Kubernetes-native way_. Before we go into that explanation, we want to spend some time discussing the
current state of the project. Airship 2.0 has now reached our Alpha Milestone. Completing the Alpha Milestone is a
realization of our core goal of delivering the initial phases of the life cycle management utilizing airshipctl and
successfully integrating with other projects such as Kustomize, Cluster API, Metal3-IO, Clusterctl, and others. Our
integration needs and expectations on these projects led us to several successful collaborations outside the Airship
community to reach this milestone.

Arriving at these milestones wasn’t without fallings, going down different paths we’ve learned, tried, failed,
regrouped, redesigned, reimplemented, and when appropriate changed course. _These lessons and course changes support_
Airship 2.0’s simplification goal as it relies on integrating with projects that are themselves evolving at this time.
One of the core expectations of the Airship community is to take advantage of and integrate functionality when
available. It means we remain vigilant in keeping abreast of the cloud-native landscape, looking to incorporate new
projects when appropriate and changing course to align ourselves with projects we’ve already integrated with while still
delivering something functional.

Given some of these course corrections and adjustments, we thought it is worth briefly touching upon the impacted points
and approaches we made in some of the previous blog posts. We believe it’s worth specifically revisiting:
* [_**Shipyard - an Evolution of the Front Door**_](https://www.airshipit.org/blog/airship-blog-series-4-shipyard-an-evolution-of-the-front-door/)
  * In this blog post, we mentioned that the _airshipctl_ utility operates on a Kubernetes cluster security context.
    The _**airshipctl**_ utility is the main entry point for bootstrapping a cluster, collecting and pushing documents,
    and managing workflows. A lesson we learned in Airship 1.0 was that expressing a site as the _complete_ series of
    document declarations for that site was challenging to manage and mentally digest. In Airship 2.0, we represent
    lifecycle management as a series of phases that simplify how a Kubernetes cluster is built and subsequently managed.
    Phases help people deal with a much smaller document set that is granularly scoped to a particular objective. We
    will dive deeper into phases, the value they provide, implementation and how they simplify lifecycle management in a
    future post.

<br>

* [_**Armada - growing pains**_](https://www.airshipit.org/blog/airship-blog-series-6-armada-growing-pains/)
  * In this blog post, we discussed the expected evolution for Armada, the path led us to the need to embrace Kubernetes
    CRDs, integrate with Helm v3, and take advantage of a CNCF workflow engine like Argo. We also touched on rewriting 
    Armada in Golang. As part of this intended evolution, we spoke to several members of the Helm community. We got
    their blessing to propose an official in-tree or next-to-tree helm-operator, for which we would provide a small
    proof of concept skeleton. In this case, remaining vigilant paid off, and while doing our due diligence of
    identifying comparable projects, we found a candidate project upstream. The flux community spearheads this vibrant
    community project, it's called the helm-operator, and it achieves most of our needs outlined in this post.
  * Specifically, the flux helm-operator has the following capabilities:
    * It operates on HelmRelease CRs to lifecycle software
    * It's a Kubernetes operator pattern
    * Visibility via natural Kubernetes mechanism such as describing HelmRelease objects
    * The project is a CNCF sandbox project
  * It does, however, leave some gaps in functionality from what Armada provided:
    * There is no multi-chart dependency control
    * The wait mechanisms could be improved
    * You cannot provide per-helm-release proxy details to facilitate a mix of internal and upstream charts in
      environments requiring proxies.
    * These gaps within the realm of Airship can be closed utilizing the phase mechanism, and as per our community
      expectation, we are now active participants in these communities. We will try to achieve some of our goals in
      these gaps over time.

<br>

With the Airship Alpha release, we can deploy a cluster of 44 bare-metal hosts solely by driving the lifecycle utilizing
airshipctl. The Alpha release pulls together several achievements within airshipctl such as:
* The ability to build a site-specific ephemeral ISO to bootstrap the process
* Using the ephemeral node to bootstrap a single node in the target cluster
* Integrating airshipctl with clusterctl to initialize Cluster API components within site and pivoting from the
  ephemeral node to the target cluster within the site 
* Taking advantage of phases to deliver the rest of the control plane (scaling from 1 target control plane node to 3)
* Leveraging phases to deliver worker nodes in the environment either all at once or on a rack-by-rack basis
* Taking Advantage of Cluster API to deploy advanced Kubernetes configurations, such as dual-stack IPv4/IPv6 enabled
  bare-metal environments
* Finally, leveraging phases to deploy non-Kubernetes control plane helm-operator based workloads. Example workloads
  include Rook, OpenStack, and other workloads.

<br>

Airshipctl has successfully integrated with:
* Cluster API Components, CAPI, CAPBK, CACPK, and CAPM3
* Clusterctl init and move functionality
* Metal3 Baremetal Operator
* Kustomize
* Flux Helm-Operator

<br>

![](/img/airship2-integration.png)

<br>

In Airship 1.0 we used an Airship project called Promenade to handle Kubernetes cluster deployment and lifecycle
management. One of the most significant evolutions in Airship 2.0 is evolving how we deploy Kubernetes clusters and
lifecycle them in a more Kubernetes native way. To achieve this in Airship 2.0, we now take advantage of the Cluster API
framework. The Cluster API allows us to not only create Kubernetes clusters using Custom Resources but also expands the
number of infrastructure backends that Airship can support -- deploying to not only bare-metal and virtual machines but
a variety of public clouds. To cover more deeply how we now manage Kubernetes in a more Kubernetes-native way, let’s
first review why we started the Promenade project.

In Airship 1.0, we developed Promenade. It is a [Kubernetes](https://github.com/kubernetes/kubernetes) cluster
deployment tool with the following goals:
* Deploy Kubernetes on the first host in a bare-metal environment to use Kubernetes to bootstrap more Kubernetes hosts
* Resiliency in the face of node loss and full cluster reboot.
* Bare-metal node support without external runtime dependencies.
* Providing a fully functional single-node cluster to allow cluster-hosted [tooling](
  https://opendev.org/airship/treasuremap) to provision the remaining cluster nodes.
* [Helm](https://github.com/kubernetes/helm) chart managed component lifecycle.
* API-managed cluster lifecycle.

<br>

Promenade was born out of the need for a configuration-driven approach to deploying a highly available Kubernetes
cluster. Kubeadm was still using an imperative method, with limited capability for HA. Kubeadm has come a long way since
then, and working towards incorporating that installation mechanism makes sense now.

Airship 2.0 takes advantage of Cluster API. The Cluster API intention is to manage the lifecycle (create, scale,
upgrade, destroy) of Kubernetes-conformant clusters using a declarative API:
* To work in different environments, both on-premises, and the cloud.
* To define common operations, provide a default implementation, and provide the ability to swap out implementations for
  alternative ones.
* To reuse and integrate existing ecosystem components rather than duplicating their functionality (e.g.,
  node-problem-detector, cluster autoscaler, SIG-Multi-cluster).

<br>

The Cluster API relies on provider implementations for different environments. As mentioned in [Blog Post #5, Drydock
and its Relationship to Cluster API](
https://www.airshipit.org/blog/airship-blog-series-5-drydock-and-its-relationship-to-cluster-api/), the Airship
community collaborates with the Cluster API Metal3 Baremetal provider (CAPM3) community to realize a production quality,
resilient, secure and mature Baremetal provisioner.

As mentioned above, the Kubeadm project itself has matured in terms of cluster provisioning, and it’s integrated with
the Cluster API via the Cluster API Bootstrap Provider and the Cluster API Control Plane Provider. Cluster API Bootstrap
Provider Kubeadm (CABPK) is responsible for generating a cloud-init script to turn a Machine into a Kubernetes Node; the
initial CAPBK implementation uses Kubeadm for the Kubernetes bootstrap process. The Cluster API Control Plane Provider
(CACPK) role is to instantiate a Kubernetes control plane consisting of the services for etcd, Kubernetes API Server,
Kubernetes Controller Manager, Kubernetes Scheduler as well as other services such as Cloud Controller Manager, Cluster
DNS (e.g., CoreDNS), and Service proxy (e.g., kube-proxy).

Using the Cluster API declarative custom resource definition that defines our control plane, we can extend it enough to
achieve high availability while simultaneously taking advantage of more widely used community tools for control plane
provisioning like Kubeadm. We do this by leveraging the _PreKubeadmCommand_ capability within CACPK to orchestrate a
highly available IP address on top of Baremetal hosts that can be consumed by Kubeadm later in the process.

The interface for Cluster API has also improved our stance at scaling up and down nodes. The control plane can be scaled
up by merely adjusting a replica count, provided you have enough _BareMetalHost_ objects within inventory to take
advantage of. Similarly, worker nodes can also be created simply by creating _MachineDeployment_ document sets. Airship
will give more value here on top of the Cluster API in terms of facilitating the de-duplication and even some generation
of these documents from a more concise description of your deployment needs in the beta release.

In the next blog post, we’ll explain Airship phases and start deep diving into using Airship to manage the lifecycle of
a cluster and its applications. We’ll begin to explain the details step by step of using Airship and the document model
required to achieve a small bare-metal cluster and perform some basic lifecycle scenarios using _airshipctl_.