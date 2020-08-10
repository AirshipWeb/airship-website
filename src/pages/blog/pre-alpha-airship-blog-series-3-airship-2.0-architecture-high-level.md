---
templateKey: blog-post
title: Pre-Alpha Airship Blog Series 3 - Airship 2.0 Architecture High Level
author: Alan Meadows and Rodolfo Pacheco
date: 2019-08-10T09:00:00.000Z
category: 
  - label: Airship 2.0
    id: category-C98iZYrE1
---

_**UPDATE 03-August-2020:** Airship 2.0 development spans multiple milestones. Upon completing the first major
milestone, Alpha, the community took some time to reflect on lessons learned and how they impacted the direction and
design of Airship 2.0. We have summarized these lessons learned and how the design has changed over time - including
using different technologies and approaches. You can read more about these changes here: [Airship 2.0 is Alpha - Lessons
Learned](https://www.airshipit.org/blog/airship2-is-alpha/). We recommend reviews these changes before reading blogs
marked as "Pre-Alpha."_

In order to achieve the goals of vanishing complexity, as well as broaden the variety of supported use cases for Airship 2.0, we shifted far more of the process to the left. We will accomplish this by introducing [*airshipctl*](https://opendev.org/airship/airshipctl). The [*airshipctl*](https://opendev.org/airship/airshipctl) command line interface is really the heart of the Airship 2.0 platform. It places an emphasis on a thick client that is effectively able to speak to k8s in remote sites and natively understands [*Argo*](https://argoproj.github.io/) workflows to drive cluster life cycle management. This contrasts with Airship 1.0 which leveraged a Shipyard API in the remote site, which was a long-lived service and used many Airship specific projects instantiated in the site to accomplish the life cycle management of Airship documents, kubernetes, baremetal nodes, and helm charts.<!-- more -->

The goals for this pivot are to reduce the underlying infrastructure required to support updates to an existing site and reduce the number of Airship specific YAML documents required to produce and manage a site, vastly simplifying the overall design. This utility is a net-new GO module.  This utility operates on a kubernetes cluster security context and understands how to interpret and generate a skeleton Airship document set. The [*airshipctl*](https://opendev.org/airship/airshipctl) utility is the main entry point for bootstrapping a cluster, collecting and pushing documents, and managing workflows.

To provide greater visibility and ease operations, Airship 2.0 will also introduce an *airshipui* GO binary that will also operate on the same cluster security context. This user interface will provide users with the ability to drive and visualize workflows, drill into failures, and the ability to manipulate Airship YAML documents and manage them.

These utilities will help drive the four major technologies we will incorporate:

## **[*Metal3-IO*](https://github.com/metal3-io) for Baremetal Provisioning**

By incorporating [*Metal3-IO*](https://github.com/metal3-io), we can take advantage of the work being done in that community to treat baremetal machines as proper Kubernetes resources that are declared and reconciled. It also enables us to begin utilizing the [*Cluster-API*](https://github.com/kubernetes-sigs/cluster-api) framework. This will reduce the number of baremetal related Airship specific documents and replace them with [*Metal3-IO*](https://github.com/metal3-io) Kubernetes CRD documents. This transition also allows us to support multiple operating systems as well as advanced baremetal configuration such as firmware versions and RAID configuration.

## **The [*Cluster-API*](https://github.com/kubernetes-sigs/cluster-api) for Kubernetes Bootstrapping and LCM**

The [*Cluster-API*](https://github.com/kubernetes-sigs/cluster-api) is a Kubernetes project to bring declarative, Kubernetes-style APIs to cluster creation, configuration, and management. By leveraging the [*Cluster-API*](https://github.com/kubernetes-sigs/cluster-api) for cloud provisioning, we can take advantage of upstream efforts to build Kubernetes clusters and manage their lifecycle. Most importantly, we can leverage the multitude of providers that already exist, similar to Metal3-IO for baremetal.  This will allow Airship deployments to target third-party clouds such as Azure, AWS, and even OpenStack VMs. There are even [*Cluster-API*](https://github.com/kubernetes-sigs/cluster-api) providers that support Kubernetes deployments on top of already provisioned infrastructure, enabling BYO use cases as well.

## **[*Argo*](https://argoproj.github.io/) for Workflows**

[*Argo*](https://argoproj.github.io/) is a Container-native workflow engine for orchestrating parallel jobs on Kubernetes. [*Argo*](https://argoproj.github.io/) Workflows are implemented as a Kubernetes CRDs. This allows us for the first time to truly realize completely declarative workflows within the Airship document bundle. Each step in the declared workflow is a container and models multi-step workflows as a sequence of tasks or capture the dependencies between tasks using a graph (DAG). The Airship community will provide a set of curated and tested workflows out of the box for the most common deployment and lifecycle needs, but operators and vendors can also introduce their own custom workflow declarations.

[*Argo*](https://argoproj.github.io/) will also allow us to vastly simplify the dependencies required to drive workflows in an Airship environment. Where Shipyard required several Airflow components running, message queue infrastructure, and databases, [*Argo*](https://argoproj.github.io/) only requires a single operator and stores all state in Kubernetes CRs. Similarly, the Shipyard API was a long-lived process running in the site, whereas the API for [*Argo*](https://argoproj.github.io/) is Kubernetes itself. By removing all these dependencies and leveraging [*Argo*](https://argoproj.github.io/), Airship will now be able to simplify the process of upgrading the orchestrator.

## **[*Kustomize*](https://kustomize.io/) for Document Layering and Substitution**

This tool provides a purely declarative approach to configuration and customization that embraces Airship's approach and adheres to and leverages the familiar and carefully designed Kubernetes API. In short, [*Kustomize*](https://kustomize.io/) allows for customization of Kubernetes YAML configurations. From an Airship perspective, the introduction of [*Kustomize*](https://kustomize.io/) will allow us to transform the way we provide layering, substitution, and YAML document management. This functionality was previously provided by Deckhand, an Airship specific tool. Where Deckhand required users to invest in understanding how to perform layering, substitution, and other operations in an Airship specific tool, [*Kustomize*](https://kustomize.io/) is an example of an entrenched community tool for doing the same.

Besides embracing these technologies, we are also leaning towards a closer relationship with CNCF principles. We are modifying all Airship custom YAML schemas to comply with Kubernetes Custom Resource Definition schemas. These will take us a step closer to the goal of simplifying the cost of entry into the project and leverage all the tools already available to work with these types of schemas.

We're also evolving some existing Airship components, such as [*Pegleg*](https://opendev.org/airship/pegleg), and [*Armada*](https://opendev.org/airship/armada). In Airship 2.0, [*Pegleg*](https://opendev.org/airship/pegleg) will no longer be a standalone tool, and some of its functionality, such as document rendering, linting, and secret rotation, will be incorporated into airshipctl. Similarly, [*Armada*](https://opendev.org/airship/armada) will continue to help orchestrate collections of helm charts and their associated overrides in Airship 2.0. We will be enhancing it to store and consume [*Armada*](https://opendev.org/airship/armada) documents as proper Kubernetes CRs as well as allowing it to be orchestrated by an [*Argo*](https://argoproj.github.io/) workflow.

The picture below represents the target Airship 2.0 architecture:

![](/img/airship-2-architecture.jpg)

In the upcoming blog posts, we will elaborate on the evolution of each of the Airship 1.0 components:

- **Shipyard**: an evolution on the Front Door
- **Drydock**: and its relationship to [*Metal3-IO*](https://github.com/metal3-io)
- **Armada**: Embracing cloud-native
- **Promenade**: [*Kubeadm*](https://kubernetes.io/docs/reference/setup-tools/kubeadm/) and [*Cluster-API*](https://github.com/kubernetes-sigs/cluster-api)
- **Deckhand**: Document rendering the cloud native way, [*Kustomize*](https://kustomize.io/)!
- **Pegleg**: Document management
- **Treasure Map**: Supporting Airship 2.0
- **DivingBell**: Day 2 approach in Airship 2.0
- **Airship 2.0**: Deep dive review
- **What's Next**: Beyond Airship 2.0
