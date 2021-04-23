---
templateKey: software-page
seo:
  description: >-
    Learn more about how Airship combines OpenStack with Kubernetes to provide a
    single workflow for managing both initial installations and updates.
  image: /img/android-chrome-192x192.png
  title: Open Source Data Center Lifecycle Management - Airship
  twitterUsername: '@airshipproject'
  url: 'https://airshipit.org/software/'
title: Software
subTitle: Development activities in Airship
intro:
  columns:
    - image: /img/Airship_Icon.svg
      link:
        text: Go to Git Repository
        url: 'https://opendev.org/airship/airshipctl'
      title: Get Airship
    - image: /img/document.svg
      link:
        text: Go to Treasuremap
        url: 'https://docs.airshipit.org/'
      title: View the Documentation
  text:
    - paragraph: >
        The introduction of containers has led to a revolution in how
        applications are deployed and maintained through the use of powerful
        container orchestration platforms like Kubernetes. Airship applies these
        principles of application management to datacenter operations, allowing
        operators to declare their entire infrastructure up front.
    - paragraph: >
        Airship has a single workflow for managing both initial installations
        and updates. An operator only needs to make a change to an Airship YAML
        configuration, and the Airship platform does the rest of the work. When
        managing complex IaaS projects such as OpenStack, anything from minor
        service configuration updates to major upgrades are all handled in the
        same way: by simply modifying the YAML configuration and submitting it
        to the Airship runtime.
  video: 'https://www.youtube.com/embed/0eEisMm9ykg'
---
<br/>

<div class="h2_green">Airship Enables:</div>

<br/>

#### Platform Integration

Airship combines the most popular virtualization platform, OpenStack, with the most popular container platform, Kubernetes.  Airship delivers a resilient Kubernetes and Helm infrastructure as the foundation in order to deploy and manage Airship components as well as several OpenStack services that integrate with Airship directly.  Airship then uses this same Kubernetes infrastructure to deliver any number of user-facing Helm applications, including a fully featured high-availability OpenStack cloud using OpenStack-Helm. Airship is a flexible application deployment and life cycle engine that functions with any Helm chart based application allows the system to easily deploy and manage entirely new applications with only minor declarative YAML changes.

#### Security at Scale

The fully integrated toolchain automatically applies industry best-practices for securing data centers. TLS-enabled service endpoints and encrypted storage of secrets make for a secure platform across your entire data center.  The production-grade Kubernetes cluster that Airship provides aims to provide best practice and resilient configurations out of the box.

#### Scalable Operations

By leveraging Kubernetes and Helm, critical services can automatically scale under load and can robustly survive hardware failure. The platform also bundles many infrastructure needs that are required whether leveraging OpenStack-Helm or other software sets--things such as log collection, search capabilities, monitoring, alerting, graphing, as well as network security policies.

#### Reliable Upgrades

Critical services can be upgraded with confidence, with gradual roll-outs (including the ability to roll-back), and guaranteed data and virtual machine integrity across container application upgrades. There's no need to shut down any services or live-migrate any virtual machines through the upgrade process.

<br>
<br>

- - -

<a href="https://www.airshipit.org/collateral/Airship_2.0_White_Paper.pdf" target="_blank"><strong>View this overview document for helpful information.</strong></a>
