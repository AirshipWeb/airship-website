---
templateKey: blog-post
title: Airship Update - December 2020
author: Alexander Hughes
date: 2020-12-15T12:00:00.000Z
category:
  - id: category-C98iZYrE1
    label: Airship 2.0
---

What follows is the Airship Community Update for December 2020, brought to you by the Airship Technical Committee.
<!-- more -->

## **AIRSHIP BLOG**

The Airship blog is a great way to keep up with what's going on in the community. The Airship community publishes
[_blog posts_](https://www.airshipit.org/blog/) regularly, including the Airship 2.0 Blog series. These blog posts
introduce the changes from Airship 1.0 to Airship 2.0, highlight new features, and detail each component's evolution.
The recommended reading order for these blogs is listed below. It begins with the lessons learned on the road to Alpha,
to address the changes made from the original blog series 1-6.

- [*Airship 2.0 is Alpha - Lessons Learned*](https://www.airshipit.org/blog/airship2-is-alpha/)
- [*Pre-Alpha Airship Blog Series 1 - Evolution Towards 2.0*](
  https://www.airshipit.org/blog/pre-alpha-airship-blog-series-1-evolution-towards-2.0/)
- [*Pre-Alpha Airship Blog Series 2 - An Educated Evolution*](
  https://www.airshipit.org/blog/pre-alpha-airship-blog-series-2-an-educated-evolution/)
- [*Pre-Alpha Airship Blog Series 3 - Airship 2.0 Architecture High Level*](
  https://www.airshipit.org/blog/pre-alpha-airship-blog-series-3-airship-2.0-architecture-high-level/)
- [*Pre-Alpha Airship Blog Series 4 - Shipyard - an Evolution of the Front Door*](
  https://www.airshipit.org/blog/pre-alpha-airship-blog-series-4-shipyard-an-evolution-of-the-front-door/)
- [*Pre-Alpha Airship Blog Series 5 - Drydock and Its Relationship to Cluster API*](
  https://www.airshipit.org/blog/pre-alpha-airship-blog-series-5-drydock-and-its-relationship-to-cluster-api/)
- [*Pre-Alpha Airship Blog Series 6 - Armada Growing Pains*](
  https://www.airshipit.org/blog/pre-alpha-airship-blog-series-6-armada-growing-pains/)

<br>

Stay tuned for upcoming blog posts as Airship 2.0 progresses through release!

<br>

## **AIRSHIP CONTAINER AS A SERVICE**

Two operators will manage the lifecycle of Virtual Machines and their relationship to the cluster: vNode-Operator (ViNO)
and the Support Infra Provider (SIP). These operators are new projects to the Airship ecosystem and were migrated to
OpenDev earlier this month.

Now, you may be asking why are we creating two more projects? It's a fair question, so let's
discuss the motivation behind these projects. These projects focus on a particular user of Airship, those that want to
support multi-tenancy.

Airship was created as a solution to managing Kubernetes workloads, and over time a lot of these workloads have become
Kubernetes native. Some of those workloads, however, have needs that exceed those of individual Kubernetes clusters,
which  limits hard multi-tenancy. An example of this would be a Custom Resource Definition (CRD), a cluster-wide
object that does not facilitate namespacing or other ways of segregating it. This can lead to issues if one cluster
wishes to consume a particular version of Istio, but that version of Istio would conflict in a different cluster.

So we need a way to have multiple Kubernetes clusters, preferably in a single hardware region. We examined several
ways to segregate these out, including:
- Splitting up a datacenter into multiple Airship managed regions
- Deploying infrastructure using tools like OpenStack or Kubevert (essentially enabling a single large undercloud
  cluster, like in Airship 1, to provision multiple clusters above it)

<br>

We felt that encapsulating smaller clusters over a cluster directly deployed on bare-metal was the right decision,
supporting aggregating hardware to perform common Ceph service consumed above, and a more granular lifecycle control
of clusters operating tenant workloads. The question becomes, how do we split the bare-metal nodes up into consumable
units for Cluster API (CAPI) to provision and participate in multiple Kubernetes clusters?

Tools like Kubevert were examined, but we felt that due to the specialized nature of a lot of the workloads we run, the
benefits were outweighed by the issues encountered to enable low-level tweaking of how Virtual Machines operate,
leading to a significant amount of abstraction.

It became apparent that a simpler, cruder, deployment would make more sense for us. New operators, SIP and ViNO were
conceived as a solution.

So what do each of these operators do, at a thousand-foot view?

[ViNO](https://opendev.org/airship/vino) (Virtual Node Operator)
- Lays down libvirt and Virtual Machine definitions across bare-metal hosts
- Fronts the Virtual Machines with sushy-tools for Redfish interactions via Metal3 et al.
- Generates BareMetalHost definitions for the Virtual Machines

<br>

[SIP](https://opendev.org/airship/sip) (Support Infrastructure Provider)
- Creates a load balancer, essentially an HAProxy instance deployed across the nodes allowing kubeadm to instantiate a
  highly available cluster.
- Provides utilities such as a jump pod
- Facilitates CAPI (Cluster API) scheduling, e.g. "I need VMs with certain characteristics"

<br>

These projects are related to each other through CAPI, which will provision via Metal3 against the VMs created by ViNO
and labeled by SIP.

Look forward to more information on both of these projects in an upcoming blog post by Pete Birley, expected in January.
In the meantime, learn more about these projects which were both introduced at the PTG in October through the recording
below:

- [Recording](https://zoom.us/rec/share/l3znN5H6JCvTnem-yaF0oUBJswd15a1k3vnQ-zvz93QaKclo2tdGoOU-5X7kluFE.idTvzC-AKnRpSm78?startTime=1603976835000) (Starts at about 3hr27m into the recording)
- Password: ptg2020!

<br>

## **GITHUB LABELS UPDATES**

As Airship's design has evolved, so too has the need for an evolution of our issue tracking. Historically Airship 2.0
development issues were labeled with a "component/xxx" label, but those have become stale. In an attempt to identify
outstanding work and priority, we are dropping the component labels in favor of new categories, in order of importance,
for all remaining unassigned issues:

| LABEL              | DESCRIPTION                                                                                                                                                                  |
|--------------------|-------------------------------------------------------------------------------------------------------|
| 1-Core             | Relates to airshipctl core components (i.e. go code)                                                  |
| 2-Manifests        | Relates to manifest/document set related issues                                                       |
| 3-Container        | Relates to plugin related issues                                                                      |
| 4-Gating           | Relates to issues with Zuul & gating                                                                  |
| 5-Documentation    | Improvement or additions to documentation                                                             |
| 6-upstream/project | Requires a change to an external project, e.g. clusterctl                                             |
| 7-NiceToHave       | Relates to issues of lower priority that are not part of critical functionality or have work arounds  |

<br>

## **AIRSHIP USER SURVEY**

Are you evaluating Airship or using Airship in production? We want to learn from your experience! Take the [_Airship
User Survey_](https://www.surveymonkey.com/r/YKZ9NC2); the Working and Technical Committees review each response and
helps us grow and mature Airship. Take the [_Airship User Survey_](https://www.surveymonkey.com/r/YKZ9NC2) today to be
included in  the next round of analysis.

<br>

## **AIRSHIP 2.0 PROGRESS**

The progress shown below is for [_airshipctl_](https://opendev.org/airship/airshipctl), the new Airship 2.0 client.

Last month, [_airshipctl_](https://opendev.org/airship/airshipctl) saw the following activity:

* 15 authors
* 31 commits
* 281 files changed
* 11,430 additions
* 817 deletions
* 11 closed issues
* 19 new issues

<br>

This activity is contributing to the General Availability (GA) milestone. Below is the overall status of the GA
milestone, which does not include the breakdown of already completed Alpha and Beta milestones:

![](/images/ga_status_december_2020.png)

<br>

## **GET INVOLVED**

This [_page_](https://www.airshipit.org/community/) lists everything you need to know to get involved and start
contributing. 

<br>

**Alexander Hughes, on behalf of the [_Airship Technical Committee_](
https://wiki.openstack.org/wiki/Airship/Airship-TC)**
