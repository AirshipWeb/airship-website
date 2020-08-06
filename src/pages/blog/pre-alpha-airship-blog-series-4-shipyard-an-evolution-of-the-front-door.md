---
templateKey: blog-post
title: Pre-Alpha Airship Blog Series 4 - Shipyard - an Evolution of the Front Door
author: Alan Meadows and Rodolfo Pacheco
date: 2019-09-10T09:00:00.000Z
category: 
  - label: Airship 2.0
    id: category-C98iZYrE1
---

_**UPDATE 03-August-2020:** Airship 2.0 development spans multiple milestones. Upon completing the first major
milestone, Alpha, the community took some time to reflect on lessons learned and how they impacted the direction and
design of Airship 2.0. We have summarized these lessons learned and how the design has changed over time - including
using different technologies and approaches. You can read more about these changes here: [Airship 2.0 is Alpha - Lessons
Learned](https://www.airshipit.org/blog/airship2-is-alpha/). You should review these changes before reading blogs marked
as "Pre-Alpha."_

*Shipyard* provides a frontend API within Airship environments that allow users to push their declared documents into sites and execute pre-defined Directed Acyclic Graphs (DAGs) against those declarations. DAG is a directed graph data structure for topological ordering. From an architectural perspective, this is what *Shipyard* looks like today and how it interacts with other Airship components:<!-- more -->

![](/img/airship-1-shipyard.jpg)

*Shipyard* leverages the *Falcon* web framework for the API component and uses Apache *Airflow* as the backend engine to programmatically author, schedule and monitor workflows. The backend is composed of workers and schedulers, and leverages database and message queue infrastructure in order to process DAGs. We initially chose *Airflow* as our workflow engine because of its wide use as a DAG workflow engine. Ultimately, the choice let us down in a few ways:

- We did not succeed at making our workflows themselves configuration driven. The technology choice required DAGs to be predefined and baked into the *Airflow* worker containers as *Python* scripts.
- *Airflow* as a DAG engine had much heavier infrastructure requirements than we anticipated in order to process workflows.
- Using *Airflow* as the orchestrator to update infrastructure components that are actually supporting *Airflow* itself was very difficult.

<br>

Let us dive into more details on exactly what functionality *Shipyard* provides for us today:

- **Document Management Functionality**
  - Ingest document into the site (commit etc.) 
    - Document delivery
    - Document validation by interactions with *Deckhand*, *Armada*, etc.
  - Retrieve documents (rendered, specific version, labels)
- **Workflow Management**
  - Support the following out of the box actions:
    - Deploy site
    - Site update
    - Software update
    - Redeploy host
    - Test site
  - Inspect workflows state
    - Follow a specific workflow and its status
    - Retrieve information about each workflow step
    - Retrieve logs from each workflow step
  - History from previous actions 
    - Retrieve a previously run workflow and its status
    - Retrieve information about each workflow step
    - Retrieve logs from each workflow step
- **Retrieve Status information of the cluster**
  - For specific nodes, what is the status?
    - Relying on *Drydock* and *Promenade* to get the status

<br>

Given our goals with Airship 2.0 covered in previous blog posts, evolving *Shipyard* had the following requirements:

- Achieve a minimalistic presence for *Shipyard*
- Define the new or equivalent entry point into Airship 
- Provide a mechanism to manage document revisions
- Take steps towards achieving the Ephemeral Undercloud Control Plane (EUCP)

<br>

There are now several solutions for providing cloud-native workflows. After a [*careful analysis*](https://www.openstack.org/videos/summits/denver-2019/the-future-of-kubernetes-workflows-for-open-infrastructure) of the available upstream projects, we have decided that [*Argo*](https://github.com/argoproj/argo) is the more mature project and provides the fuller, richer feature set as well as an operations-focused outlook required for our workflow goals.

Introducing a cloud-native orchestrator also provides a mechanism to solve for more complex upgrade scenarios where there is value in declaratively defining specific upgrade steps and flows directly in your Airship documents, so you do not have to ever step outside the declarative system no matter how complex your particular scenario is. Organizations can also easily interleave their own organizational-specific workflows with the out of the box Airship workflows in an entirely configuration driven manner. By also leveraging a more cloud-native workflow solution, the reduced infrastructure requirements for the workflow engine itself means that we will not have to solve for how the infrastructure below the workflow engine can be upgraded by the workflow itself, which is an especially hard problem to deal with. 

In Airship 2.0, we have eliminated the need for a long-running API service within the site. Instead, we interface directly with *Kubernetes* to drive deployments and upgrades. The heart of that mechanism is the ***airshipctl*** utility, which will provide a one-stop command line interface to automate cloud provisioning. Because this utility works directly against *Kubernetes* endpoints, it can ensure even the lowest level dependencies for Airship, such as *Helm* and *Argo* and their related CRDs, are instantiated in the site prior to delivering workflows.

The ***airshipctl*** utility is a *GO* module that produces a single binary: ***airshipctl***. This utility operates on a *Kubernetes* cluster security context. The ***airshipctl*** utility is the main entry point for bootstrapping a cluster, collecting and pushing documents, and managing workflows.

The picture below depicts how a traditional *Shipyard* request is performed in Airship 2.0:

![](/img/airship-2-shipyard-flow.png)

With this new architecture, we are effectively introducing a more cloud-native workflow engine that helps achieve several of our goals. By integrating community projects like *Argo*, we are able to treat workflows as *Kubernetes* objects and have eliminated the need for long-running Airship-specific APIs and infrastructure services. The strength of the *Argo* and declarative workflows is that they allow us to introduce ephemeral infrastructure requirements in support of running a given workflow. 

In the next blog post, we will dive into the evolution of *Drydock* and how we are leveraging community projects such as *metal3-io* and the *cluster-api* to help drive cloud-native baremetal provisioning within Airship 2.0.
