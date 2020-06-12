---
templateKey: blog-post
title: Pre-Alpha Airship Blog Series 1 - Evolution Towards 2.0
author: Ryan van Wyk, Rodolfo Pacheco and Alan Meadows
date: 2019-06-12T09:00:00.000Z
category: 
  - label: Airship 2.0
    id: category-C98iZYrE1
---

## **UPDATED DESIGN THINKING NOTICE**

This blog has been marked as a "pre-alpha" post and may contain inaccurate information. This post has been archived to
preserve the technologies, design, and thinking of the time. Please see [*this announcement*](
https://www.airshipit.org/blog/pre-alpha-blog-announcement.html) for more information on the road to Airship 2.0 alpha
and how the lessons learned influenced the technologies and design of Airship 2.0 "post-alpha".

<hr>

[Airship](https://www.airshipit.org/) allows cloud operators to manage the entire lifecycle of sites, including their creation, minor updates, configuration changes, and major uplifts such as OpenStack upgrades. Airship accomplishes this using a unified, declarative, fully containerized, cloud native platform.<!-- more -->

## **The Motivation for Airship**

Cloud Operators experience challenges in creating, updating, and managing the entire lifecycle of their own private cloud infrastructure, such as:

1. Lengthy and complicated processes;
2. The need for custom development to enable an ecosystem of various open source and proprietary software integrated into one cloud platform;
3. Demands for resources with a wide array of deep skillsets;
4. Difficulties keeping up with the cadence of new open source releases due to the slow process of deployment and upgrades; and
5. Challenges of scalability and security.

<br>


Thus it becomes more difficult than it should be to support Software Defined Networks (SDN) with open infrastructure and more specifically private clouds. This is holding back the industry from working on more advanced enterprise grade solutions. In another word, if we don't make it easy to deploy, upgrade and manage the lifecycle with resiliency and security, our software engineers are not able to focus on delivering other innovations and help accelerate Open Infrastructure growth and SDN.

When AT&T, SKT and Intel set out to apply the learnings from years of building and managing Open Infrastructure at scale, we set clear goals to solve these very challenges:

1. **Open Source Orchestration with Batteries Included**: There is no need for operators to make extra effort to write wrappers and custom code to deliver an integrated cloud platform that works for them.
2. **Simplified Singular Deployment Method**: Only one workflow is needed for greenfield deployments, upgrades etc. thus simplifies both the platform itself and the management of the platform. At the same time, it reduces the list of skillsets needed to allow operators to manage at scale clouds with smaller teams.
3. **Predictable Fast and Seamless Deployments and Upgrades of the End-to-End Platform**: Without predictability you cannot move fast to maintain cadence with open source releases, and you cannot scale.
4. **Resiliency and Enterprise-Grade Security Built In From the Ground Up**: Typically this is an afterthought for the operator to solve. Our goal is to build it in day 1, and evolve upstream based on real world application.
5. **Not Be Opinionated on the Use Case**: To meet the goal of moving the industry forward, it would need to be flexible enough to enable deployments of many sizes and configurations, thus allowing for different industry segments and use case adoption.

<br>

## **Why Airship?**

To evolve how we deliver our cloud platform as well as manage the lifecycle of the software running there, including OpenStack, we collaboratively created Airship.

1. **Declarative**: Sites are declared using YAML. This includes both hard assets such as network configuration and bare metal hosts as well as soft assets like helm charts, their overrides, and container images. Operators manage the documents and Airship does the implementation.
2. **One Workflow for Lifecycle Management**: We need a system that is predictable with lifecycle management at its core. This means one workflow handling both initial deployments and site updates. In another word, a new deployment and an update to an existing site should be virtually identical.
3. **Containers Are the New and Only Unit of Software Delivery**: Containers are the unit of software delivery for Airship. Everything that can be a container is a container. This allows us to progress environments from development to testing and finally production with confidence that the same software is being used.
4. **Flexible for Different Architectures and Software**: Airship is delivering environments both very small and large with a wide range of configurations. AT&T uses Airship to manage our entire cloud platform, not just OpenStack.

<br>

The Airship project grew out of the [OpenStack Helm](https://docs.openstack.org/openstack-helm/latest/readme.html) project, which itself grew out of the Cloud Native Computing Foundation [Helm Project](https://www.linux.com/blog/event/kubecon/2018/4/put-wind-your-deployments-kubernetes-and-helm). [Helm](https://helm.sh/) is a package manager for [Kubernetes](https://www.sdxcentral.com/articles/news/aws-plan-battle-google-using-kubernetes/2017/07/).

AT&T has been working on its cloud for more than four years. "*We stepped back about a year ago, and said, 'If we would do some of this again, how would we incorporate learnings?'*"

In the past, we had different workflows for different types of functions. It created a challenge of predictability and made our deployment process complex. Getting to one workflow was critical. We also needed to vastly simplify the way we packaged and delivered software. Airship requires all software components, no matter where they sit in the stack, are packaged as containers and delivered as helm charts. This would allow us to leverage one software delivery mechanism for every piece of software and vastly simplify our software release process. 

The ability to declare all of your infrastructure as configuration at the beginning of the lifecycle is really at the heart of what we are trying to do with Airship. In a lot of ways, we were ahead of our time. The vast majority of Airship was built from the ground up to expressly provide configuration driven infrastructure.

This blog post is the first in a series that will be published over the coming months with the intent to provide some insights into the evolutionary steps we are taking with Airship to take advantage of evolving open source projects that cover some of the context domains, as well as the technological realignment we are planning as we grow towards Airship 2.0. We will cover the existing design, how we will evolve that design, as well as the benefits we anticipate with each of those changes.
