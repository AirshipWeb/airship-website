---
templateKey: blog-post
title: Airship 2.0 - How Ironic Delivers Abstraction and Automation Using Open Source Software
author: Alexander Hughes
date: 2020-07-22T12:00:00.000Z
category: 
  - label: Airship 2.0
    id: category-C98iZYrE1
---

## **ANNOUNCING THE IRONIC BAREMETAL WHITEPAPER**

This week the OpenStack Foundation hosted the [_Hardware Automation_](
https://www.openstack.org/events/opendev-2020/opendev-schedule-2) event, and one of the many exciting things announced
was the [_Baremetal White Paper_](
https://www.openstack.org/bare-metal/how-ironic-delivers-abstraction-and-automation-using-open-source-infrastructure).
This document details how Ironic delivers abstraction and automation using Open Source Software and is the result of a
collaboration of more than 26 individuals representing more than 15 companies - including AT&T, Cathey.Co, CERN, CSIRO,
Dell Technologies, Ericsson, Fujitsu, OpenStack Foundation (OSF), Red Hat, SK Telecom, StackHPC, SUSE, SWITCH, Xflow
Research, and ZTE.

Be sure to catch up on all three days of the Hardware Automation event with these resources:

**Day One**
* Recording: https://www.youtube.com/watch?v=Do1ugxm4PGw
* Agenda: https://etherpad.opendev.org/p/OpenDev_HardwareAutomation_Day1

<br>

**Day Two**
* Recording: https://www.youtube.com/watch?v=tnbnrG0xvfA
* Agenda: https://etherpad.opendev.org/p/OpenDev_HardwareAutomation_Day2

<br>

**Day Three**
* Recording: https://www.youtube.com/watch?v=V6vPKxDzaP8
* Agenda: https://etherpad.opendev.org/p/OpenDev_HardwareAutomation_Day3

<br>

I encourage you to read the full paper [_here_](
https://www.openstack.org/bare-metal/how-ironic-delivers-abstraction-and-automation-using-open-source-infrastructure),
what follows is the Airship Case Study section of the document.

## **AIRSHIP CASE STUDY**

The goals of Airship are to enable operators to predictably deliver raw infrastructure as a resilient cloud and to
efficiently manage the life cycle of the resulting platform, following cloud-native principles such as real-time
upgrades with no downtime to services. To achieve this, Airship integrates best-in-breed open source tooling, presenting
an easy-to-use, flexible and declarative interface to infrastructure management.

A fundamental piece of this puzzle is the provisioning and management of bare metal servers. Airship initially used a
declarative wrapper around a traditional package-based bare metal provisioner (MaaS). However, this did not provide the
desired immutability and predictability of image-based deployments. To address this, Airship 2.0 integrates the Metal3
project. Metal3 presents a declarative model for bare metal, and drives Ironic (in standalone mode) to efficiently
realize provisioning. To further model Kubernetes clusters declaratively, Airship uses the Kubernetes Cluster API
(CAPI). CAPI broadens Airship's goal to be flexible, general-purpose tooling by providing implementations that stand up
Kubernetes clusters across the range of public cloud providers, OpenStack clusters and bare metal provisioning.

From an Airship perspective, the net-net is that CAPI allows it to manage infrastructure and workloads consistently
across these different environments. This opens up use cases such as sharing Containerized Network Function (CNF)
workloads across private bare metal clusters and elastic public clouds, as well as many others that were not previously
possible. The Airship and Metal3 communities have worked closely to ensure that Metal3 integrates as seamlessly as the
bare metal provider for the Kubernetes Cluster API.

Airship's need for bare metal capabilities was driven by many of the benefits mentioned elsewhere in this whitepaper –
in particular, the need to squeeze every last bit of performance out of physical assets, as well as the ability to
physically locate the infrastructure close to end users. These are critical ingredients for a successful, low-latency 5G
network, which was the initial key use case for Airship. In addition, as detailed in the Edge Usage Pattern below, the
ability to drive secure, remote provisioning over the WAN led Airship 2.0 to adopt a Redfish-based bootstrap procedure.

Finally, infrastructure is nothing without a workload to utilize it. Airship provides a declarative YAML interface and
CLI to manage the lifecycle of any Helm-based or raw Kubernetes manifest-based workloads, unified with its management of
servers, Kubernetes nodes and network configuration. It provides the Treasuremap project, which has reusable
configuration for common workloads such as OpenStack, Logging and Monitoring and Databases. Airship 2.0 is reframing
Treasuremap into a library of composable intent for operators to rapidly consume and customize to meet their unique
needs.