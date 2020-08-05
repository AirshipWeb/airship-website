---
templateKey: blog-post
title: Pre-Alpha Airship Blog Series 2 - An Educated Evolution
author: Rodolfo Pacheco and Alan Meadows
date: 2019-07-11T09:00:00.000Z
category: 
  - label: Airship 2.0
    id: category-C98iZYrE1
---

_**UPDATE 03-August-2020:** Airship 2.0 development spans multiple milestones. Upon completing the first major
milestone, Alpha, the community took some time to reflect on lessons learned and how they impacted the direction and
design of Airship 2.0. We have summarized these lessons learned and how the design has changed over time - including
using different technologies and approaches. You can read more about these changes here: [Airship 2.0 is Alpha - Lessons
Learned](https://www.airshipit.org/blog/airship2-is-alpha/). You should review these changes before reading blogs posted
before the Airship 2.0 Alpha milestone._

Airship 1.0 dramatically improved the way we provision and manage the infrastructure. Navigating through the journey towards Airship 1.0 release, we have learned many lessons.<!-- more -->

Here are some of the lessons learned in the 1.0 release:

- **_Building Airship YAML is hard_**. Many YAML documents are Airship specific documents, requiring an investment in Airship to learn how to craft the documents. The tools to work with the YAML are generally Airship specific (Pegleg, Deckhand, etc.)
- **_Airship is a complex set of services working together to realize a declarative set of infrastructures_**. It can be a challenge to determine where a failure in the system has occurred. Because of the size of those components and especially their infrastructure dependencies, it is also a challenge to make them run in the edge.
- **_End users require simple visibility into failures and YAML mistakes_**. Some typical failures, e.g. failure of using IPMI to control a physical node with data provided, were not surfaced very clearly. It is difficult to tell exactly where in detail those failures have occurred in Airship without SME expertise on where to look in Airship's deployment process.
- **_Changing the tires while the car is moving is hard_**. Some stateful components and long-lived services of Airship running in the site drives the site updates. Those components and services could be (and typically are) part of the update package itself. Thus, it is complex to handle this situation - how do you upgrade the upgrader and seamlessly resume the process?
- **_Workflows should be fully declarative_**. Shipyard uses an orchestration workflow for core Airship activities such as updating a site, redeploying a host, etc. This orchestration workflow is fairly rigid in implementation, stored within the container themselves and not within the document set. Any updates which may be needed to change this flow ends up with sidestepping the system.
- **_Supporting more use cases out of the box leads to wider adoption_**. For instance, Airship 1.0 uses MaaS as the foundational bare metal deployer. Without additional development for bare metal deployment, it is not possible to support alternative operating systems like CentOS or SUSE. Similarly, Airship 1.0 also presumes bare metal infrastructure with unrealized plans to have Drydock support BYO and third-party Clouds.

<br>

To address some of the lessons learned above, Airship 2.0 has the following goals:

1. **Supporting Smaller deployments**
   * The notion of an Ephemeral Undercloud Control Plane is introduced.
   * Optimize support for use cases like edge cloud, connected car, etc.
2. **Adoption of entrenched upstream projects**
   * Re-focus on Airship core competencies by leveraging other open source projects where appropriate. This also allows Airship users to bring their domain knowledge of these widespread tools when building out Airship infrastructure.
     - E.g. kubeadm vs Promenade, kustomize vs Deckhand, cluster-api vs Drydock knowledge etc.
   * Embrace the cluster-API to support a wide array of deployment use cases, such as BYO infrastructure, third-party public clouds, virtual machinesand baremetal.
3. **Vanishing complexity**
   * With an ephemeral undercloud, the control plane is reduced so that there are no long-lived resources.
     - It removes the challenge of upgrading the infrastructure while the workflow itself is being upgraded
     - It improves security through reduced surface area
   * Declarative workflows give operators better visibility
     - It improves time to market and reduces development burden
   * Ability to bring-your-own-workflows allows complex organization-specific MOPs to be declared like anything else
   * The user's command line interface becomes streamlined (one tool to do it all)
     - [*airshipctl*](https://opendev.org/airship/airshipctl)
   * Normalize all YAML to Kubernetes-style schemas and CRs-type documents. Many Airship specific schemas are removed.
4. **Increase visibility into what is taking place and what has failed**
   * Issues in deployment lifecycle are easily exposed for user's awareness directly via kubernetes objects, e.g. machine deployment failures can be seen by looking directly at machine objects.
   * All intent is stored as native Kubernetes CRDs, and easily visible with standard tools like kubectl.
   * Enhance workflow visibility into each discrete step performed.

<br>

## **Smaller Deployments**

Small deployments require some optimizations on the impact of the software executing the undercloud lifecycle management. Resources on this smaller deployment are more likely constrained and it begs for the need for an option where control plane and compute are synergistically merged.

Our goal remains to make Airship the framework of choice for managing regions of various dimensions and purposes.

For small use cases, some issues and questions are immediately apparent:

- **_Limited Resources_**
  * The numbers of locations in edge use cases might be rather large. On each of those locations, the amount of baremetal servers available to host workload and control plane functionality is limited.
  * Management Network Bandwidth in small edge deployments can be constrained.
  * Bare metal nodes are precious resources in small deployments. There should be no need to make a distinction between control plane and data plane nodes.
- **_Security_**
  * Physical security introduces new problems for edge use cases.
- **_Remote Maintainability_**
  * The vast number of edge locations that require deployment and life cycle management mandate truly zero touch interactions. In addition, operators will not have easy physical access to such locations.

<br>

We propose the notion of **Ephemeral Undercloud Control Plane (EUCP)** to solve some of the issues above. EUCP is defined as a control plane that is 100% transient. It only exists and runs when needed. This helps solve some of the problems listed above:

- The EUCP does not require constantly running components beyond the "basic infrastructure". i.e. Kubernetes itself must be present.
- The EUCP resource needs should be satisfied with an almost neglectable amount of resources.
- The lack of a local UCP improves the secure posture:
  * By reducing the attack surface area for attacks on the infrastructure.
  * By reducing the complexity of the components that need RBAC protecting.
- Support alternative storage solutions beyond ceph for simpler storage needs that are a better fit for the small hardware footprints in edge deployments.

<br>

## **Adoption of _Entrenched_ Upstream Projects**

Airship is defined as a loosely coupled integration of components to achieve the vision of a 100% Declarative Lifecycle Management for infrastructure. That covers the complete hardware and software stack.

Airship's vision is to continue to embrace the projects of the community that represent the best approach or vision. Given that some of the technologies in this space are constantly evolving, there is an expectation that as we evolve we will continue to embrace new projects and approaches when appropriate. 

This means that for each release, Airship explores areas for improvements. In Airship 2.0, we will start to integrate:

- **Cluster API**: Kubernetes cloud native mechanism for cluster management
- **Baremetal Operator**: Baremetal provider for cluster api that provides an implicit integration with standalone ironic
- **Argo**: Cloud Native Workflow/Orchestrator, a mechanism to provide dynamic and declared DAGs
- **Kubeadm**: A resilient cluster bootstrapper
- **Kustomize**: A YAML document customization tool

<br>

There are some clear wins when leveraging an upstream project instead of building an Airship specific project to address a particular need:

- Benefit from a larger community solving a specific problem
- Users who come to Airship are more likely to come with experience with these tools, rather than their Airship specific counter-parts
  * E.g. people will likely already have an understanding of kubeadm vs Promenade or kustomize vs Deckhand
- Allow Airship to focus more on providing a unified streamlined operational experience to all those tools under the hood

<br>

## **Vanishing Complexity**

**_Software complexity_** is a natural byproduct of the functional complexity that the code is attempting to enable. With multiple system interfaces and complex requirements, the complexity of software systems sometimes grows beyond control, rendering applications overly costly to maintain and risky to enhance. Left unchecked, software complexity can run rampant in delivered projects, leaving behind bloated, cumbersome applications.

Some of the implemented components in Airship 1.0 suffer from layers of complexities that we believe can be removed or greatly reduced.

The complexity is evident in components such as Shipyard that leverages an existing DAG Workflow engine (Airflow), which itself requires infrastructure components such as RabbitMQ and Postgre DB.

Eliminating some of this complexity will essentially be achieved by replacing those components with mechanisms embracing cloud-native approaches.  For instance, replacing Shipyard and the workflow engine it uses along with all its infrastructure dependencies with a more cloud-native technology like Argo. Argo utilizes only CRDs and a simple operator which leverage Kubernetes itself. This not only reduces complexity, but also helps with the goal of a much smaller Airship deployment.

Some of the inherent complexities in the existing components have also exposed challenges when trying to manage the lifecycle of components that manage the lifecycle of infrastructure. By removing the need for those components, we no longer must solve the challenge.

Although the YAML management in Airship 1.0 is supported via Deckhand, it introduces a high bar to entry because users need to understand how Deckhand layering, substitution, and rendering functions. By leveraging more entrenched upstream tools such as Kustomize as an alternative, there is a higher likelihood that new Airship users will come to the table with existing knowledge of how to work with these tools and craft these types of documents already.

Similarly, in Airship 1.0, there are a large number of Airship-specific documents required for declaring infrastructure. Learning how to create each of those documents requires heavy investment in learning specific formats of each individual document type. Moving to fewer unique documents and ensuring each document is a proper Kubernetes CR document will reduce the complexity of creating a new site from scratch or adopting a Treasure Map template to your own deployment.

Airship 1.0 required the Shipyard API engine for all life cycle management running within the site being managed. The heart of the platform in Airship 2.0 is the [*airshipctl*](https://opendev.org/airship/airshipctl) command line interface. It places an emphasis on a thick client that can speak to Kubernetes natively in remote sites and helps drive cluster life cycle management. This pivot reduces the underlying software infrastructure required to support updates to an existing site and vastly simplifying the overall design. 

## **Increase Visibility**

Deployment lifecycle issues need to be easily exposed for user's awareness. For instance, in Airship 1.0, it is challenging to discover what the particular failure that occurred was when dealing with physical infrastructure. With the transition to the baremetal operator in Airship 2.0, every physical node will be represented as a native Kubernetes object, including its provisioning status, failures, and so on. This will provide a foundational building block for leveraging Kubernetes natively to retrieve status on resources.

Document representation also needs to be native and easily visible. In Airship 1.0, documents are stored in Deckhand which is a long-lived service in the environment. If you want to retrieve your documents or inspect them as an operator, it requires communicating with the Deckhand API with a specialized client. In Airship 2.0, documents are all stored as native Kubernetes CRDs. This allows operators to easily inspect what documents are installed and what their contents are using convenient kubectl commands provided they have the appropriate permissions.

Workflow visibility needs to be enhanced into each discrete step performed. In Airship 1.0, Shipyard performs an explicit workflow to update a site, redeploy a host, and so on. It provides some visibility into the high-level breakdown of that effort, but not into the discrete steps that are being performed. For example, installing all Helm charts into a site is represented as a single step in Airship 1.0. In Airship 2.0, using Argo, we can provide visibility, including a UI from the Argo project, into each step that has and will run, and allow you to drill into logs on each one.  This provides operators with enhanced visibility on what Airship is doing at any point of time.

At the end of the day, Airship 1.0 was born from experience in operating traditional clouds and incorporated some key cloud-native infrastructure such as containers and Kubernetes. Airship 2.0 takes this even further and incorporates all our learnings in the cloud-native space. In the coming blog posts, we will review the Airship 2.0 architecture and deep-dive into the details of the evolution.
