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

## **OPEN INFRASTRUCTURE SUMMIT OCTOBER 2020**

Last month there were several excellent presentations related to Airship at the Open Infrastructure Summit. You can find
each of these below:

* [Airship 101](https://www.youtube.com/watch?v=Fh-YJDpQ5xE) (Andrew Karandjeff, Drew Walters)
* [Own your YAML: extending Kustomize via Plugins](https://www.youtube.com/watch?v=Xoh_OpLoVtI) (Matt McEuen)
* [Tackling security challenges with Airship](https://www.youtube.com/watch?v=9Qww2qHhNmE) (Alexander Hughes)
* [Machine Learning at Edge Cloud](https://www.youtube.com/watch?v=TJlj8oMONPo) (Prakash Ramchandran, Vivek Hariharan)
* [Significance of Hardware Classification combined with Host Configuration Operator](
  https://www.youtube.com/watch?v=S0tJapmYNP4) (Digambar Patil, John Williams, Sirisha Gopigiri)
* [China Mobile software and hardware integrated portable cloud platform test system](
  https://www.youtube.com/watch?v=8N5PeW2l7Lc) (Xiaoguang Zhang, Zhiqiang Yu)
* [hardware automation deployment and test with big scale in ChinaMobile NFV cloud](
  https://www.youtube.com/watch?v=omKxP-qiKng) (Xiaoguang Zhang, Zhiqiang Yu)

<br>

## **AIRSHIP CONTAINER AS A SERVICE**

Two operators will manage the lifecycle of Virtual Machines and their relationship to the cluster: vNode-Operator (ViNO)
and the Support Infra Provider (SIP). These operators are new projects to the Airship ecosystem and were migrated to
OpenDev earlier this month.

So what do each of these operators do, at a thousand-foot view?

[ViNO](https://opendev.org/airship/vino) (Virtual Node Operator)
- Lays down libvirt and Virtual Machine definitions across bare-metal hosts
- Fronts the Virtual Machines with sushy-tools for Redfish interactions via Metal3 et al.
- Generates BareMetalHost definitions for the Virtual Machines

<br>

[SIP](https://opendev.org/airship/sip) (Support Infrastructure Provider)
- Creates a load balancer
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

## **AIRSHIP USER SURVEY**

Are you evaluating Airship or using Airship in production? We want to learn from your experience! Take the [_Airship
User Survey_](https://www.surveymonkey.com/r/YKZ9NC2); the Working Committee reviews each response and helps us grow
and mature Airship. Take the [_Airship User Survey_](https://www.surveymonkey.com/r/YKZ9NC2) today to be included in
the next round of analysis.

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
milestone:

![](/images/ga_status_december_2020.png)

<br>

## **GET INVOLVED**

This [_page_](https://www.airshipit.org/community/) lists everything you need to know to get involved and start
contributing. 

<br>

**Alexander Hughes, on behalf of the [_Airship Technical Committee_](
https://wiki.openstack.org/wiki/Airship/Airship-TC)**
