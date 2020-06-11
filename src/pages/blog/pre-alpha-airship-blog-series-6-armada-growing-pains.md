---
templateKey: blog-post
title: Airship Blog Series 6 - Armada Growing Pains
author: Alan Meadows and Rodolfo Pacheco
date: 2020-01-30T15:25:05.000Z
category: 
  - label: News & Announcements
    id: category-A7fnZYrE1
---

# **UPDATED DESIGN THINKING NOTICE**

This blog has been marked as a "pre-alpha" post and may contain inaccurate information. This post has been archived to
preserve the technologies, design, and thinking of the time. Please see [*this announcement*](
https://www.airshipit.org/blog/pre-alpha-blog-announcement.html) for more information on the road to Airship 2.0 alpha
and how the lessons learned influenced the technologies and design of Airship 2.0 "post-alpha".

<hr>

Helm, the Kubernetes package manager, defined a mechanism to define and deploy a set of Kubernetes artifacts and their
dependencies as a chart. The Helm CLI tool really targeted operators wishing to install a single helm chart at a time
using the command line.  What was missing for users like Airship was the ability to declaratively define several helm
charts to install or upgrade and have that processed with a single command.

Armada provides a way to synchronize a Helm ([Tiller](https://docs.helm.sh/using_helm/#easy-in-cluster-installation))
target with an operator’s intended state, consisting of several
charts, dependencies, tests, and overrides using a single file or directory with a collection of Armada declarations.
This allows operators to define many charts, potentially with different namespaces for those releases, and their
overrides in a central place. With a single command, they can deploy and/or upgrade all of them where applicable.  By
arranging Charts into Chart Groups, Armada can also provide the ability to process installations and/or upgrades either
serially or in parallel depending on the software needs.

Armada consists of three separate but complementary components:

1. CLI component which interfaces directly with [Tiller](https://docs.helm.sh/using_helm/#easy-in-cluster-installation).
2. API component which services user requests through a WSGI server (which in turn communicates with the
[Tiller](https://docs.helm.sh/using_helm/#easy-in-cluster-installation) server) and provides the following additional
functionality:
    * Authentication provided by Keystone (optional).
    * Role-Based Access Control.
    * Limiting projects to specific [Tiller](https://docs.helm.sh/using_helm/#easy-in-cluster-installation)
    functionality by taking advantage project-scoping provided by [Keystone](https://github.com/openstack/keystone).
3. Engine component which processes Chart Groups and Charts, and provides the following features:
    * Interacts with Kubernetes directly to perform basic pre and post-steps, such as removing completed or failed jobs,
    running backup jobs, or deleting resources that do not support upgrades.
    * Running tests on helm charts and blocking until those complete or fail.
    * Fetching chart sources from a variety of locations, such as remote git repositories and specific tags and/or
    branches, and tarball URLs.
    * Blocking on Chart Readiness (wait until resources of a chart all become ready before processing the next chart)
    * Idempotently handle chart declarations, determining automatically when an install or an upgrade is required for a
    chart and its associated values.

The picture below depicts this in the Airship 1.0 architecture:

![](/img/armada-dependencies.png)

Armada as a standalone component of Airship has been embraced by many users that take advantage of it, such as SKT
Telekom, Intel, WindRiver, and others.

In Airship 2.0 we are taking advantage of a cloud-native orchestration engine, specifically Argo. Armada will take
advantage of this as well. In Airship 1.0, Armada interpreted Manifests, Chart Group, and Chart declarative definitions
and translated them into a software delivery workflow to
[Tiller](https://docs.helm.sh/using_helm/#easy-in-cluster-installation). In Airship 2.0, the Manifest and Chart Groups
will dynamically define an Argo DAG. Armada as a component will be a just-in-time spawned pod by Argo instead of a
long-lived service in the site.

These changes help drive several goals we set out to solve with Airship 2.0:
* Simplification
    * Armada as a long-lived process came with its own set of complexities.  This change removes the need to run Armada
    as a permanent API process in the site.
    * This helps us avoid difficult situations where the long-lived Armada process would run across definitions that
    triggered updates to Armada itself, which would end up restarting the Armada service actually performing the update.
    * Similarly, there could be situations where declarations you want to deliver require new versions of Armada which
    will not be upgraded until further into the software workflow process. By using a just-in-time approach calling
    Armada on demand, Airship 2.0 can always call the target version of Armada.
    * As we take advantage of Argo to handle the workflow aspects of software delivery, it presents an opportunity to
    reduce the software footprint of Armada.
    * The security posture is improved by removing the long-lived Armada process which required authentication backends
    like Keystone and RBAC configuration.
* Usability and Visibility
    * The software installation and upgrade portion of updating a site can grow into a fairly long process as the
    software grows in complexity. This change helps introduce a new level of visibility into where that process is at
    and where it failed.  Each Armada Chart installation is effectively a step in an Argo workflow which can be seen
    either through the airshipctl CLI or the UI interface.

The Armada documents in Airship 2.0 will be defined as CRDs. All the Manifests, Chart Groups, and Chart declarations
will be delivered as Kubernetes CRs to the target site. This changes how documents are delivered and how they are
consumed. In Airship 1.0, Armada documents were stored within Deckhand, and consumed from Deckhand directly. In Airship
2.0, Armada documents will be Kubernetes objects and will be consumed and updated directly. As Armada processes these
documents, it will be able to directly reflect their installation status and error messages within the Kubernetes
objects themselves. This provides convenient visibility for operators looking to see what their intended software state
is and what the status is of each component using standard tools like kubectl.

The picture below highlights Armada in Airship 2.0:

![](/img/armada-2.png)

The natural progression for Armada after embracing CRDs, would be to rewrite the core in Golang, and refactor it as
Kubernetes operator. An Operator is a method of packaging, deploying and managing a Kubernetes application. Although
this progression is planned, it is not considered a must to accomplish the Airship 2.0 goals.

Another evolutionary step for Armada will be the ability to support Helm v3 charts. 
Our initial target for Airship 2.0 is to enhance the existing Armada code base to support the following:
* The ability to consume Armada Manifests, Chart Group and Chart document as CRs.
* The ability of the Armada CLI to expose an entry point to invoke execution for a single chart.
* Integrate the Argo workflow with the instantiation of a just-in-time Armada CLI pods by processing the Manifests,
and Chart Groups found as CRs and invoking individual Armada tasks.

In parallel, as we looked beyond the needs of Airship 2.0, we are starting the work at reengineering Armada in Golang,
and the integration with Helm v3. These changes will allow us to be prepared when the charts themselves transition to
Helm v3 charts.

The image below depicts the intended use of the parallel paths for the Armada functionality evolution in Airship 2.0
mentioned above.

![](/img/armada-evolution.png)

In the next blog post, we will discuss how we are evolving the cluster deployment from using Promenade to kubeadm and
the cluster-api. We will dive into the evolution of how we will do cluster deployment in a Kubernetes native way. We
will also cover how we will integrate this within the larger airshipctl workflow.

