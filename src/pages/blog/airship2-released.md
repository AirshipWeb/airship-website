---
templateKey: blog-post
title: Airship 2 - Released!
author: Rodolfo Pacheco, Alan Meadows, Matt McEuen
date: 2021-04-15T12:00:00.000Z
category: 
  - label: News & Announcements
    id: category-A7fnZYrE1
---

_**Airship 2.0 is here**! Airship 2.0 ties together the best-in-class CNCF projects to create a fully declarative lifecycle management system for infrastructure and software delivery._

We are pleased to announce the release of Airship v2. In the last month of 2019, we embarked on a journey to develop Airship 2, as we discussed in the post [Pre-Alpha Airship Blog Series 1 - Evolution Towards 2.0 | Blog](https://www.airshipit.org/blog/pre-alpha-airship-blog-series-1-evolution-towards-2.0/). We wrote a series of blogs defining why and how we intended to achieve that. Like every journey, we learned a lot along the way, and some of our initial intentions outlined within those blog posts evolved as we worked through actually building Airship 2.0. However, we did achieve our ultimate objective for Airship 2.0, _namely to provide a declarative interface to assemble and orchestrate best-of-breed CNCF building blocks for provisioning and lifecycling Kubernetes clouds and the resulting software stack_.

Airship 2.0 takes CNCF projects like Cluster API, Kustomize, Metal3, and the Helm-Operator and provides the glue that integrates them into an end-to-end solution with a smooth operator experience. To achieve the Airship 2.0 goal, we have thought about improving the lifecycling experience and managing the document set that expresses its intentions. We explain both of those in-depth in the upcoming blog posts:
* _Airship 2 - Under the hood - Lifecycle_
* _Airship 2 - Under the hood - Manifests_

<br>

With Airship v2, we accomplish the goals we stated in the post [Pre-Alpha Airship Blog Series 2 - An Educated Evolution | Blog](https://www.airshipit.org/blog/pre-alpha-airship-blog-series-2-an-educated-evolution/), specifically :

* **Declarative Intentions** <br> Airship 2 allows us to better support Distributed Document Topologies & Predictable Behavior. We've integrated Airship with the Kustomize project and have given it the ability to pull declarative intent, in the form of Kubernetes resource documents, directly from versioned or tagged repositories. This allows us to test and validate declarative intent before it is deployed to a live site, with strong predictability guarantees. Airshipctl integrates closely with Kustomize as a library to render document bundles (as we call them) right out of the box as part of any airshipctl action. We also make it easier to manage many distinct regions or clouds by introducing the concept of YAML "catalogs." These catalogs normalize data and utilize layering and replacement transformation to ensure we have a strong level of predictability in lifecycle behavior across all of these sites.

<br>

* **Simplified -> Simple Control** <br> Airship implements two patterns to help ensure we keep the solution as simple as possible. First, we avoid introducing stateful long-lived control plane components into Kubernetes. Instead, Airship interacts solely with the Kubernetes API. This ensures simplicity and also ties into being Cloud Agnostic and ensuring Efficiency. This additionally paves the way for edge models where we need Airship to manage minimal edge environments. Secondly, we introduced the concepts of "phases" and "phase plans" into Airship to sequence and iterate over discrete lifecycle management stages.

<br>

* **Multi Use-Case** <br> We intend to use Airshipctl to drive cloud installations and lifecycle management of environments running lots of different workloads, from CI/CD, to CNFs, to VNFs, to a hybrid between both. We've made airshipctl as simple to use as possible for new community users, folks who need to stand up four servers in a lab but lend itself to those same users if they want to take it into production with 100 servers or 100's of clouds. It is also straightforward for operators to leverage workload definitions from the Airship Treasuremap project and seamlessly integrate their own workloads.

<br>

* **Cloud Agnostic -> Any Cloud** <br> With Airship 2, we have fully embraced the cluster-api and have integrated it closely into airshipctl. We support a variety of infrastructure backends and operating system choices, from public clouds (Azure, Google), to VMs (Openstack), to bare metal (Meta3). We have unified how we stand up, configure, and lifecycle cloud infrastructure across these various providers with a single tool.

<br>

* **Homogeneous -> Equivalency** <br> Regarding our homogenous goal, we deliver a level of uniformity in terms of how we lifecycle the clouds themselves. We also provide a mechanism to ensure these clouds' configuration has a homogeneous feel and adheres to our internal enterprise requirements -- things like standardizing Admission Controllers, Webhooks, Network Security Policies, Namespaces, and more. The advantage airshipctl provides is it works with anything presenting a Kubernetes API. Because of its integration with Kustomize and our ability to layer documents in various ways, from inheriting global values to bifurcating on the type and finally site-specific customizations -- it provides an ideal way to deliver a homogeneous configuration across a variety of cloud deployments and infrastructure backends.

<br>

Specifically, the feature set for airship 2 is:
* _No Touch Remote Site Bootstrap (Ephemeral Cluster)_
* _Declarative Image Building_
  * _Support for declarative Ephemeral ISO_
  * _Support for declarative Baremetal targeted QCOW's_
* _Declarative Cluster Lifecycle_
* _Infrastructure Lifecycle_
  * _On Baremetal Infrastructure_
  * _On Public Cloud Infrastructure_
* _Single Command Line "airshipctl"_
* _Lifecycle as Phases_
* _Introduction of a Plan for the phases_
* _Seamless Integration with CNCF projects (CAPI, Metal3, Kustomize)_
* _Secrets Management. Seamless integration with security Plugins like SOPS_
* _Generic Container interface: a mechanism to extend airshipctl with adhoc functionality_
* _Introduction of Host Config Operator for day two operations_
* _Simplified Development experience through Airship in a Pod_

<br>

To read more about Airship 2 and to dive in, the following documents will help you get started:
* Airship v2, [Release Notes](https://docs.airshipit.org/airship2/release-notes.html)
* Start with [Deploy a Bare Metal cluster](https://docs.airshipit.org/airship2/baremetal.html)

<br>

In general, all project documents can be found at [https://docs.airshipit.org/](https://docs.airshipit.org/).

Airship v2 related repositories can be found at:
* Airship command line [https://github.com/airshipit/airshipctl](https://github.com/airshipit/airshipctl)
* Treasure Map [https://github.com/airshipit/treasuremap](https://github.com/airshipit/treasuremap)
* Helm Charts [https://github.com/airshipit/charts](https://github.com/airshipit/charts)
* Images & Image Builder [https://github.com/airshipit/images](https://github.com/airshipit/images)
* Host Config operator [https://github.com/airshipit/hostconfig-operator](https://github.com/airshipit/hostconfig-operator) 
