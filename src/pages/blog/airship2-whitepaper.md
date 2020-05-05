---
templateKey: blog-post
title: Airship 2.0 White Paper - A Roadmap for Solving NFVi Challenges on the Way to Full 5G Deployment
author: Ryan van Wyk
date: 2020-05-05T12:00:00.000Z
category: 
  - label: Airship 2.0
    id: category-C98iZYrE1
---



When our engineering team helped found the open source Airship Community in [May of 2018](
https://about.att.com/innovationblog/airship_for_openstac), the goal was to deliver an Open Infrastructure Project that
would enable telecommunications operators like AT&T to *predictably* deliver raw infrastructure as a resilient cloud,
and to easily manage the life cycle of the resulting platform, including real-time upgrades with no downtime. Airship is
at the core of our 5G deployment, which we plan to be [nationwide this summer](
https://about.att.com/newsroom/2020/5g_announcements.html). 

Our goal with Airship is to help global operators deploy their own Network Function Virtualization Infrastructure (NFVi)
efficiently and effectively as part of their Software Defined Network (SDN) buildout. In collaboration with the Airship
community we want to share some of the capabilities we’ve developed over the last few years at AT&T to address common
NFVi challenges such as:

1. Lengthy and complicated processes;
2. Need for custom development to integrate an ecosystem of various open source projects into one cloud platform;
3. Demands for resources with a wide array of deep skillsets;
4. Difficulties keeping up with the cadence of new open source releases due to the slow process of deployment and
   upgrades;
5. Challenges of scalability and security; and
6. Looking ahead, the need to evolve the NFVi from supporting VNFs (Virtual Network Functions), to VNFs and CNFs (Cloud
   Native Network Functions) and eventually just CNFs.

On April 29th, 2019 the Airship Community delivered its first enterprise grade release, Airship 1.0 and at AT&T we
leveraged this release to significantly mature our Network Cloud NFVi, and rapidly grow our 5G Packet Core SDN
deployments running on Network Cloud.

Airship 2.0 targeted for delivery later this year is an educated evolution of the project that will help operators
elevate their infrastructure to new heights, and fully enable a multi-year transition from VNF to CNF without the need
to support two sets of NFVi. Ahead of that delivery, we want to let the industry know what they can expect out of this
significant new release that has the potential to elevate NFVi deployments to new heights. The Airship team recognizes
that telcos are heavily invested in VNFs and OpenStack today, and so it meets them where they are. It does this by
enabling the operator to run OpenStack services and the VNFs orchestrated by OpenStack, side by side with CNFs
themselves on a common underlying Kubernetes Cluster.

To achieve this, Airship 2.0 is providing a declarative interface that assembles and orchestrates the best-of-breed
Cloud Native Computing Foundation (CNCF) building blocks needed for the job of provisioning and complete life cycle
management of the full-stack cloud infrastructure using Kubernetes containers.

In this model, Airship is an invested consumer and integrator of these CNCF building blocks, not the author. Successful
CNCF projects are generally well-scoped in their problem-domain. They support a subset of the above solution and we view
that as a requirement for each of these projects to thrive.

**Airship 2.0 takes each of these CNCF projects and provides the glue that not only serves to provide a functional
end-to-end integration, but a smooth operator experience tying all these projects together.**

As such Airship truly is “batteries-included” when it comes to delivering an integrated platform an operator can use out
of the box, that is production tested both with and without OpenStack-Helm.  It is important to note that another key
benefit is that it does not lock you into the “Airship Eco System”. The project is highly decomposable allowing you to
pick and choose what components make sense.  While fully integrating the best-of-breed CNCF projects, it does so without
any customization or forked Airship versions. This means you could stop using Airship to manage the underlying CNCF
components at any time without needing to deploy new versions. Truly, no lock-in!

To learn more about Airship 2.0 and how you might leverage it to manage the lifecycle of complex cloud infrastructure
please review the [**Airship 2.0 White Paper**](https://www.airshipit.org/collateral/Airship_2.0_White_Paper.pdf) and
join the community at [airshipit.org](http://www.airshipit.org/).