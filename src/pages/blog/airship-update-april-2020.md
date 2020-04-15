---
templateKey: blog-post
title: Airship Update - April 2020
author: Alexander Hughes
date: 2020-04-08T12:00:00.000Z
category: 
  - label: Airship 2.0
    id: category-C98iZYrE1
---

What follows is the Airship Community Update for the month of April 2020, brought to you by the Airship Technical
Committee.<!-- more -->

## **AIRSHIP BLOG**

The Airship blog is a great way to keep up with what's going on in the community. The Airship community publishes
[*blog posts*](https://www.airshipit.org/blog/) regularly, including the recent Airship 2.0 Blog series. These blog
posts introduce the changes from Airship 1.0 to Airship 2.0, highlight new features, and detail the evolution of each
component. The first six Airship 2.0 Blog posts are already available:

- [*Airship Blog Series 6 - Armada Growing Pains*](
   https://www.airshipit.org/blog/airship-blog-series-6-armada-growing-pains.html)
- [*Airship Blog Series 5 - Drydock and Its Relationship to Cluster API*](
  https://www.airshipit.org/blog/airship-blog-series-5-drydock-and-its-relationship-to-cluster-api.html)
- [*Airship Blog Series 4 - Shipyard - an Evolution of the Front Door*](
   https://www.airshipit.org/blog/airship-blog-series-4-shipyard-an-evolution-of-the-front-door.html)
- [*Airship Blog Series 3 - Airship 2.0 Architecture High Level*](
   https://www.airshipit.org/blog/airship-blog-series-3-airship-2.0-architecture-high-level.html)
- [*Airship Blog Series 2 - An Educated Evolution*](
   https://www.airshipit.org/blog/airship-blog-series-2-an-educated-evolution.html)
- [*Airship Blog Series 1 - Evolution Towards 2.0*](
  https://www.airshipit.org/blog/airship-blog-series-1-evolution-towards-2.0.html)

<br>

## **SUMMARY OF MARCH VIRTUAL MEETING**

As mentioned in the [*March blog*](https://www.airshipit.org/blog/airship-update-march-2020/), the Airship community
came together with a virtual meeting in place of KubeCon. This was an all day event held on the 31st of March that
served the same purpose as the originally planned face-to-face team meeting at KubeCon. The goals were:
- Aligning on Airship use cases and high-level design
- Finalizing actionable low-level design for upcoming scope
- Reviewing work in progress
- A retrospection
- Open floor discussion

<br>

The full agenda and meeting notes are available [*here*](https://etherpad.openstack.org/p/airship-virtual-meetup-2020)

The meeting was broken down into four recorded sessions:

**Session One** [*Recording*](
https://zoom.us/rec/share/15MuEYDB53tIYJHG9WXcRpU8H735T6a80HJM-fsKzeeP9FW6Q4wvC9PyR8SpsBE?startTime=1585666462000)
  - Review of initial Airship use cases
  - Additional Airship2 use cases

<br>

**Session Two** [*Recording*](
https://zoom.us/rec/share/15MuEYDB53tIYJHG9WXcRpU8H735T6a80HJM-fsKzeeP9FW6Q4wvC9PyR8SpsBE?startTime=1585667419000)
  - Metal3 discussion
  - Explanation of CACPK and CABPK ClusterAPI providers
  - Deep dive on CAPM3 ClusterAPI provider
  - Kubeadm HA/Load balancing proposal
  - Discussion on pivoting from ephemeral to target clusters
  - Review of end-to-end airshipctl flow
  - Review of Airship2 milestone targets and definitions

<br>

**Session Three** [*Recording*](
https://zoom.us/rec/share/15MuEYDB53tIYJHG9WXcRpU8H735T6a80HJM-fsKzeeP9FW6Q4wvC9PyR8SpsBE?startTime=1585677629000)
  - SIG-YAML Deep Dive
  - Provisioning Updates

<br>

**Session Four** [*Recording*](
https://zoom.us/rec/share/15MuEYDB53tIYJHG9WXcRpU8H735T6a80HJM-fsKzeeP9FW6Q4wvC9PyR8SpsBE?startTime=1585684467000)
  - Workload Updates
  - CICD
  - Documentation
  - Phased Deployment and life cycle management
  - etcd
  - Community Retrospection
  - Open Floor discussion
  
<br>

## **AIRSHIP 2.0 PROGRESS**

The progress shown below is for [*airshipctl*](https://opendev.org/airship/airshipctl), the new Airship 2.0 client.

Last month, [airshipctl](https://opendev.org/airship/airshipctl) saw the following activity:
- 19 authors
- 80 commits
- 256 files changed
- 7,891 additions
- 4,063 deletions
- 47 closed issues
- 29 new issues

<br>

This activity brings us closer to Airship 2.0's alpha milestone. Below is the overall status of the alpha milestone:

![](/images/alpha_status_april.png)

<br>

## **GET INVOLVED**

This [page](https://www.airshipit.org/community/) lists everything you need to know to get involved and start
contributing. 

<br>

**Alexander Hughes, on behalf of the [Airship Technical Committee](
https://wiki.openstack.org/wiki/Airship/Airship-TC)**
